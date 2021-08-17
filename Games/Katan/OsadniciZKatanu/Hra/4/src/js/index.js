var cs = new Canvas(
    {"id": "gameCanvas"},
    {"background-color": ""},
    "game"
)

function dId(id) {
    return document.getElementById(id)
}

var devMode = document.location.host === "localhost:63342",
    name,
    role

function calculateScale(width, height, maxWidth, maxHeight, margin) {
    var scaleWidth = (maxWidth - 2 * margin) / width
    var scaleHeight = (maxHeight - 2 * margin) / height
    var scale = (scaleWidth < scaleHeight ? scaleWidth : scaleHeight)
    var newWidth = Math.floor(width * scale)
    var newHeight = Math.floor(height * scale)
    return [scale, newWidth, newHeight]
}

function onResize() {

}

function selectRole() {
    console.log("Select role...")
    name = dId("name").value
    localStorage.setItem("username", name)
    dId("selectName").remove()
    dId("selectRole").style.display = "block"
    // select.value === Selected value.
}

function selectName() {
    console.log("Select name...")
    dId("start").remove()
    dId("selectName").style.display = "block"
    var nameInput = dId("name")
    if (localStorage.getItem("username")) {
        nameInput.value = localStorage.getItem("username")
    }
    var button = dId("nameOK")
    button.setAttribute("onClick", "selectRole()")
    button.removeAttribute("disabled")
    devMode && button.click()
}

function onPlayReady() {
    var button = dId("playButton")
    button.setAttribute("onClick", "selectName()")
    button.removeAttribute("disabled")
    devMode && button.click()
}

function onLoad() {
    var urlParams = myURL.parseParams(document.location.search)
    // When running from PyCharm
    if (urlParams._ijt) {
        delete urlParams._ijt
        myURL.setParams(urlParams)
    }
    onResize()
    onPlayReady()
}

window.onresize = onResize()
var aa = new URL(window.location.href)
