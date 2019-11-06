console.log("TataNarozeniny01.js...")

var pagebody

function pageBody() {
    pagebody = document.getElementById('body').innerHTML
    ////////////console.log(pagebody + "54")
}

function openLinkInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

function vymaz() {
    document.getElementById(elementIds).value = ""
}

var obsahtlacitka

function loadobsahtlacitka() {
    obsahtlacitka = document.getElementById("innertext1").innerText
    ///////////////console.log(obsahtlacitka)
}

function pridejbutton() {
    ////////////confirm('Text v tlačítku je ' + obsahtlacitka + '.')
    alert("Přidávám tlačítko " + obsahtlacitka + ", barva pozadí " + barvatlacitka + ".")
    makeadd1()
    var pridej = document.createElement("button")
    pridej.innerHTML = obsahtlacitka
    pridej.style.backgroundColor = barvatlacitka
    //pridej.placeholder = placeholder
    //pridej.id = "+guug+"
    document.getElementById("pridavacidivnatlacitka").appendChild(pridej)
}

var elementIds = ["innertext"];

function showMsg() {
    var html = "";
    for (var i=0; i<elementIds.length; i++) {
        var elementId = elementIds[i];
        var value = document.getElementById(elementId).value
        html += value;
    }
    html += ""
    document.getElementById("innertext1").innerText = html;
}

function onInputKeyPress(event) {
    ////////////console.log(event);
    showMsg();
}






function vymaz1() {
    document.getElementById(elementIds1).value = ""
}

var barvatlacitka

function loadbarvatlacitka1() {
    barvatlacitka = document.getElementById("pozadi1").innerText
    ///////////////console.log(barvatlacitka)
}

var elementIds1 = ["pozadi"];

function showMsg1() {
    var html = "";
    for (var i=0; i<elementIds.length; i++) {
        var elementId1 = elementIds1[i];
        var value = document.getElementById(elementId1).value
        html += value;
    }
    html += ""
    document.getElementById("pozadi1").innerText = html;
}

function onInputKeyPress1(event) {
    //////////console.log(event);
    showMsg1();
}

function makeadd() {
    /////////////console.log(pagebody + "1")
    //////////console.log(pagebody + "1")
    /////////////////console.log(pagebody + "1")
    document.getElementById('body').innerHTML = makeelementinnerhtml
}

function makeadd1() {
    ////////////console.log(pagebody + "5")
    document.getElementById('body').innerHTML = pagebody
}


function makebutton() {
    console.log("Vytvořit tlačítko...")
    document.getElementById('body').innerHTML = makebuttoninnerhtml
}

function console1() {
    console.log("Přidávám tlačítko " + obsahtlacitka + ", barva pozadí " + barvatlacitka + ".")
}





var makeelementinnerhtml =
    "<div class='divcenter center'>Vytvořit<br>" +
    "<div class='divcara'></div>" +
    "<button onclick='makebutton()'>Tlačítko</button><br>" +
    "<div class='divcara'></div>" +
    "<a href='TataNarozeniny01Error.html'>Vstup textu(Nemačkat!!!)</a><br>" +
    "<div class='divcara'></div>" +
    "<a href='TataNarozeniny01Error.html'>Odkaz(Nemačkat!!!)</a><br>" +
    "<div class='divcara'></div>" +
    "<div class='divcara'></div>" +
    "<div class='divcara'></div>" +
    "<button class='down' onclick='makeadd1()'>Zrušit</button></div>"



var makebuttoninnerhtml = "<div class='center'><input onclick='vymaz();showMsg()' placeholder='Zde napište text do tlačítka.' id='innertext' onkeyup='onInputKeyPress(event);loadobsahtlacitka()'><br><hr>" +
    "<input onclick='vymaz1();showMsg1()' placeholder='Zde napište barvu pozadí(anglicky).' id='pozadi' size='30' onkeyup='onInputKeyPress1(event);loadbarvatlacitka1()'><br>" +
    "<hr><button onclick='pridejbutton();console1()'>Přidej tlačítko</button>" +
    "<div class='neviditelne' id='innertext1'></div>" +
    "<div class='neviditelne' id='pozadi1'></div></div>"














