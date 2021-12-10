var __author__ = "kubik.augustyn@post.cz"

function send() {
    localStorage.setItem("code-translator-userCode", document.getElementById("code").value)
    document.location.pathname = PATHS.HOME
}

function onLoad() {
    var hashParams = myURL.parseParams("?" + document.location.hash.slice(1))
    // console.log(hashParams)
    if (Object.keys(hashParams).includes("code")) {
        document.location.hash = ""
        document.location.search = `?code=${hashParams.code}`
    }
    var params = myURL.parseParams()
    if (Object.keys(params).includes("code")) {
        document.getElementById("code").value = params["code"]
        send()
    }
    document.getElementById("continue").onclick = function () {
        document.getElementById("form").style.display = "block"
        document.getElementById("continue").style.display = "none"
    }
    document.getElementById("send").onclick = send
}
