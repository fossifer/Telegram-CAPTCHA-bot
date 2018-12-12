# Your bot token (contact @BotFather to get one) goes here
token = ''
msg = {
    # The message to be sent when someone joins the group,
    # please replace the challenge question with {challenge}
    # and replace the maximum challenge time with {timeout}
    'challenge': '您好，本群开启了验证码功能，请在{timeout}秒内点击下面的按钮回答这个问题：\n{challenge}',
    'challenge_succeed': '您已通过验证，欢迎加入本群！\n如果仍然无法发言，请重启 Telegram 客户端。',
    'challenge_mercy_succeed': ('虽然您答错了问题，但我们仍然认为您是人类，欢迎加入本群！\n'
        '如果仍然无法发言，请重启 Telegram 客户端。'),
    'challenge_failed': '抱歉，您没有通过验证，如需解封请私聊本群群管。'
}
# The maximum challenge time in seconds.
# If there are no response in this time, the user will be restricted/banned
challenge_timeout = 180
# What to do when a user failed the challenge
# the value can be 'restrict' or 'ban'
challenge_timeout_action = 'restrict'
