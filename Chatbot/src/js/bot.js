let ActualWorkbook
let ActualUserName
let ActualBOTType

let Admins = [
    "Kuba test!",
    "Jakub Augustýn",
    "Matyáš Jan Sobota",
    "Lukáš Kovařík"
]

const userMentions = {
    "Jakub Augustýn": "Kubo",
    "Patrik Augustýn": "Páťo",
    "Radek Augustýn": "Radku",
    "Kuba test!": "Kubo Teste",
    "Matyáš Jan Sobota": "Maty",
    "Lukáš Kovařík": "Luky",
    "Veronika Hubková": "Houbo",
    "Adéla Vrbová": "Vrbo",
    "Vanessa Eliasová": "Vanessso",
    "Adéla Hálová": "Háličko",
    "Jaroslav Pačes": "Jaroušku",
    "Michaela Drobná": "Michaelo Drobná",
    "Martin Vinduška": "Marťasi",
    "Klára Kovaříková": "Kláro Kovaříková",
    "Tomáš Hála": "Háliči",
    "Adam Buk": "Bukíno",
    "Ema Hartová": "Emo Hartová",
    "Matěj Veselý": "Matěji",
    "Zuzana Tremlová": "Zuzano Krémová",
    "Vilma Černá": "Vilmo Černá",
    "Max Kokoška": "Maxíku",
    "Tamara Dědková": "Tamaro Dědková",
    "Klára Kubová": "Kláro Kubová",
    "Ella Suchánková": "Ello Suchánková",
    "Martina Masárová": "Martino Masárová",
    "Jan Průcha": "Průchyči",
    "Anežka Šlajerová": "Anežko Šlajerová",
    "František Špringl": "Fando",
    "Ivan Fary": "Ivane",
    "Lucie Abtová": "Lucie Abtová",
    "Prokop Nový": "Prokope",
    "Tadeáš Kolesár": "Tádo Kolečkáre",
    "Sára Hrebinková": "Sáro Hrebinková",
}

/*function StartBot(ObsahZpravy, FromUserName, UsersListStr) {
    //<font color="red"><span style="font-size:x-large;background-color:yellow">THIS IS BOT.</span></font>
    //let Result = '<span style="font-size:x-large;color:red";background-color:yellow>THIS IS BOT.</span><br>'
    let DefaultResult = '<font color="red"><span style="font-size:x-large;background-color:yellow">THIS IS BOT.</span></font><br>'
    //let DefaultResult = 'THIS IS BOT.<br>'
    let Result = DefaultResult
    let Pozdravy = ["dobrý den", "ahoj", "čus"]
    let Casy = ["kolik je hodin", "jaký je čas"]
    let YTID = ["YouTubeID ${ID}", "YtID ${ID}"]
    let Add = ["/add ${NAME}"]
    let Rem = ["/rem ${NAME}"]
    let KdoJsem = ["kdo jsi"]
    let Test = ["test"]

    let ZpravyObsahy = Pozdravy
    ZpravyObsahy = ZpravyObsahy.concat(Casy)
    ZpravyObsahy = ZpravyObsahy.concat(YTID)
    ZpravyObsahy = ZpravyObsahy.concat(KdoJsem)
    ZpravyObsahy = ZpravyObsahy.concat(Add)
    ZpravyObsahy = ZpravyObsahy.concat(Rem)

    Result = addMessageValue(ObsahZpravy, Pozdravy, Result, "Pozdrav", FromUserName, UsersListStr)
    Result = addMessageValue(ObsahZpravy, Casy, Result, "Casy", FromUserName, UsersListStr)
    Result = addMessageValue(ObsahZpravy, KdoJsem, Result, "KdoJsem", FromUserName, UsersListStr)
    Result = addMessageValue(ObsahZpravy, Test, Result, "Test", FromUserName, UsersListStr)
    Result = addMessageValue(ObsahZpravy, YTID, Result, "YTID", FromUserName, UsersListStr)
    Result = addMessageValue(ObsahZpravy, Add, Result, "Add", FromUserName, UsersListStr)
    Result = addMessageValue(ObsahZpravy, Rem, Result, "Rem", FromUserName, UsersListStr)
    //console.log("Result: " + Result)
    if (Result === DefaultResult) {
        Result += "Zkuste napsat: " + ZpravyObsahy.join(" NEBO ")
    }
    //console.log("Result: " + Result)

    return Result
}*/

