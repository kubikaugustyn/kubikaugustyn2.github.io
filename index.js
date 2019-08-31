var MOJE_HESLO = "bbb"

var MOJE_HESLOb = "ccc"

var MOJE_HESLOc = "dddd"

function Minus() {
    console.log("Klávesa stisknuta...");
    var msg = ""
    if (document.getElementById("input01").value == MOJE_HESLO) {
        msg = "Vítejte Paní učitelko (Pane učiteli)!!!<br><a href='PythonLessons/Html/UcitelPoHeslu.html'>Kubíkův web</a>"
    }

      if (document.getElementById("input01").value == MOJE_HESLOb) {
        msg = "Vítej Žáku!!!<br><a href='PythonLessons/Html/ZakPoHeslu.html'>Kubíkův web</a>"
    }

       if (document.getElementById("input01").value == MOJE_HESLOc) {
        msg = "<a href='PythonLessons/Html/PoHeslu.html'>Kubíkův web</a>"
    }
    document.getElementById("neco").innerHTML = msg
}
