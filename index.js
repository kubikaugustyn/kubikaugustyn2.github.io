var MOJE_HESLO = "bbb"

function Minus() {
    console.log("Klávesa stisknuta...");
    var msg = ""
    if (document.getElementById("input01").value == MOJE_HESLO) {
        msg = "<a href='https://kubikaugustyn.github.io/'>Kubíkovo web</a>"
    }
    document.getElementById("neco").innerHTML = msg
}
