console.log("VytvoritInput01.js...")

var strb1

function pridejinput() {
    ////////////confirm('Text v tlačítku je ' + obsahtlacitka + '.')
    alert("Přidávám vstup textu " + obsahtlacitka + ", barva pozadí " + strb1 + ".")
    makeadd1()
    var pridej = document.createElement("button")
    pridej.innerHTML = obsahtlacitka
    pridej.style.backgroundColor = barvatlacitka
    //pridej.placeholder = placeholder
    //pridej.id = "+guug+"
    document.getElementById("pridavacidivnatlacitka").appendChild(pridej)
}

function console2() {
    console.log("Přidávám vstup textu " + obsahtlacitka + ", barva pozadí " + strb1 + ".")
}

function showmsg2() {
    var elementIds = ["placeholder", "pozadi"]
    var buttonIds = ["placeholder1", "pozadi1"]
    var html = "";
    for (var i=0; i<elementIds.length; i++) {
        var elementId = elementIds[i]
        var buttonId = buttonIds[i]
        var value = document.getElementById(elementId).value
        html += "<div class='neviditelne'>" + elementId + ": " + "<div id='" + buttonId + "'>" + value + "</div></div><br>";
    }
    html += ""
    document.getElementById("ConsoleDiv").innerHTML = html;
}
