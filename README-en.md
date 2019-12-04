# Telegram-CAPTCHA-bot

[简体中文](README.md)

A bot running on Telegram which will send CAPTCHA to verify if the new member is a human.

## Getting Started

### Prerequisites

You need Python 3.7+ Environment and [Telethon](https://github.com/LonamiWebs/Telethon) 1.7.1. If the bot needs to run under a SOCKS5 proxy, please install [PySocks](https://github.com/Anorov/PySocks) as well.

Besides, some tokens are also required. They include bot token from [@BotFather](https://t.me/BotFather), api_id and api_hash from [Telegram official website](https://core.telegram.org/api/obtaining_api_id)

If api_id and api_hash are missing, this `archive` branch can be an alternative which uses Python 3.6+ and [python-telegram-bot 的](https://github.com/python-telegram-bot/python-telegram-bot) instead of Telethon. A bot token is still required. Note that the rights available in the function `restrictChatMember` provided by python-telegram-bot does not match the choices when a human is restricting someone, so this alternative branch won't restore the rights to its original state (before the new member joined the group). This may be exploited by anyone who is formerly restricted, just rejoin the group then pass the challenge and they will be free from any restriction.

### Installing and Running

```
git clone https://github.com/lziad/Telegram-CAPTCHA-bot 
cd Telegram-CAPTCHA-bot
python3 -m venv ./venv
source ./venv/bin/activate
pip3 install -r requirements.txt
cp config.example.js config.json
```
Then edit config.json as your wish. Don't forget to fill in `token`, `api_id` and `api_hash` and delete all the comment lines. Finally just run main.py, for example
```
nohup python3 main.py &
```

## Notes

* Telethon send request directly to the Telegram servers, and the position of the data centers depends on your Telegram account used to request for api_id. Try to place the bot on a server in the same country as the Telegram DC in order to maximize the responding speed. You may refer to [the official document](https://core.telegram.org/api/datacenter) for more information.
* Some spambots are able to click buttons. If your group is suffering a lot of those bots, consider changing `challenge_strict_mode` to `true` in config.json. Then the newbies need to answer the challenge correctly to have their restrictions lifted. The actions after timeout still depend on `challenge_timeout_action`.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

* The convenient APIs of Telegram
* The persistent spambots on Telegram - if they disappear then this project will be discarded as well