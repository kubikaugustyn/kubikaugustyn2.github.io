console.log("VytvoritTlacitko01.js...")

var obsahtlacitka

var barvatlacitka

var str1

function loadobsahtlacitka() {
    obsahtlacitka = document.getElementById("innertext1").innerText
    //////////console.log(obsahtlacitka)
}

function pridejbutton() {
    ////////////confirm('Text v tlačítku je ' + obsahtlacitka + '.')
    alert("Přidávám tlačítko " + obsahtlacitka + ", barva pozadí " + str1 + ".")
    makeadd1()
    var pridej = document.createElement("button")
    pridej.innerHTML = obsahtlacitka
    pridej.style.backgroundColor = barvatlacitka
    //pridej.placeholder = placeholder
    //pridej.id = "+guug+"
    document.getElementById("pridavacidivnatlacitka").appendChild(pridej)
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

function onInputKeyPress(event) {
    ////////////console.log(event);
    showmsg1();
}

function loadbarvatlacitka1() {
    var englishToCzechColors = {
        "red": "červená",
        "blue": "modrá",
        "green": "zelená",
        "darkgreen": "tmavězelená",
        "greenyellow": "zelenožlutá",
        "lightgreen": "světlezelená",
        "darkred": "tmavěčervená",
        "orangered": "oranžovočervená",
        "gold": "zlatá",
        "orange": "oranžová",
        "darkorange": "tmavěoranžová",
        "lightyellow": "světležlutá",
        "yellow": "žlutá",
        "lightblue": "světlemodrá",
        "darkblue": "tmavěmodrá",
        "violet": "fialová",
        "blueviolet": "modrofialová",
        "darkviolet": "tmavěfialová",
        "pink": "růžová",
        "white": "bílá",
        "lightgray": "světlešedá",
        "darkgray": "tmavěšedá",
        "gray": "šedá",
        "black": "černá",
        "brown": "hnědá"//,
        //"dark": "tmavě"
    }

    var str = document.getElementById("pozadi").value

    for (var englishColor in englishToCzechColors) {
        str = str.replace(englishColor, englishToCzechColors[englishColor])
    }

    document.getElementById("pozadi").value = str;

    barvatlacitka = document.getElementById("pozadi1").innerText
    ////////////console.log(barvatlacitka)
    str1 = str
    console.log(str1)
}

function console1() {
    console.log("Přidávám tlačítko " + obsahtlacitka + ", barva pozadí " + str1 + ".")
}

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

function onInputKeyPress1(event) {
    //////////console.log(event);
    showmsg1();
}


function showmsg1() {
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
}
