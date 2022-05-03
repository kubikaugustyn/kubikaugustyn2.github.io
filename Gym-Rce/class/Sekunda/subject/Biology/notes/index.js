var __author__ = "kubik.augustyn@post.cz"

var notes = JSON.parse($$.Data.http("GET", "notes.json").responseText)

var YouTubeVideos = []

function processNoteCommands(note, container) {
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
            if (arguments[0].length === 11) {
                YouTubeVideos.push(new YouTubeVideoEmbedPreview(arguments[0], arguments.slice(1).join(" "), container))
                newLine = false
            } else result = `YouTube Video, ID part: ${arguments[0]}, other arguments: "${arguments.slice(1).join(" ")}"`
            break
        case "NOTE":
            result = ""
            newLine = false
            break
        case "ONE_LINE":
            verticalLine = $$.String.toBool(arguments.shift())
            result = arguments.join(" ")
            newLine = false
            break
        case "VERTICAL_NEW_LINE":
            verticalLine = $$.String.toBool(arguments.shift())
            newLine = $$.String.toBool(arguments.shift())
            result = arguments.join(" ")
            break
        case "TEXT_DOWN":
            newLine = !$$.String.toBool(arguments.shift())
            result = "<sub>" + arguments.join(" ") + "</sub>"
            break
        default:
            result = func + ": " + arguments.join(" ")
            break
    }
    // console.log(func, arguments, result)
    return [result, newLine, verticalLine]
}

function addText(container, text) {
    var a = document.createElement("span")
    a.innerHTML = text
    container.appendChild(a)
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
                    [html, doNewLine, drawVerticalLine] = processNoteCommands(note, container)
                } else {
                    html = note.replaceAll("\n", "")
                }
            }
            if (drawVerticalLine) {
                for (var a = 0; a < offset; a++) container.appendChild(document.createElement("verticalline"))
                // addText(container, "-")
                container.appendChild(document.createElement("horizontallline"))
            }
            html.length && addText(container, html)
            doNewLine && container.appendChild(document.createElement("br"))
        } else {
            buildNotes(container, offset + 1, note)
        }
        noteIndex++
    }
}

buildNotes(document.getElementById("notes"), 0, notes)
document.body.removeChild(document.getElementById("loading"))
window.scrollTo(0, document.body.scrollHeight)
