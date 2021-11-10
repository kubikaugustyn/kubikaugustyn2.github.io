var __author__ = "kubik.augustyn@post.cz"

var text = undefined,
    root = undefined,
    messages = [],
    messageIndex = 0,
    userName = "Patrik Augustýn",
    usersListStr = "['Kuba test!', 'Kuba', 'Jakub Augustýn', 'Patrik Augustýn']"

function sendMessage(message, from) {
    var div = document.createElement("div")
    div.innerHTML = `&lt;${from}&gt; ${message}`
    root.appendChild(div)
}

function onLoad() {
    text = document.getElementById("text")
    root = document.getElementById("root")
    text.onkeydown = function (event) {
        // console.log(event)
        if (!event.ctrlKey && event.code === "Enter" && text.value !== "") {
            // console.log("Send")
            startBot(text.value)
            text.value = ""
        } else if (event.code === "ArrowUp" && messageIndex > 0) {
            messageIndex--
            text.value = messages[messageIndex]
        } else if (event.code === "ArrowDown" && messageIndex < messages.length - 1) {
            messageIndex++
            text.value = messages[messageIndex]
        } else if (event.code === "ArrowDown" && messageIndex === messages.length - 1) {
            text.value = messages[messageIndex]
        } else if (event.key === "?" && event.ctrlKey) {
            startBot("?")
        }
    }
}

function startBot(message = "") {
    var lowMessage = message.toLowerCase()
    console.groupCollapsed("Bot:", message, lowMessage)
    sendMessage(message, userName)
    messages.push(message)
    messageIndex = messages.length - 1
    // Start
    //<font color="red"><span style="font-size:x-large;background-color:yellow">THIS IS BOT.</span></font>
    //let Result = '<span style="font-size:x-large;color:red";background-color:yellow>THIS IS BOT.</span><br>'
    let DefaultResult = ''//'<font color="red"><span style="font-size:x-large;background-color:yellow">THIS IS BOT.</span></font><br>'
    //let DefaultResult = 'THIS IS BOT.<br>'
    let Result = DefaultResult
    let Pozdravy = ["dobrý den", "ahoj", "čus"]
    let Casy = ["kolik je hodin", "jaký je čas"]
    let YTID = ["YouTubeID ${ID}", "YtID ${ID}"]
    let KdoJsem = ["kdo jsi"]
    let JakSeMam = ["jak se mas", "jak se máš"]
    let Test = ["test"]

    let ZpravyObsahy = Pozdravy
    ZpravyObsahy = ZpravyObsahy.concat(Casy)
    ZpravyObsahy = ZpravyObsahy.concat(YTID)
    ZpravyObsahy = ZpravyObsahy.concat(KdoJsem)
    ZpravyObsahy = ZpravyObsahy.concat(JakSeMam)

    Result = addMessageValue(message, Pozdravy, Result, "Pozdrav", userName, usersListStr)
    Result = addMessageValue(message, KdoJsem, Result, "KdoJsem", userName, usersListStr)
    Result = addMessageValue(message, JakSeMam, Result, "JakSeMam", userName, usersListStr)
    Result = addMessageValue(message, Casy, Result, "Casy", userName, usersListStr)
    Result = addMessageValue(message, Test, Result, "Test", userName, usersListStr)
    Result = addMessageValue(message, YTID, Result, "YTID", userName, usersListStr)
    if (Result === DefaultResult) {
        // Result += "Zkuste napsat: " + ZpravyObsahy.join(" NEBO ")
        Result += "Zkuste napsat:<br>-" + ZpravyObsahy.join("<br>-")
        window.open("https://www.google.com/search?q=" + message.replace(" ", "+"), "_blank")
    }
    //console.log("Result: " + Result)
    sendMessage(Result, "BOT")
    // End
    console.groupEnd()
}
