var __author__ = "kubik.augustyn@post.cz"

var notes = JSON.parse($$.Data.http("GET", "notes.json").responseText)

function processNoteCommands(note) {
    note = note.slice(1, note.length - 1)// <code> --> code
    var arguments = note.split(" ")
    for (var i = 0; i < arguments.length; i++) {
        arguments[i] = arguments[i].replaceAll("<SPACE>", " ")
    }
    var func = arguments.shift()
    var result = ""
    var newLine = true
    var verticalLine = false
    switch (func.toUpperCase()) {
        case "YTID":
            if (arguments[0].length === 11)
                // result = `<iframe allowfullscreen src="https://youtube.com/embed/${arguments[0]}">${arguments.slice(1).join(" ")}</iframe>`
                result = `<iframe width="300" height="150" src="https://www.youtube.com/embed/${arguments[0]}" title="YouTube video player - ${arguments.slice(1).join(" ")}" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen>${arguments.slice(1).join(" ")}</iframe>`
            else result = `YouTube Video, ID part: ${arguments[0]}, other arguments: "${arguments.slice(1).join(" ")}"`
            break
        case "NOTE":
            result = ""
            newLine = false
            break
        case "ONE_LINE":
            result = arguments.join(" ")
            newLine = false
            verticalLine = true
            break
        case "TEXT_DOWN":
            result = "<sub>" + arguments.join(" ") + "</sub>"
            break
        default:
            result = func + ": " + arguments.join(" ")
            break
    }
    console.log(func, arguments, result)
    return [result, newLine, verticalLine]
}

function buildNotes(container, offset, data) {
    var noteIndex = 0
    for (var note of data) {
        if (typeof note === "string") {
            // console.log(offset, note)
            var html = ""
            var doNewLine = true
            var drawVerticalLine = true
            if (typeof data[noteIndex + 1] === "object") {
                html = "<underline>" + note + "</underline>"
            } else {
                if (note[0] === "<") {
                    [html, doNewLine, drawVerticalLine] = processNoteCommands(note)
                } else {
                    html = note.replaceAll("\n", "")
                }
            }
            container.innerHTML += (drawVerticalLine ? $$.Data.encryption.string.multiply("<verticalline></verticalline>", offset) + (offset > 0 ? "-" : "") : "") + html + (doNewLine ? "<br>" : "")
        } else {
            buildNotes(container, offset + 1, note)
        }
        noteIndex++
    }
}

buildNotes(document.getElementById("notes"), 0, notes)
document.body.removeChild(document.getElementById("loading"))
