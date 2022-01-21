var __author__ = "kubik.augustyn@post.cz"

var url = "https://www.etaktik.cz/download/reseni/{id}_hch8.pdf"
var idLength = 3
var startAtId = "aaa"
var foundResultsNum = 0
var alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
var possibleCombinations = alphabet.length * alphabet.length * alphabet.length
var ids = []
var workingIds = []
var workingIdsLimit = 1

function start() {
    var sTime = Date.now()
    generateIds()
    processIds()
    var eTime = Date.now()
    console.log(`Done id ${(eTime - sTime) / 1000 / 60} min`)
}

function getIndexById(id = "aaa") {
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

function getIdByIndex(index = 0) {
    var id = ""
    for (var a = idLength - 1; a >= 0; a--) {
        if (!a) {
            id += alphabet[(index > -1 && index < alphabet.length) ? index : 0]
        } else {
            var indexMultiplier = 1
            for (var b = 0; b < a; b++) indexMultiplier = indexMultiplier * alphabet.length
            var charIndex = 0
            while (true) {
                if (index - indexMultiplier > -1) {
                    index = index - indexMultiplier
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

function idPlusPlus(id) {
    return getIdByIndex(getIndexById(id) + 1)
}

function generateIds() {
    var id
    id = startAtId
    for (var i = getIndexById(startAtId); i < possibleCombinations; i++) {
        i > getIndexById(startAtId) && (id = idPlusPlus(id))
        ids.push(id)
    }
    console.log(`Generated ${ids.length} ids.`)
}

function processIds() {
    for (var id of ids) {
        document.body.innerHTML = `<h1>${id}</h1>`
        var status = getFileStatus(url.replaceAll("{id}", id))
        if (status === 200) {
            workingIds.push(id)
        } else if (status === 404) {
            // console.log("404 Not Found")
        }
        if (workingIds.length === workingIdsLimit) break
    }
    console.log(`Processed ${ids.length} ids.`)
    console.log(`Found ${workingIds.length} working ids.`)
    workingIds.length && console.log(`Working ids: ${workingIds.join(", ")}.`)
}

function getFileStatus(url) {
    var http = new XMLHttpRequest()
    http.open("HEAD", url, false)
    http.onerror = function () {
        // console.log("error")
    }
    http.upload.onerror = function () {
        // console.log("error")
    }
    http.onloadend = function () {
    }
    try {
        http.send()
    } catch (e) {

    }
    return http.status
}
