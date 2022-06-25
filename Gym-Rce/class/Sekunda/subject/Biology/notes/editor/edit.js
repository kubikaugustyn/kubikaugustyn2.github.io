var __author__ = "kubik.augustyn@post.cz"

if (document.location.origin === "http://localhost:63342" && document.location.search !== "?_ij_reload=RELOAD_ON_SAVE") {
    document.location.search = "?_ij_reload=RELOAD_ON_SAVE"
}

var div = document.getElementById("editor")

var notes = JSON.parse($$.Data.http("GET", "../notes.json").responseText)

function biologySyntax(letters) {
    return letters
}

var textEditor = new TextEditor(div, biologySyntax, "text-editor")
console.log("Text editor:", textEditor)
