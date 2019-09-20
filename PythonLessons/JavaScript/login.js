console.log("Checking login2.js")

function setLockIcon(elementId, value) {
    var innerHTML = {
        true: "&#128275;",
        false: "&#128274;"
    }
    document.getElementById(elementId).innerHTML = innerHTML[value]

}

function setResetButton(){
    document.getElementById("reset").disabled = document.getElementById("UserNameInput").value != "" && document.getElementById("PasswordInput").value != ""

}

function checkUserName(sender) {
    console.log("function Login1(", sender, ")");
    var result = (userCredits[document.getElementById("UserNameInput").value] != undefined) || false
    setLockIcon("UserNameIcon", result)

    setResetButton()
    return result
}

function checkUserPassword(sender) {
    console.log("function Login2(", sender, ")");

    var result = checkUserName(sender) && (document.getElementById("PasswordInput").value == userCredits[document.getElementById("UserNameInput").value])
    setLockIcon("PasswordIcon", result)

    setResetButton()
    return result
}

function resetUserCredits(sender){
    console.log("checkUserCredits")
    setLockIcon("UserNameIcon", false)
    setLockIcon("PasswordIcon", false)
}

function prihlasit(sender) {
    console.log(sender)
}

var userCredits = {
    "bbb" : "ccc",
    "augustyn": "jakub"
}

 console.log(userCredits)
