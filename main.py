import os
import sys
import json
import time
import asyncio
import logging
from challenge import Challenge
from telethon import TelegramClient, events, errors
from telethon.tl.functions.channels import DeleteMessagesRequest, EditBannedRequest, GetParticipantRequest
from telethon.tl.functions.messages import EditMessageRequest
from telethon.tl.types import ChatBannedRights, ChannelParticipantCreator, KeyboardButtonCallback

logging.basicConfig(level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

config, config_lock = dict(), asyncio.Lock()
bot = None
updater = None
dispatcher = None
# Key: chat_id + '|' + msg_id
# Value: (challenge object, int (target user id), coroutine object)
current_challenges, cch_lock = dict(), asyncio.Lock()
# Key: chat_id + '|' + user_id
# Value: Telegram ChannelParticipant object
user_previous_restrictions, upr_lock = dict(), asyncio.Lock()


def load_config():
    global config
    with open('config.json', encoding='utf-8') as f:
        config = json.load(f)


def save_config():
    with open('config.json', 'w', encoding='utf-8') as f:
        json.dump(config, f, indent=4)


async def safe_delete_message(delay, *args, **kwarg):
    await asyncio.sleep(delay)
    try:
        await bot(DeleteMessagesRequest(*args, **kwarg))
    except errors.BadRequestError:  # msg to delete not found
        pass


load_config()
proxy = config.get('proxy', {})
if proxy:
    import socks
    proxy = (socks.SOCKS5, proxy.get('address'), proxy.get('port'))
    bot = TelegramClient('bot', config['api_id'], config['api_hash'], proxy=proxy).start(bot_token=config['token'])
else:
    bot = TelegramClient('bot', config['api_id'], config['api_hash']).start(bot_token=config['token'])


@bot.on(events.ChatAction())
async def challenge_user(event):
    global config, current_challenges

    chat = event.chat
    target = event.user

    if event.user_added:
        me = await bot.get_me()
        if me.id in event.user_ids:
            async with config_lock:
                group_config = config.get(str(event.chat.id), config['*'])
                await event.respond(message=group_config['msg_self_introduction'])
        return None
    elif not event.user_joined:
        return None

    # get previous restriction data
    async with upr_lock:
        key = '{chat}|{user}'.format(chat=chat.id, user=target.id)
        # a record probably means the user didn't pass the challenge previously
        # (and is fully restricted)
        # this time they leave & rejoin the group in order to pass the test
        # so we won't update the record which is likely fully restricted
        if not user_previous_restrictions.get(key):
            try:
                member = await bot(GetParticipantRequest(chat, target))
                member = member.participant
                user_previous_restrictions[key] = member
            except errors.UserNotParticipantError:
                logging.warning(f'UserNotParticipantError on challenge_user: user={target.id}, chat={chat.id}')

    # Attempt to restrict the user
    try:
        await bot(EditBannedRequest(chat, target, ChatBannedRights(
            until_date=None, view_messages=None,
            send_messages=True, send_media=True, send_stickers=True,
            send_gifs=True, send_games=True, send_inline=True,
            send_polls=True, embed_links=True, invite_users=True
        )))
    except errors.ChatAdminRequiredError:
        return None

    async with config_lock:
        group_config = config.get(str(chat.id), config['*'])

    challenge = Challenge()

    def challenge_to_buttons(ch):
        # There can be 8 buttons per row at most (more are ignored).
        buttons = [KeyboardButtonCallback(text=str(c), data=str(c)) for c in ch.choices()]
        choices = [buttons[i*8:i*8+8] for i in range((len(buttons)+7)//8)]
        # manual approval/refusal by group admins
        choices.extend([[KeyboardButtonCallback(text=group_config['msg_approve_manually'], data='+'),
            KeyboardButtonCallback(text=group_config['msg_refuse_manually'], data='-')]])
        return choices

    timeout = group_config['challenge_timeout']

    try:
        bot_msg_id = await event.reply(message=group_config['msg_challenge'].format(
            timeout=timeout, challenge=challenge.qus()), buttons=challenge_to_buttons(challenge))
        bot_msg_id = bot_msg_id.id
    except errors.BadRequestError:  # msg to reply not found
        bot_msg_id = await event.respond(message=group_config['msg_challenge'].format(
            timeout=timeout, challenge=challenge.qus()), buttons=challenge_to_buttons(challenge))
        bot_msg_id = bot_msg_id.id

    timeout_event = asyncio.create_task(
        handle_challenge_timeout(group_config['challenge_timeout'], chat, target, bot_msg_id))

    async with cch_lock:
        current_challenges['{chat}|{msg}'.format(
            chat=chat.id,
            msg=bot_msg_id)] = (challenge, target.id, timeout_event)

    try:
        await timeout_event
    except asyncio.CancelledError:
        pass


async def handle_challenge_timeout(delay, chat, user, bot_msg):
    global config, current_challenges

    await asyncio.sleep(delay)

    async with config_lock:
        group_config = config.get(str(chat.id), config['*'])

    async with cch_lock:
        del current_challenges['{chat}|{msg}'.format(chat=chat.id, msg=bot_msg)]

    try:
        # note that the arg name is 'reply_markup', not 'buttons'
        await bot(EditMessageRequest(message=group_config['msg_challenge_failed'],
            peer=chat, id=bot_msg, reply_markup=None))
    except errors.BadRequestError:
        # it is very possible that the message has been deleted
        # so assume the case has been dealt by group admins, simply ignore it
        return None

    try:
        if group_config['challenge_timeout_action'] == 'ban':
            await bot(EditBannedRequest(chat, user,
                ChatBannedRights(until_date=None, view_messages=True)))
        elif group_config['challenge_timeout_action'] == 'kick':
            await bot(EditBannedRequest(chat, user,
                ChatBannedRights(until_date=None, view_messages=True)))
            await bot(EditBannedRequest(chat, user, ChatBannedRights(until_date=None)))
        else:  # restrict
            # assume that the user is already restricted (when joining the group)
            pass
    except errors.ChatAdminRequiredError:
        # lose our privilege between villain joining and timeout
        pass

    if group_config['delete_failed_challenge']:
        await asyncio.create_task(
            safe_delete_message(group_config['delete_failed_challenge_interval'], channel=chat, id=[bot_msg]))


async def lift_restriction(chat, target):
    # restore the restriction to its original state
    async with upr_lock:
        key = '{chat}|{user}'.format(chat=chat.id, user=target)
        member = user_previous_restrictions.get(key)
        if member:
            del user_previous_restrictions[key]
    try:
        rights = member.banned_rights
    except AttributeError:
        rights = ChatBannedRights(until_date=None)
    # if until_date - now < 30 seconds the restriction would be infinite,
    # so we kindly unban them slightly ahead of schedule
    # use 35 here for safety
    if rights.until_date and rights.until_date.timestamp() < time.time()+35:
        rights = ChatBannedRights(until_date=None)
    try:
        await bot(EditBannedRequest(chat, target, rights))
    except errors.RPCError as e:
        raise e


@bot.on(events.CallbackQuery())
async def handle_challenge_response(event):
    global config, current_challenges

    user_ans = event.data.decode()

    chat = event.chat
    user = await event.get_sender()
    username = '@'+user.username if user.username else (user.first_name +
        (' ' + user.last_name if user.last_name else ''))
    bot_msg = event.message_id

    async with config_lock:
        group_config = config.get(str(chat.id), config['*'])

    # handle manual approval/refusal by group admins
    if user_ans in ['+', '-']:
        try:
            participant = await bot(GetParticipantRequest(channel=chat, user_id=user))
            participant = participant.participant
        except errors.UserNotParticipantError:
            logging.warning(f'UserNotParticipantError on handle_challenge_response: user={user.id}, chat={chat.id}')
            await event.answer(message=group_config['msg_permission_denied'])
            return None
        can_ban = False
        try:
            if participant.admin_rights.ban_users or type(participant) is ChannelParticipantCreator:
                can_ban = True
        except AttributeError:
            pass
        if not can_ban:
            await event.answer(message=group_config['msg_permission_denied'])
            return None

        ch_id = '{chat}|{msg}'.format(chat=chat.id, msg=bot_msg)
        async with cch_lock:
            challenge, target, timeout_event = current_challenges.get(ch_id, (None, None, None))
            try:
                del current_challenges[ch_id]
            except KeyError:
                return None
        timeout_event.cancel()

        if user_ans == '+':
            try:
                await lift_restriction(chat, target)
            except errors.ChatAdminRequiredError:
                await event.answer(message=group_config['msg_bot_no_permission'])
            try:
                await event.edit(text=group_config['msg_approved'].format(user=username), 
                    buttons=None)
            except errors.BadRequestError:   # message to edit not found
                pass
        else:  # user_ans == '-'
            try:
                await bot(EditBannedRequest(chat, target, ChatBannedRights(until_date=None, view_messages=True)))
            except errors.ChatAdminRequiredError:
                await event.answer(message=group_config['msg_bot_no_permission'])
                return None
            try:
                await event.edit(text=group_config['msg_refused'].format(user=username),
                    buttons=None)
            except errors.BadRequestError:   # message to edit not found
                pass

            async with upr_lock:
                member = user_previous_restrictions.get('{chat}|{user}'.format(chat=chat.id, user=target))
                if member:
                    del user_previous_restrictions['{chat}|{user}'.format(chat=chat.id, user=target)]

        await event.answer()
        return None

    ch_id = '{chat}|{msg}'.format(chat=chat.id, msg=bot_msg)
    async with cch_lock:
        challenge, target, timeout_event = current_challenges.get(ch_id, (None, None, None))

    if user.id != target:
        await event.answer(message=group_config['msg_challenge_not_for_you'])
        return None

    timeout_event.cancel()

    async with cch_lock:
        del current_challenges[ch_id]

    await event.answer()

    # verify the ans
    correct = (str(challenge.ans()) == user_ans)
    delete = None
    if correct or not group_config.get('challenge_strict_mode'):
        try:
            await lift_restriction(chat, target)
        except errors.ChatAdminRequiredError:
            # This my happen when the bot is deop-ed after the user join
            # and before the user click the button
            # TODO: design messages for this occation
            pass
        msg = 'msg_challenge_passed' if correct else 'msg_challenge_mercy_passed'
        if correct:
            if group_config['delete_passed_challenge']:
                delete = asyncio.create_task(safe_delete_message(group_config['delete_passed_challenge_interval'], channel=chat, id=[bot_msg]))
    else:
        msg = 'msg_challenge_failed'

    await event.edit(text=group_config[msg], buttons=None)
    if delete: await delete


def main():
    bot.run_until_disconnected()
    
    save_config()


if __name__ == '__main__':
    main()