var __author__ = "kubik.augustyn@post.cz"

var div = document.getElementById("editor")

var notes = JSON.parse($$.Data.http("GET", "notes.json").responseText)
var notesHTML = JSON.parse(JSON.stringify(notes))

function processNotes(target, path = []) {
    for (var i = 0; i < target.length; i++) {
        if (typeof target[i] === "string") {
            var elem = document.createElement("input")
            elem.value = target[i]
            elem.size = target[i].length + 10
            elem.setAttribute("note-path", [...path, i].join("."))
            // elem.addEventListener("keyup", noteEvent)
            elem.addEventListener("keydown", noteEvent)
            target[i] = elem
        } else {
            processNotes(target[i], [...path, i])
        }
    }
}

function renderNotes(target, offset = 0) {
    for (var i = 0; i < target.length; i++) {
        if (JSON.stringify(target[i])[0] === "[") {
            renderNotes(target[i], offset + 1)
        } else {
            for (var a = 0; a < offset; a++) div.appendChild(document.createElement("verticalline"))
            div.appendChild(target[i])
            div.appendChild(document.createElement("br"))
        }
    }
}

function setNote(path, value, overwrite = true, target = notes) {
    var index = path.shift()
    if (typeof target[index] === "object") {
        setNote(path, value, target[index])
    } else {
        if (overwrite) target[index] = value
        else target = [...target.slice(0, index), ...target.slice(index - 1), "kuba"]
    }
}

function addNote(path, value = "") {
    path[path.length - 1] = path[path.length - 1] + 1
    setNote(path, value, false)
}

function removeNote(path, target = notes) {
    console.log(path, target)
    var index = path.shift()
    if (path.length) {
        removeNote(path, target[index])
    } else {
        target = [...target.slice(0, index), ...target.slice(index + 1)]
    }
}

function shiftNote(path) {
    console.log("Shift", path)
}

function popNote(path) {
    console.log("Pop", path)
}

function noteEvent(event) {
    var path = event.target.getAttribute("note-path").split(".")
    for (var i = 0; i < path.length; i++) path[i] = Number(path[i])
    var render = true
    if (event.code === "Enter") {
        addNote(path)
    } else if (event.code === "KeyY" && event.ctrlKey) {
        removeNote(path)
    } else if (event.code === "KeyD" && event.ctrlKey) {
        addNote(path, event.target.value)
        console.log(notes[1][1])
    } else if (event.code === "Tab" && event.shiftKey) {
        shiftNote(path)
    } else if (event.code === "Tab" && !event.shiftKey) {
        popNote(path)
    } else {
        render = false
        event.target.size = event.target.value.length + 10
    }
    if (render) {
        div.innerHTML = ""
        // notesHTML = JSON.parse(JSON.stringify(notes))
        // processNotes(notesHTML)
        renderNotes(notesHTML)
    }
    // console.log(event, event.target)
}

processNotes(notesHTML)
renderNotes(notesHTML)
