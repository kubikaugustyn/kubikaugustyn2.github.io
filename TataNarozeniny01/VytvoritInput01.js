console.log("VytvoritInput01.js...")

function pridejinput() {
    ////////////confirm('Text v tlačítku je ' + obsahtlacitka + '.')
    alert("Přidávám vstup textu pomoc pri zadávání " + document.getElementById("placeholder").value + ", barva pozadí " + str1 + ".")
    var pridej = document.createElement("input")
    pridej.placeholder = document.getElementById("placeholder").value
    pridej.style.backgroundColor = barvapozadi
    makeadd1()
    document.getElementById("pridavacidivnatlacitka").appendChild(pridej)
    console.log("Přidávám vstup textu " + document.getElementById("placeholder").value + ", barva pozadí " + str1 + ".")
}

/*function showmsg2() {
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
}*/
