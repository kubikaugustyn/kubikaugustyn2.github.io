var __author__ = "kubik.augustyn@post.cz"

var notes = JSON.parse($$.Data.http("GET", "notes.json").responseText)

function processNoteCommands(note) {
    note = note.slice(1, note.length - 1)// <code> --> code
    var arguments = note.split(" ")
    for (var i = 0; i < arguments.length; i++) {
        arguments[i] = arguments[i].replaceAll("<SPACE>", " ")
    }
    var func = arguments.shift()
    console.log(func, arguments)
    return func + ": " + arguments.join(" ")
}

function buildNotes(container, offset, data) {
    var noteIndex = 0
    for (var note of data) {
        if (typeof note === "string") {
            // console.log(offset, note)
            var html = ""
            if (typeof data[noteIndex + 1] === "object") {
                html = "<underline>" + note + "</underline>"
            } else {
                html = note[0] === "<" ? processNoteCommands(note) : note.replaceAll("\n", "")
            }
            container.innerHTML += $$.Data.encryption.string.multiply("<verticalline></verticalline>", offset) + (offset > 0 ? "-" : "") + html + "<br>"
        } else {
            buildNotes(container, offset + 1, note)
        }
        noteIndex++
    }
}

buildNotes(document.getElementById("notes"), 0, notes)
document.body.removeChild(document.getElementById("loading"))
