var __author__ = "kubik.augustyn@post.cz"

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

var auth = {}
auth.userCode = localStorage.getItem("code-translator-userCode")
auth.userCodes = {
    "7b13a27d-5613-4932-a96f-1058f7ce8559": "Sifra1"
}
auth.loggedIn = Object.keys(auth.userCodes).includes(auth.userCode)
auth.userName = auth.loggedIn ? auth.userCodes[auth.userCode] : "Nepřihlášen"
delete auth.userCodes
auth.logIN = function (code) {
    code && function () {
        document.location.hash = `#code=${code}`
    }()
    document.location.pathname = PATHS.LOGIN
}
auth.logOUT = function () {
    localStorage.removeItem("code-translator-userCode")
    document.location.pathname = PATHS.HOME
    document.location.reload()
}
