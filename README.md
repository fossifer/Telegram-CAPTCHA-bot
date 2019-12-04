# Telegram-CAPTCHA-bot

[English](README-en.md)

一个 Telegram 机器人，通过点按钮的方式来判断加群者是否为真人。

## 如何使用

### 配置环境

需要 Python 3.7 和 [Telethon](https://github.com/LonamiWebs/Telethon) 1.7.1 来运行机器人。如果你需要让机器人通过 SOCKS5 代理运行，还需要安装 [PySocks](https://github.com/Anorov/PySocks)。

另外，你需要向 [@BotFather](https://t.me/BotFather) 申请一个 Telegram 机器人的 token，并按照 [Telegram 官网的步骤](https://core.telegram.org/api/obtaining_api_id) 申请 api_id 和 api_hash。

如果不申请 api_id 或 api_hash，也可以使用 `archive` 分支的方案，安装 Python 3.6+ 和 [python-telegram-bot 的](https://github.com/python-telegram-bot/python-telegram-bot) 的环境，并申请机器人 token。需要注意的是，这个方案无法做到在通过验证解封时回复到加群之前的封禁状态，因此无法防止被限制权限者退群重新加群来恢复权限的行为。这是因为 python-telegram-bot 库提供的 `restrictChatMember` 函数可选择的权限与人类的并不完全一致。

### 安装并运行

```
git clone https://github.com/lziad/Telegram-CAPTCHA-bot 
cd Telegram-CAPTCHA-bot
python3 -m venv ./venv
source ./venv/bin/activate
pip3 install -r requirements.txt
cp config.example.js config.json
```
之后修改 config.json，填入 `token`、`api_id`、`api_hash` 并根据需要修改群组设定，并去除所有注释行。完成后运行 main.py 即可，例如
```
nohup python3 main.py &
```

## 建议

* Telethon 库使用 MTProto 协议直接向 Telegram 的服务器发送请求，后者的位置取决于申请 api_id 的账户所在区域（例如大多数亚洲用户位于 DC5，服务器位于新加坡）。如果条件允许，将机器人程序放在对应位置的服务器运行可以显著加快速度，参见[官方文档](https://core.telegram.org/api/datacenter)。
* 有一些广告机器人会自动点击按钮。如果你的群组频繁被这类机器人骚扰，可以考虑在 config.json 中设置 `challenge_strict_mode` 为 `true`。此时需要用户答对题目才能获得解封，如果答错封禁则不会解除。超时后的行为仍由 `challenge_timeout_action` 决定。别忘了把 `msg_self_introduction` 里“我比较仁慈……”云云的句子删掉。

## 开源协议

本项目使用 MIT 协议，[原文见此处](LICENSE.md)。

## 致谢

感谢 Telegram 的开放性为这个项目带来的诸多便利。另外，如果没有那么多广告机器人，绝不会有这个项目，因此这个项目的诞生也要感谢那些坚持不懈、夜以继日发广告的机器人。