function addMessageValue(OldObsahZpravy, Polozky, OldResult, Type, FromUserName, UsersListStr) {
    let Result = OldResult
    let ObsahZpravy = OldObsahZpravy
    if (!isIn(Type, ["YTID", "Add", "Rem"])) {
        ObsahZpravy = ObsahZpravy.toLowerCase()
    }
    //console.log(ObsahZpravy + ":" + Polozky.join(" X ") + ":" + Result + ":" + Type + ":" + "  Kubafgdx")
    //console.log((isIn(ObsahZpravy, Polozky)) + ":" + ObsahZpravy + ":" + Polozky.join(","))
    switch (Type) {
        case "Pozdrav":
            if (isIn(ObsahZpravy, Polozky)) {
                let mention = FromUserName
                if (userMentions[mention]) {
                    mention = userMentions[mention]
                }
                Result += `Také zdravím, ${mention}. ${getEmote(":)", "20", "20")}<br>`
            }
            break
        case "Casy":
            if (isIn(ObsahZpravy, Polozky)) {
                let addToResult = "Čas: ${TIME}<br>"
                let Time = new Date().toLocaleDateString() + new Date().toLocaleTimeString()
                addToResult = addToResult.replace("${TIME}", Time)
                Result += addToResult
            }
            break
        case "KdoJsem":
            if (isIn(ObsahZpravy, Polozky)) {
                Result += `Jsem BOT. ${getEmote("smilerobot", "20", "20")}<br>`
            }
            break
        case "Test":
            if (isIn(ObsahZpravy, Polozky)) {
                Result += "Dobře, nevadí mi že testuješ.<br>"
            }
            break
        case "JakSeMam":
            if (isIn(ObsahZpravy, Polozky)) {
                Result += `Mám se dobře. ${getEmote(":)", "20", "20")}<br>`
            }
            break
        case "YTID":
            Result = YTID(Result, ObsahZpravy, Polozky)
            break
        case "Add":
            Result = Add(Result, ObsahZpravy, Polozky, UsersListStr, ActualUserName)
            break
        case "Rem":
            Result = Rem(Result, ObsahZpravy, Polozky, UsersListStr, ActualUserName)
            break
    }
    //console.log("Result = '"+Result+"'")
    //console.log(ObsahZpravy + ":" + Polozky.join(" X ") + ":" + Result + ":" + Type + ":" + "  Kubafgdx")
    return Result
}

function YTID(Result, ObsahZpravy, YTIDPolozky) {
    //console.log("YTID, result = "+Result)
    for (let i = 0; i < YTIDPolozky.length; i++) {
        //console.log(ObsahZpravy+ObsahZpravy.search(YTIDPolozky[i].replace(" ${ID}", ""))+YTIDPolozky[i].replace(" ${ID}", ""))
        let PolozkaSearch = ObsahZpravy.search(YTIDPolozky[i].replace(" ${ID}", ""))
        if (PolozkaSearch > -1) {
            if (PolozkaSearch === 0) {
                let YTIDPolozkaJenTextZpravy = YTIDPolozky[i].replace(" ${ID}", "")
                let MujObsahZpravy = ObsahZpravy.replace(YTIDPolozkaJenTextZpravy + " ", "")
                let addToResult = "Adresa URL videa: ${URL}<br>Aderesa URL videa bez reklam (uživatelům se zhlédnutím reklamy neposílají peníze): ${EMBEDURL}"

                let URLS = []
                let videoId = MujObsahZpravy
                URLS[0] = "https://youtu.be/" + videoId
                URLS[1] = "https://www.youtube.com/embed/" + videoId
                addToResult = addToResult.replace("${URL}", getLink(URLS[0], "Zde"))
                addToResult = addToResult.replace("${EMBEDURL}", getLink(URLS[1], "Zde"))
                Result += addToResult
                if (videoId.length !== 11) {
                    Result += `<br><font color="red">Warning: Video ID hasn't length 11 but ${videoId.length}.</font>`
                }
            } else {
                Result += '<font color="green">Pro YouTube ID napište zprávu jen s YouTube ID.</font>'
                return Result
            }
        }
    }
    //console.log("YTID, result = "+Result)
    return Result
}

function Add(Result, ObsahZpravy, AddPolozky, UsersListStr, UserName) {
    //console.log("Add...")
    //console.log(Result, ObsahZpravy, AddPolozky, UsersListStr, UserName)
    if (!isIn(UserName, Admins)) {
        return Result
    }
    for (let AddPolozka of AddPolozky) {
        let PolozkaSearch = ObsahZpravy.search(AddPolozka.replace(" ${NAME}", ""))
        if (PolozkaSearch > -1) {
            if (PolozkaSearch === 0) {
                let AddPolozkaJenTextZpravy = AddPolozka.replace(" ${NAME}", "")
                let AddUserName = ObsahZpravy.replace(AddPolozkaJenTextZpravy + " ", "")
                AddUserToList(AddUserName, UsersListStr)
                let addToResult = `Added ${AddUserName}.<br>`
                Result += addToResult
                return Result
            } else {
                Result += "Napište zprávu jen s Add."
                return Result
            }
        }
    }
    return Result
}

function Rem(Result, ObsahZpravy, RemPolozky, UsersListStr, UserName) {
    if (!isIn(UserName, Admins)) {
        return Result
    }
    for (let AddPolozka of RemPolozky) {
        let PolozkaSearch = ObsahZpravy.search(AddPolozka.replace(" ${NAME}", ""))
        if (PolozkaSearch > -1) {
            if (PolozkaSearch === 0) {
                let RemPolozkaJenTextZpravy = AddPolozka.replace(" ${NAME}", "")
                let RemUserName = ObsahZpravy.replace(RemPolozkaJenTextZpravy + " ", "")
                RemoveUserFromList(RemUserName, UsersListStr)
                let addToResult = `Removed ${RemUserName}.<br>`
                Result += addToResult
                return Result
            } else {
                Result += "Napište zprávu jen s Rem."
                return Result
            }
        }
    }
    return Result
}

