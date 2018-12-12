{
    // Your bot token (contact @BotFather to get one) goes here
    "token": "",
    // Group id, "*" for default settings
    "*": {
        // This message is sent when bot is invited to a group
        "msg_self_introduction": "大家好，感谢使用本机器人。\n\n我负责排除掉讨厌的广告机器人，赋予我群管中的 Ban users 权限即可开始使用，移除权限即可停用。新用户加群时我会暂时将其禁言，并出一道小学二年级水平的口算题，列出几个选项让用户选择。因为我比较仁慈，所以用户只要点击按钮即可获得解封，甚至不需要答对。\n\n我不会收集群里的消息，源代码是公开的，如果您对我的功能不满意，可以点击我的头像查看 bio 中的源代码链接，修改并运行您自己的机器人。",
        /* The message is sent when someone joins the group,
        please replace the challenge question with {challenge}
        and replace the maximum challenge time with {timeout} */
        "msg_challenge_not_for_you": "这次验证并不针对您",
        "msg_challenge": "您好，本群开启了验证功能，请在 {timeout} 秒内点击下面的按钮回答这个问题：\n{challenge}\n\nHi! The group has enabled CAPTCHA, please click one of the buttons to answer the following question:\n{challenge}",
        // This message is sent when user clicks the wrong button
        "msg_challenge_passed": "您已通过验证，欢迎加入本群！\n如果仍然无法发言，请重启 Telegram 客户端。\n\nWelcome to this group! You have passed the CAPTCHA. If you cannot send messages, please restart the Telegram client.",
        "msg_challenge_mercy_passed": "虽然您答错了问题，但我们仍然认为您是人类，欢迎加入本群！\n如果仍然无法发言，请重启 Telegram 客户端。\n\nWelcome to this group! You chose a wrong button but we still recognize you as a human.\nIf you cannot send messages, please restart the Telegram client.",
        "msg_challenge_failed": "抱歉，您没有通过验证，如需解封请私聊本群群管。\n\nSorry but you failed the CAPTCHA. Please contact group admins for help.",
        /* The maximum challenge time in seconds.
        If there are no response in this time, the user will be restricted/banned */
        "challenge_timeout": 180,
        /* What to do when a user failed the challenge
        the value can be "restrict" or "ban" */
        "challenge_timeout_action": "restrict",
        // Delete challenges or not after the interval in seconds
        "delete_passed_challenge": true,
        "delete_passed_challenge_interval": 15,
        "delete_failed_challenge": false
        "delete_failed_challenge_interval": 180
    }
}