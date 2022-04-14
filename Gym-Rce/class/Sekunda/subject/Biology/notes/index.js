var __author__ = "kubik.augustyn@post.cz"

var notes = JSON.parse($$.Data.http("GET", "notes.json").responseText)

function buildNotes(container, offset, data) {
    var noteIndex = 0
    for (var note of data) {
        if (typeof note === "string") {
            // console.log(offset, note)
            var html = ""
            if (typeof data[noteIndex + 1] === "object") {
                html = "<underline>" + note + "</underline>"
            } else {
                html = note
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
