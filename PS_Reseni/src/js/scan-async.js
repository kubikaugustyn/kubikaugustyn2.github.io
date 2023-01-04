var __author__ = "kubik.augustyn@post.cz"

// **********************************
var url = "https://www.etaktik.cz/download/reseni/{id}_hd8.pdf"
var idLength = 4
var alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
// **********************************

String.prototype.multiply = String.prototype.repeat
var startAtId = alphabet[0].multiply(idLength)
var possibleCombinations = Math.pow(alphabet.length, idLength)
var id = "waaa"// getIdByIndex(possibleCombinations - 1) // The id before first id we use in request
var workingIds = []
var workingIdsLimit = 1
var sTime, eTime

function start() {
    document.title = "Scaner - scanning"

    var s = document.body.style
    s.width = "fit-content"
    s.height = "fit-content"
    s.margin = 0
    s.position = "absolute"
    s.top = "50%"
    s.left = "50%"
    s.transform = "translate(-50%, -50%)"
    s.color = "white"
    s.backgroundColor = "black"

    sTime = Date.now()
    onIdLoad()
}

function getIndexById(id = startAtId) {
    var index = 0
    for (var a in id.split("")) {
        var char = id[a]
        var charIndex = alphabet.indexOf(char)
        var indexMultiplier = 1
        for (var b = 0; b < idLength - 1 - a; b++) indexMultiplier = indexMultiplier * alphabet.length
        index += charIndex * indexMultiplier
    }
    return index
}

function getIdByIndex(i = 0) {
    var id = ""
    for (var a = idLength - 1; a >= 0; a--) {
        if (!a) {
            id += alphabet[(i > -1 && i < alphabet.length) ? i : 0]
        } else {
            var indexMultiplier = 1
            for (var b = 0; b < a; b++) indexMultiplier = indexMultiplier * alphabet.length
            var charIndex = 0
            while (true) {
                if (i - indexMultiplier > -1) {
                    i = i - indexMultiplier
                    charIndex++
                } else {
                    break
                }
            }
            id += alphabet[(charIndex > -1 && charIndex < alphabet.length) ? charIndex : 0]
        }
    }
    return id
}

function nextId(id = startAtId) {
    return getIdByIndex(getIndexById(id) + 1)
}

function onIdLoad(http) {
    if (http) {
        if (http.status === 200) {
            console.warn(`We got working ID!`)
            workingIds.push(id)
        }
    }
    document.body.innerHTML = `<h1>Id: ${id}</h1><br><h2>(${getIndexById(id)} / ${possibleCombinations})</h2>`
    document.body.innerHTML += `<div>Found working ids: ${workingIds.length} / ${workingIdsLimit}<br>${workingIds.map(id => `<b>${id}</b><br>`)}</div>`
    document.body.innerHTML += `<style>h1, h2, h3, h4, h5, h6 {margin: 0; padding: 0; border: 0}</style>`
    if (workingIds.length < workingIdsLimit && (http ? getIndexById(id) < possibleCombinations - 1 : true)) {
        id = nextId(id)
        getFileStatus(url.replaceAll("{id}", id), id)
        return
    }

    eTime = Date.now()
    var millis = eTime - sTime
    console.log(`Done id ${Math.round((millis / 1000 / 60) * 100) / 100}min (${millis}ms)`)
    console.log(`Found ${workingIds.length} working ids.`)
    workingIds.length && console.log(`Working ids: ${workingIds.join(", ")}.`)

    document.body.innerHTML += `<p>Done in ${Math.round((millis / 1000 / 60) * 100) / 100}min (${millis}ms)</p>`
    document.title = "Scaner - done"
}

function getFileStatus(url) {
    var http = new XMLHttpRequest()
    http.open("HEAD", url, true)
    http.onreadystatechange = function () {
        if (this.readyState === 4) onIdLoad(this)
    }
    http.send()
}

start()
