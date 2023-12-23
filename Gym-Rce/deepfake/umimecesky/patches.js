var __author__ = "kubik.augustyn@post.cz"

var params = new URLSearchParams(location.search)
var usernames = "sýkora koroptev slon červ pavouk krokodýl zebra krokodýl aligátor anonym had kachna kos kočka pes slepice kuře".split(" ")
var username = usernames[Math.floor(Math.random() * usernames.length)]

function checkParams() {
    if (!params.has("url") || !params.has("name") || !params.has("shield")) redirectToGenerator()
}

function applyPatches() {
    var elem
    for (elem of document.getElementsByName("kuba-1")) {
        elem.innerText = `Anonymní ${username[0].toUpperCase()}${username.slice(1).toLowerCase()}`
    }
    for (elem of document.getElementsByName("kuba-2")) {
        elem.innerText = params.get("name")
    }
    for (elem of document.getElementsByClassName("search-input")) {
        elem.addEventListener("keydown", () => redirectToReal())
        elem.addEventListener("click", () => redirectToReal())
    }

    showFinalBoard = ourShowFinalBoardFactory(showFinalBoard)
}

function useParams() {
    initSkill()
    initBar()
    var shield = params.get("shield")
    if (!"34".split("").includes(shield)) {
        redirectToGenerator()
        return
    }
    showFinalBoard("medalBased", "ps", "mastered".concat(shield), "0") // Stit X dosazen
    if (shield === "3") updateBar(.955) // Stit 3 bar
    else updateBar(1) // Stit 4 bar
}

function ourShowFinalBoardFactory(func) {
    return (...args) => {
        // console.log("Show final board:", ...args)
        func(...args)
        if (args[2] === "endSet") {
            // console.warn("SUS")
            /**
             * @type {HTMLAnchorElement}
             */
            var a = document.getElementById("finalBoard").querySelector(".tlacitko.large.primary.repeatSet")
            a.href = "#"//params.get("url")
            // a.onclick = () => redirectToReal(params.get("url"))
            a.onclick = () => showLimit(true)
        }
        /**
         * @type {HTMLCollectionOf<HTMLAnchorElement>}
         */
        var buttons = document.getElementById("finalBoard").querySelectorAll(".tlacitko.medium.secondary")
        for (var link of buttons) {
            var url = new URL(link.href)
            url.host = "www.umimecesky.cz"
            url.protocol = "https:"
            url.port = "443"
            link.href = url.toString()
        }
    }
}

function manageFullscreen() {
    if (!document.fullscreenElement) {
        showFullscreenRequest(true)
        toggleFullScreen(true).then(manageFullscreen).catch(() => {
        })
    } else showFullscreenRequest(false)
}

var limitShown = false

function showLimit(limited = true) {
    limitShown = limited
    document.getElementById("need_fullscreen").style.display = "none"
    document.getElementById("exercise").style.display = limited ? "none" : "block"
    document.getElementById("limit_thing").style.display = limited ? "block" : "none"
}

function showFullscreenRequest(shown = true) {
    var isLimit = limitShown
    showLimit(shown ? true : limitShown)
    limitShown = isLimit
    if (shown) document.getElementById("limit_thing").style.display = "none"
    document.getElementById("need_fullscreen").style.display = shown ? "block" : "none"
}

function toggleFullScreen(on = true) {
    var promise
    if (/*!document.fullscreenElement && */on) {
        var elem = document.documentElement
        if (elem.requestFullscreen) {
            promise = elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            promise = elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            promise = elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            promise = elem.msRequestFullscreen();
        }
    } else/* if (document.exitFullscreen && !on)*/ {
        if (document.exitFullscreen) {
            promise = document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            promise = document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            promise = document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            promise = document.msExitFullscreen();
        }
    }
    return promise
}

function redirectToReal(path = "") {
    try {
        new URL(path)
        document.location = path // If the path is valid (it has a prefix)
    } catch {
        document.location = "https://www.umimecesky.cz/".concat(path)
    }
}

function redirectToGenerator() {
    document.location = location.pathname.concat("generator.html")
}


checkParams()
applyPatches()
showLimit(false)
setTimeout(useParams, 100)
setInterval(manageFullscreen, 100)

///////////////////////////////////////////
// showFinalBoard("medalBased", "ps", "endSet", "0") // Sada dokoncena
// showFinalBoard("medalBased", "ps", "mastered3", "0") // Stit 3 dosazen
// showFinalBoard("medalBased", "ps", "mastered4", "0") // Stit 4 dosazen
// maxSkill = 10 // IDK
// updateBar(.5) // Update bar to percentage
// updateBar(.955) // Stit 3 bar
// updateBar(1) // Stit 4 bar
///////////////////////////////////////////
