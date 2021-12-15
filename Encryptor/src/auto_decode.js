Array.prototype.toLowerCase = function () {
    for (var i = 0; i < this.length; i++) {
        this[i] = this[i].toString().toLowerCase();
    }
}

var alphabet = {
    "/": "A",
    "!": "B",
    ":": "C",
    "=": "D",
    "+": "E",
    "-": "F",
    "×": "G",
    "€": "H",
    "&": "I",
    "@": "J",
    '"': "K",
    '“': "K",
    '”': "K",
    ".": "L",
    ",": "M",
    "?": "N",
    "(": "O",
    ")": "P",
    'nevim': "Q",
    ";": "R",
    "%": "S",
    "¥": "T",
    "£": "U",
    "~": "V",
    ">": "W",
    "#": "X",
    "{": "Y",
    "*": "Z",
    " ": " ",
}

var usersThatCanRead = ["B C", "Vilma Černá", "Vanessa Eliasová", "Sára Hrebinková"]

function bodyBR() {
    document.body.innerHTML += "<br>"
}

var rootDiv = undefined

function onLoad() {
    rootDiv = document.getElementById("root")
    decode(document.getElementById("message").value)
}

function decode(string) {
    console.log(string.split("\n"))
    var messages = string.split("\n")
    var resultMessages = []
    for (var message of messages) {
        var temp
        temp = message
        var messageTime = message.slice(0, message.search("]") + 1)
        message = message.slice(message.search("]") + 1, message.length)
        var messageSender = message.slice(1, message.search(":"))
        var messageText = message.slice(message.search(":") + 2, message.length)
        if (messageText.length > 0) {
            usersThatCanRead.includes(messageSender) ? console.log(messageTime, messageSender, decodeMessage(messageText)) : console.log("Uzivatel neumi, zprava:", messageText, messageSender)
            resultMessages.push(temp)
            resultMessages.push(`[AI] Přeloženo: "${messageText}", Od: "${messageSender}", Obsah zprávy: "<red>${decodeMessage(messageText)}</red>"`)
        }
    }
    var resultString = ""
    for (var resultMessage of resultMessages) {
        resultString += resultMessage + "<br>"
    }
    rootDiv.innerHTML = resultString
}

function decodeMessage(string) {
    var decoded_string = ""
    for (var part of string.split("")) decoded_string += alphabet[part] || "?"
    return decoded_string
}
