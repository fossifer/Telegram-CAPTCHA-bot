{
    // Your bot token (contact @BotFather to get one) goes here
    "token": "",
    // https://core.telegram.org/api/obtaining_api_id
    "api_id": 123456,
    "api_hash": "",
    // Proxy settings (only SOCKS5 proxy is supported currently)
    "proxy": {
        "address": "127.0.0.1",
        "port": 1080
    }
    // Group id with quotes, "*" for default settings
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
        // manually approval/refusal messages
        "msg_approve_manually": "人工通过",
        "msg_refuse_manually": "人工拒绝",
        "msg_permission_denied": "您的权限不足",
        "msg_bot_no_permission": "操作失败，可能是机器人的权限不足",
        "msg_approved": "您已被管理员 {user} 人工通过，欢迎加入本群！\n\nWelcome to this group! You were approved by {user} manually.",
        "msg_refused": "该用户已被管理员 {user} 移除出群。\n\nThe user has been removed from group by {user}.",
        /* Set this to true if a correct answer is required to get unrestricted.
        A wrong answer will cause the restrict remaining unchanged.
        Recommended if your group is suffering a lot of bots having ability to randomly click buttons */
        "challenge_strict_mode": false,
        /* The maximum challenge responding time in seconds.
        If there are no response in this time, the user will be restricted/banned */
        "challenge_timeout": 180,
        /* What to do when a user failed the challenge
        the value can be "restrict", "kick" (allow re-joining) or "ban" */
        "challenge_timeout_action": "restrict",
        // Delete challenges or not after the interval in seconds
        "delete_passed_challenge": true,
        "delete_passed_challenge_interval": 15,
        "delete_failed_challenge": false,
        "delete_failed_challenge_interval": 180
    }
    // Change "zh_TW" to your group id with quotes
    "zh_TW": {
        "msg_self_introduction": "大家好，感謝使用本機器人。\n\n我負責排除掉討厭的廣告機器人，賦予我群組管理中的 Ban users 權限即可開始使用，移除權限即可停用。新用戶加入群組時我會暫時將其禁止發言，並出一道小學二年級難度的算術題目，列出幾個選項讓用戶選擇。因為我比較仁慈，所以用戶只要點選按鈕即可獲得解鎖，甚至不需要答對。\n\n我不會收集群組裡的訊息，程式的原始碼是公開的，如果您對我的功能不滿意，可以點選我的頭像檢視 bio 中的原始碼連結，修改並運行您自己的機器人。",
        "msg_challenge_not_for_you": "這次驗證並不針對您",
        "msg_challenge": "您好，本群組開啟了驗證功能，請在 {timeout} 秒內點下面的按鈕回答這個問題：\n{challenge}\n\nHi! The group has enabled CAPTCHA, please click one of the buttons to answer the following question:\n{challenge}",
        "msg_challenge_passed": "您已通過驗證，歡迎加入本群組！\n如果仍然無法發言，請重啟 Telegram 客戶端。\n\nWelcome to this group! You have passed the CAPTCHA. If you cannot send messages, please restart the Telegram client.",
        "msg_challenge_mercy_passed": "雖然您答錯了問題，但我們仍然認為您是人類，歡迎加入本群組！\n如果仍然無法發言，請重啟 Telegram 客戶端。\n\nWelcome to this group! You chose a wrong button but we still recognize you as a human.\nIf you cannot send messages, please restart the Telegram client.",
        "msg_challenge_failed": "抱歉，您沒有通過驗證，如需解封請私聊本群組管理員。\n\nSorry but you failed the CAPTCHA. Please contact group admins for help.",
        "msg_approve_manually": "人工通過",
        "msg_refuse_manually": "人工拒絕",
        "msg_permission_denied": "您的權限不足",
        "msg_bot_no_permission": "操作失敗，可能是機器人的權限不足",
        "msg_approved": "您已被管理員 {user} 人工通過，歡迎加入本群組！\n\nWelcome to this group! You were approved by {user} manually.",
        "msg_refused": "該用戶已被管理員 {user} 移除出群組。\n\nThe user has been removed from group by {user}.",
        "challenge_strict_mode": false,
        "challenge_timeout": 180,
        "challenge_timeout_action": "restrict",
        "delete_passed_challenge": true,
        "delete_passed_challenge_interval": 15,
        "delete_failed_challenge": false,
        "delete_failed_challenge_interval": 180
    },
    // Change "yue" to your group id with quotes
    "yue": {
        "msg_self_introduction": "大家好，多謝使用呢隻機械人。\n\n我負責篩走啲廣告機械人，只要俾我 Ban users 嘅群管權限，我就會開始工作。如果唔想再用我，就撤銷我嘅權限啦。我會將啱啱入嚟嘅人禁言，然後出一條小學二年級嘅數學題，畀幾個選項佢揀。因為我係個仁慈嘅機械人，所以只要有撳掣，我就會俾佢通過，甚至唔需要答啱條問題。\n\n我唔會收集群組內既訊息，原始碼已經公開咗喺GitHub，如果您對我嘅功能唔滿意，可以撳我嘅頭像睇吓 bio 入面既link，修改同運行您自己嘅機械人。",
        "msg_challenge_not_for_you": "呢次驗證唔係針對你",
        "msg_challenge": "你好，我哋開咗驗證功能，請喺 {timeout} 秒內撳下面嘅掣嚟完成驗證：\n{challenge}\n\nHi! The group has enabled CAPTCHA, please click one of the buttons to answer the following question:\n{challenge}",
        "msg_challenge_passed": "你已經成功通過驗證，歡迎加入！\n如果仲係講唔到嘢，試下重啟 Telegram 客戶端啦。\n\nWelcome to this group! You have passed the CAPTCHA. If you cannot send messages, please restart the Telegram client.",
        "msg_challenge_mercy_passed": "雖然你答錯咗，但係我哋仍然認為你係真人，歡迎加入！\n如果仲係講唔到嘢，試下重啟 Telegram 客戶端啦。\n\nWelcome to this group! You chose a wrong button but we still recognize you as a human.\nIf you cannot send messages, please restart the Telegram client.",
        "msg_challenge_failed": "對唔住，你通過唔到驗證，如果你係真人，請私訊聯繫群管。\n\nSorry but you failed the CAPTCHA. Please contact group admins for help.",
        "msg_approve_manually": "俾佢入嚟",
        "msg_refuse_manually": "踢佢出去",
        "msg_permission_denied": "你冇權做咁樣",
        "msg_bot_no_permission": "操作錯誤，可能係機械人唔夠權限",
        "msg_approved": "你已經俾管理員 {user} 人工通過，歡迎加入！\n\nWelcome to this group! You were approved by {user} manually.",
        "msg_refused": "呢個用戶已經被管理員 {user} 踢出本群。\n\nThe user has been removed from group by {user}.",
        "challenge_strict_mode": false,
        "challenge_timeout": 180,
        "challenge_timeout_action": "restrict",
        "delete_passed_challenge": true,
        "delete_passed_challenge_interval": 15,
        "delete_failed_challenge": false,
        "delete_failed_challenge_interval": 180
    },
    // Change "cdo" to your group id with quotes
    "cdo": {
        "msg_self_introduction": "大家儂好。謝謝各儂選擇本机器儂。\n\n廣告機器儂盡討厭，仱我會負責共伊逐去。乞我群組管理裡勢其 Ban users 權限，我就會開始工作；以後除迨者權限，我就會停下。新其用戶裡來，我先儥讓伊講話，出蜀芘小學二年級水平其算學題，下底攖幾隻答案乞用戶揀。我哩比較好心，在伊揀底蜀隻我都讓伊過，無管伊有賺無賺。\n\n我伓收集羣裡勢其消息，源代碼是公開其。汝㑚儥滿意我其功能，會使篤我其頭像，看 bio 裡勢其源代碼鏈接，修改囇再運行汝自家其机器儂。",
        "msg_challenge_not_for_you": "這回驗證共汝無干過",
        "msg_challenge": "汝好，儂家開了驗證功能，請着 {timeout} 秒之內，篤下底其數字，完成驗證：\n{challenge}\n\nNṳ̄ hō̤, nàng-gā kŭi lāu ngiêng-céng gŭng-nèng, chiāng diŏh {timeout} miēu cĭ-nó̤i, dók â-dā̤ gì só-cê, uòng-sìng ngiêng-céng:\n{challenge}\n\nHi! The group has enabled CAPTCHA, please click one of the buttons to answer the following question:\n{challenge}",
        "msg_challenge_passed": "汝已經通過驗證，歡迎加裡！\n汝㑚故是無辦法講話，關去 Telegram 客戶端再開起就會使。\n\nNṳ̄ ī-gĭng tŭng-guó ngiêng-céng, huăng-ngìng gă-diē! \nNṳ̄ nâ gó-sê mò̤ bâing-huák gōng-uâ, guŏng kó̤ Telegram káik-hô-duăng cái kŭi kī cêu â̤-sāi.\n\nWelcome to this group! You have passed the CAPTCHA. If you cannot send messages, please restart the Telegram client.",
        "msg_challenge_mercy_passed": "雖然汝答案有賺，儂家故是認爲汝正是儂無賺。歡迎加裡！\n汝㑚故是無辦法講話，關去 Telegram 客戶端再開起就會使。\n\nChŭi-iòng nṳ̄ dák-áng ô dâng, nàng-gă gó-sê nêng-ùi nṳ̄ ciáng-sê nè̤ng mò̤ dâng. Huăng-ngìng gă-diē! \nNṳ̄ nâ gó-sê mò̤ bâing-huák gōng-uâ, guŏng kó̤ Telegram káik-hô-duăng cái kŭi kī cêu â̤-sāi.\n\nWelcome to this group! You chose a wrong button but we still recognize you as a human.\nIf you cannot send messages, please restart the Telegram client.",
        "msg_challenge_failed": "儥好意思，汝無通過驗證。卜證明汝真其是儂，請發私訊乞管理員。\n\nMâ̤ hō̤ é-sé̤ṳ, nṳ̄ mò̤ tŭng-guó ngiêng-céng. Buóh céng-mìng nṳ̄ cĭng gì sê nè̤ng, chiāng huák sṳ̆-séng ké̤ṳk guāng-lī-uòng.\n\nSorry but you failed the CAPTCHA. Please contact group admins for help.",
        "msg_approve_manually": "讓伊裡來",
        "msg_refuse_manually": "共伊逐出",
        "msg_permission_denied": "汝伓是管理員",
        "msg_bot_no_permission": "操作有賺，可能機器儂其權限無夠",
        "msg_approved": "汝已經乞管理員 {user} 人工通過，歡迎加裡！\n\nNṳ̄ ī-gĭng ké̤ṳk guāng-lī-uòng {user} ìng-gĕ̤ng tŭng-guó, huăng-ngìng gă-diē!\n\nWelcome to this group! You were approved by {user} manually.",
        "msg_refused": "這隻用戶已經乞管理員 {user} 逐出本羣。\n\nCī-ciáh ê̤ṳng-hô ī-gĭng ké̤ṳk guāng-lī-uòng {user} dṳ̆k chók buōng-gùng.\n\nThe user has been removed from group by {user}.",
        "challenge_strict_mode": false,
        "challenge_timeout": 180,
        "challenge_timeout_action": "restrict",
        "delete_passed_challenge": true,
        "delete_passed_challenge_interval": 15,
        "delete_failed_challenge": false,
        "delete_failed_challenge_interval": 180
    }
}