function isIn(Value, Array) {
    if (Value && Array) {
        for (let i = 0; i < Array.length; i++) {
            if (Value.search(Array[i]) > -1) {
                return true
            }
        }
        return false
    }
}

function contains(Value, Array) {
    if (Value && Array) {
        for (let i = 0; i < Array.length; i++) {
            if (Value === Array[i]) {
                return true
            }
        }
        return false
    }
}

function getLink(Href, Value) {
    return "<a href='" + Href + "' target='_blank'>" + Value + "</a>"
}

function getEmoteTag(Class, Title, Type, Itemid, ItemTypeIndex, SrcIndex, SrcEnd, Alt, Width, Height) {
    let ItemTypes = ["http://schema.skype.com/Emoji"]
    let ItemType = ItemTypes[parseInt(ItemTypeIndex)]
    let Srcs = ["https://statics.teams.cdn.office.net/evergreen-assets/skype/v2/",
        "https://statics.teams.cdn.office.net/evergreen-assets/personal-expressions/v1/assets/emoticons/smilerobot/default/"]
    let Src = Srcs[parseInt(SrcIndex)] + SrcEnd
    return `<span class="${Class}" title="${Title}" type="${Type}"><img itemid="${Itemid}" itemscope="" itemtype="${ItemType}" src="${Src}" alt="${Alt}" style="width:${Width}px; height:${Height}px"></span>`
}

function getEmote(EmoteText, EmoteWidth, EmoteHeight) {
    let emotes = {
        ":)": getEmoteTag("animated-emoticon-20-smile", "Smajlík", "(smile)", "smile", "0", "0", "smile/20.png", "🙂", EmoteWidth, EmoteHeight),
        ":(": getEmoteTag("animated-emoticon-50-sad", "Smutek", "(sad)", "smile", "0", "0", "sad/50.png", "🙁", EmoteWidth, EmoteHeight),
        "smilerobot": getEmoteTag("animated-emoticon-20", "Usmívající se robot", "smilerobot", "smilerobot", "0", "1", "20_f.png?etag=v19", "🤖", EmoteWidth, EmoteHeight)
    }
    emotes["(smile)"] = emotes[":)"]
    emotes["(sad)"] = emotes[":("]
    if (emotes[EmoteText]) {
        return emotes[EmoteText]
    }
    return `<br>Emote ${EmoteText} doesn't exist.<br>`
}

function isAuthorized(UserName, UsersList, BOTType) {
    /*let UnauthorizedUserNames = [
      "Martin Vinduška"
    ]*/
    let UserNames = JSON.parse(UsersList)
    for (let UnauthorizedUserNameI in UserNames) {
        if (UserNames[UnauthorizedUserNameI] === UserName) {
            return (BOTType !== "blacklist")
        }
    }
    return (BOTType === "blacklist")
}

function AddUserToList(UserName, UsersListStr) {
    let UsersList = JSON.parse(UsersListStr)
    if (!contains(UserName, UsersList)) {
        UsersList.push(UserName)
    }
    SetUsersList(ActualWorkbook, JSON.stringify(UsersList))
    return UsersList
}

function RemoveUserFromList(UserName, UsersListStr) {
    let UsersList = JSON.parse(UsersListStr)
    let NewUsersList = []
    if (contains(UserName, UsersList)) {
        for (let UsersListName of UsersList) {
            if (UsersListName !== UserName) {
                NewUsersList.push(UsersListName)
            }
        }
    }
    SetUsersList(ActualWorkbook, JSON.stringify(NewUsersList))
    return NewUsersList
}

function SetUsersList(workbook, NewListStr) {
    let NewList = JSON.parse(NewListStr)
    let UsersListWorksheet = workbook.getWorksheet("UsersList");
    let UsersListTable = UsersListWorksheet.getTable("UsersListTable");
    UsersListTable.getColumn("User Name").getRangeBetweenHeaderAndTotal().clear()
    //console.log(NewList)
    if (NewList.length > 0) {
        for (let NewListItem of NewList) {
            UsersListTable.addRow(0, [NewListItem])
        }
    }
    return "Sucess."
}

function GetUsersList(workbook) {
    let UsersListWorksheet = workbook.getWorksheet("UsersList");
    let UsersListTable = UsersListWorksheet.getTable("UsersListTable");
    let values = UsersListTable.getColumn("User Name").getRange().getValues()
    let UsersListTableValues = (values ? values : [])
    let OnListUsers = []
    for (let UsersListTableValue of UsersListTableValues) {
        let Name = "" + UsersListTableValue[0]
        if (!isIn(Name, OnListUsers) && Name !== "User Name" && Name && Name !== "") {
            OnListUsers.push(Name)
        }
    }
    return OnListUsers
}
