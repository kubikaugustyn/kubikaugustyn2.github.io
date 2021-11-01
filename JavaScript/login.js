console.log("Checking login2.js")

var UserNameIsGood, PasswordIsGood = false

function getElemById(id) {
    return document.getElementById(id)
}

var lockIcons = {
    true: "&#128275;",
    false: "&#128274;"
}

function setLockIcon(elementId, value) {
    document.getElementById(elementId).innerHTML = lockIcons[value]
}

function setResetButton() {
    if (document.getElementById("UserNameInput").value !== "") {
        document.getElementById("ResetButtonDiv").innerHTML = '<input onclick="setResetButton(); resetForm()" type="reset" value="Vynulovat" class="btn float-right login_btn">'
    } else if (document.getElementById("PasswordInput").value !== "") {
        document.getElementById("ResetButtonDiv").innerHTML = '<input onclick="setResetButton(); resetForm()" type="reset" value="Vynulovat" class="btn float-right login_btn">'
    } else {
        document.getElementById("ResetButtonDiv").innerHTML = '<input onclick="setResetButton(); resetForm()" type="reset" value="Vynulovat" class="btn float-right login_btn" disabled>'
    }
}

function checkUserName(sender) {
    var result = (userCredits[document.getElementById("UserNameInput").value] !== undefined) || false
    setLockIcon("UserNameIcon", result)
    UserNameIsGood = result

    setResetButton()
    return result
}

function checkUserPassword(sender) {
    var result = checkUserName(sender) && (document.getElementById("PasswordInput").value === userCredits[document.getElementById("UserNameInput").value])
    setLockIcon("PasswordIcon", result)
    PasswordIsGood = result

    setResetButton()
    return result
}

function checkUserNameAndUserPassword(sender) {
    if (PasswordIsGood === true && UserNameIsGood === true) {
        getElemById("GoodUserNameAndUserPassword").innerHTML = lockIcons.true
        getElemById("Prihlasit").removeAttribute("disabled")
    } else {
        getElemById("GoodUserNameAndUserPassword").innerHTML = lockIcons.false
        getElemById("Prihlasit").setAttribute("disabled", "")
    }
}

function resetUserCredits(sender) {
    setLockIcon("UserNameIcon", false)
    setLockIcon("PasswordIcon", false)
}

function prihlasit(sender) {
    console.log("Logging in...")
}

var userCredits = {
    "bbb": "ccc",
    "augustyn": "jakub"
}

console.log(userCredits)

function resetForm() {
    document.location.reload()
}
