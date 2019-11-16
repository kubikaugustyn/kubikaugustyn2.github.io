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

var make = {
    "Button" : function(){console.log('Vytvořit tlačítko...');document.getElementById('body').innerHTML = makebuttoninnerhtml},
    "Input" : function(){console.log('Vytvořit vstup textu...');document.getElementById('body').innerHTML = makeInputInnerHTML}
}

/*function makeButton() {
    console.log("Vytvořit tlačítko...")
    document.getElementById('body').innerHTML = makebuttoninnerhtml
}

function makeInput() {
    console.log("Vytvořit vstup textu...");document.getElementById('body').innerHTML = makeInputInnerHTML
}*/

function vymaz(covymaz) {
    document.getElementById(covymaz).value = ""
}

var makeelementinnerhtml =
    "<div class='divcenter center'>Vytvořit<br>" +
    "<div class='divcara'></div>" +
    "<button onclick='make.Button()'>Tlačítko</button><br>" +
    "<div class='divcara'></div>" +
    "<button onclick='make.Input()'>Vstup textu</button><br>" +
    "<div class='divcara'></div>" +
    "<a href='TataNarozeniny01Error.html'>Odkaz(Nemačkat!!!)</a><br>" +
    "<div class='divcara'></div>" +
    "<div class='divcara'></div>" +
    "<div class='divcara'></div>" +
    "<button class='down' onclick='makeadd1()'>Zrušit</button></div>"

var innertext = "innertext"

var upozornenizobrazeno = 1
TextZobrazitSkryt = "Zobrazit upozornění"

function zobrazUpozorneni() {
    if (upozornenizobrazeno === 1) {
        TextZobrazitSkryt = "Skrýt upozornění"
        document.getElementById('buttonNaZobrazeni').innerText = TextZobrazitSkryt
        document.getElementById('zobrazovaniUpozorneni').innerHTML = "Barva pozadí napsaná anglicky se sama převádí na češtinu, ale zadávejte anglicky!!!!!!!!!!!<br>Pokud se angličtina nepřevede, musíte si být jisti správnosti barvy zadané anglicky!!!!!!!!!!!!!!!"
        upozornenizobrazeno = 0
        TextZobrazitSkryt = "Zobrazit upozornění"
    }

    else {
        document.getElementById('buttonNaZobrazeni').innerText = TextZobrazitSkryt
        document.getElementById('zobrazovaniUpozorneni').innerHTML = ""
        upozornenizobrazeno = 1
    }
}

var makebuttoninnerhtml = "<div class='center'><input onclick='vymaz(this.id)' placeholder='Zde napište text do tlačítka.' id='innertext' onkeyup='onInputKeyPress1(event);loadobsahtlacitka()'><br><hr>" +
    "<input onclick='vymaz(this.id)' placeholder='Zde napište barvu pozadí(anglicky).' id='pozadi' size='30' onkeyup='onInputKeyPress1(event);loadbarvatlacitka1()'><br><hr>" +
    "<button id='buttonNaZobrazeni' onclick='zobrazUpozorneni()'>Zobrazit upozornění</button>" +
    "<div id='zobrazovaniUpozorneni'></div>" +
    "<hr><button onclick='pridejbutton();console1()'>Přidej tlačítko</button><br><hr>" +
    "<button class='down' onclick='makeadd1()'>Zrušit</button>" +
    "<div id='ConsoleDiv'></div>"

var makeInputInnerHTML = "Nefunkční!!!!!!<div class='center'><input id='placeholder' onclick='vymaz(this.id)' onkeyup='showmsg2()'><br><hr>" +
    "<input id='pozadi' onclick='vymaz(this.id)' onkeyup='showmsg2()'><br><hr>" +
    "<button onclick='pridejinput();console1()'>Přidej tlačítko</button><br><hr>" +
    "<button class='down' onclick='makeadd1()'>Zrušit</button><div>"












