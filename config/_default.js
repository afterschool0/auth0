module.exports = {
    "systems": {
        "status": "production",
        "port": 3000,
        "domain": "localhost:3000",
        "protocol": "http",
        "cache": "no-cache",
        "timeout": 100000,
        "ua": "SYSTEM_NAME",
        "use_publickey": true,
        "dav": false,
        "db": {
            "address": "localhost",
            "user": "DB_USERNAME",
            "password": "DB_PASSWORD",
            "name": "DB_NAME"
        },
        "regist": {
            "user": true,
            "member": true,
            "expire": 60
        },
        "sessionname": "SYSTEM_NAME",
        "sessionsecret": "Daisy, Daisy.",
        "tokensecret": "Yes We therefore I think we",
        "key2": "Man is a thinking reed",
        "!ssl" : {
            "key" : "",
            "cert": ""
        },
        "systems": {
            "namespace": "system",
            "groupid": "000000000000000000000000",
            "userid": "000000000000000000000000"
        },
        "entry_point":"",
        "exit_point":"",
        "root_modules": [
            {
                "type": "required",
                "path": "/applications/",
                "name": "front",
                "description": {
                    "display": "Front"
                }
            }
        ],
        "initusers": [
            {
                "auth": 1,
                "groupid": "000000000000000000000000",
                "userid": "000000000000000000000000",
                "username": "USER_NAME_0",
                "password": "PASSWORD",
                "metadata":{
                    "nickname": "system"
                }
            },
            {
                "auth": 100,
                "groupid": "000000000000000000000000",
                "userid": "000000000000000000000001",
                "username": "USER_NAME_1",
                "password": "PASSWORD",
                "metadata": {
                    "nickname": "user"
                }
            },
            {
                "auth": 500,
                "groupid": "000000000000000000000000",
                "userid": "000000000000000000000003",
                "username": "USER_NAME_3",
                "password": "PASSWORD",
                "metadata": {
                    "nickname": "member"
                }
            },
            {
                "auth": 1000,
                "groupid": "000000000000000000000000",
                "userid": "000000000000000000000004",
                "username": "USER_NAME_4",
                "password": "PASSWORD",
                "metadata": {
                    "nickname": "temp"
                }
            },
            {
                "auth": 10000,
                "groupid": "000000000000000000000000",
                "userid": "000000000000000000000005",
                "username": "USER_NAME_5",
                "password": "PASSWORD",
                "metadata": {
                    "nickname": "guest"
                }
            }
        ],
        "facebook": {
            "enable": "true",
            "redirect": "/",
            "key": {
                "clientID": "",
                "clientSecret": "",
                "callbackURL": "https://seventh-code.com/auth/facebook/callback"
            },
            "accessToken": ""
        },
        "twitter": {
            "enable": "true",
            "redirect": "/",
            "key": {
                "consumerKey": "",
                "consumerSecret": "",
                "callbackURL": "https://seventh-code.com/auth/twitter/callback"
            }
        },
        "instagram1": {
            "enable": "false",
            "redirect": "/",
            "key": {
                "clientID": "",
                "clientSecret": "",
                "callbackURL": "https://seventh-code.com/auth/instagram/callback"
            }
        },
        "line": {
            "enable": "true",
            "redirect": "/",
            "key": {
                "channelID": "",
                "channelSecret": "",
                "callbackURL": "https://seventh-code.com/auth/line/callback"
            }
        },
        "mailer": {
            "type": "mail",
            "account": "",
            "setting": {
                host: "",
                port: "",
                auth: {
                    user: "",
                    pass: ""
                }
            }
        },
        "message": {
            "cancel": "Cancel",
            "invalid_mail_format": "invalid mail format",
            "login": "Login",
            "logindialogtitle": "Login",
            "logout": "Logout",
            "long": "too long",
            "mail_field": "Mail Address",
            "mail": "Mail",
            "memberconfirmdialogtitle": "Member Register Mail Sent",
            "memberconfirmtext": "Add Member",
            "memberdialogtitle": "Member Regist",
            "nickname_field": "Nickname",
            "nickname": "Nickname",
            "ok": "OK",
            "password_field": "Password",
            "password_missmatch": "password missmatch",
            "password": "Password",
            "passwordconfirmdialogtitle": "Update Password Mail Sent.",
            "passwordconfirmtext": "Update Password Mail Sent.",
            "passworddialogtitle": "Password Change",
            "regist": "Regist",
            "registconfirmdialogtitle": "User Register Mail Sent.",
            "registconfirmtext": "User Register Mail Sent.",
            "registdialogtitle": "User Regist",
            "required": "Required",
            "retypepassword": "Retype Password",
            "short": "Too Short",
            "wrongusername": "Wrong Username",
            "usernamealreadyregist": "User Already Exist",
            "usernamenotfound":"User Not Found or Password Missmatch"
        }
    }
};