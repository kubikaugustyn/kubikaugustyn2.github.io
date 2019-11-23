console.log("VytvoritTlacitko01.js...")

var pridanipovolenoA = 0

var pridanipovolenoB = 0

var pridanipovoleno1 = 0

pridani = false

/*function loadobsahtlacitka() {
    document.getElementById("innertext").value = obsahtlacitka
    //////////console.log(obsahtlacitka)
}*/

function pridattlacitko() {
    if (document.getElementById('innertext').value === '') {
        pridanipovolenoA = 0
    }

    else {
        pridanipovolenoA = 1
    }

    if (document.getElementById('pozadi').value === '') {
        pridanipovolenoB = 0
    }

    else {
        pridanipovolenoB = 1
    }

    pridanipovoleno1 = pridanipovolenoA + pridanipovolenoB

    if (pridanipovoleno1 === 2) {
        pridani = true
        console.log(pridani + " pravda...")
    }

    if (pridanipovoleno1 === 2) {
        pridani === false
        console.log(pridani + " lez...")
    }

    if (pridanipovoleno1 === 1) {
        pridani === false
        console.log(pridani + " lez...")
    }
}

function pridejbutton() {
    if (pridani === true) {
        ////////////confirm('Text v tlačítku je ' + obsahtlacitka + '.')
        alert("Přidávám tlačítko " + document.getElementById("innertext").value + ", barva pozadí " + str1 + ".")
        console.log("Přidávám tlačítko " + document.getElementById("innertext").value + ", barva pozadí " + str1 + ".")
        var pridej = document.createElement("button")
        pridej.innerHTML = document.getElementById("innertext").value
        pridej.style.backgroundColor = barvatlacitka
        makeadd1()
        document.getElementById("pridavacidivnatlacitka").appendChild(pridej)
    }
}

/*var elementIds = ["innertext"];

function showMsg() {
    var html = "";
    for (var i=0; i<elementIds.length; i++) {
        var elementId = elementIds[i];
        var value = document.getElementById(elementId).value
        html += value;
    }
    html += ""
    document.getElementById("innertext1").innerText = html;
}*/

/*function console1() {
    console.log("Přidávám tlačítko " + obsahtlacitka + ", barva pozadí " + str1 + ".")
}*/

/*var elementIds1 = ["pozadi"];

function showMsg1() {
    var html = "";
    for (var i=0; i<elementIds.length; i++) {
        var elementId1 = elementIds1[i];
        var value = document.getElementById(elementId1).value
        html += value;
    }
    html += ""
    document.getElementById("pozadi1").innerText = html;
}*/

/*function showmsg1() {
    var elementIds = ["innertext", "pozadi"]
    var buttonIds = ["innertext1", "pozadi1"]
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
