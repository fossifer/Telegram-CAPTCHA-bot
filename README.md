# Telegram-CAPTCHA-bot

一个用于验证新成员是不是真人的bot。

A bot running on Telegram which will send CAPTCHA to verify if the new member is a human.

原始项目地址: https://github.com/lziad/Telegram-CAPTCHA-bot

修改者：Telegram [@tooruchan](https://t.me/tooruchan)

## 安装与使用

1. 请先向 [@BotFather](https://t.me/botfather) 申请一个 Bot API Token
2. 在服务器上安装 python-telegram-bot: 
`pip3 install python-telegram-bot --upgrade`
3. 
``` 
git clone https://github.com/Tooruchan/Telegram-CAPTCHA-bot 
cd Telegram-CAPTCHA-bot
```
4. 将 config.json 里的 token 字符串修改为你在 [@BotFather](https://t.me/botfather) 获取到的 API Token，你也可以对 config.json 里的内容酌情修改。
5. 使用 `python3 main.py` 运行这个 bot,或者在 `/etc/systemd/system/ `下新建一个 .service 文件，使用 systemd 控制这个bot的运行，配置文件如下所示:
```
[Unit]
Description=YJSNPI 114514 service
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
WorkingDirectory=Place your bot directory here
ExecStart=/usr/bin/python3 /Your/bot/directory/main.py
Restart=always
PrivateTmp=True
KillSignal=SIGINT
TimeoutStopSec=10s
StartLimitInterval=400

[Install]
WantedBy=multi-user.target
```
6. 将本bot加入一个群组，即可开始使用
## 测试群组
[@tooruchan_group_bot](https://t.me/tooruchan_group_bot)

## 开源协议
MIT



