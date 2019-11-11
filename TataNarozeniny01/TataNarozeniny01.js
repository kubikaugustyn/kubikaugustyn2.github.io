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


function makebutton() {
    console.log("Vytvořit tlačítko...")
    document.getElementById('body').innerHTML = makebuttoninnerhtml
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

var innertext = "innertext"

var pozadi = "pozadi"

var upozornenizobrazeno = 1
TextZobrazitSkryt = "Zobrazit upozornění"

function zobrazUpozorneni() {
    if (upozornenizobrazeno === 1) {
        TextZobrazitSkryt = "Skrýt upozornění"
        document.getElementById('buttonNaZobrazeni').innerText = TextZobrazitSkryt
        document.getElementById('zobrazovaniUpozorneni').innerHTML = "Barva pozadí napsaná anglicky se sama převádí na češtinu, ale zadávejte anglicky!!!!!!!!!!!<br>Pokud se Angličtina nepřevede, musíte si být jisti správnosti barvy zadané anglicky!!!!!!!!!!!!!!!"
        upozornenizobrazeno = 0
        TextZobrazitSkryt = "Zobrazit upozornění"
    }

    else {
        document.getElementById('buttonNaZobrazeni').innerText = TextZobrazitSkryt
        document.getElementById('zobrazovaniUpozorneni').innerHTML = ""
        upozornenizobrazeno = 1
    }
}

var makebuttoninnerhtml = "<div class='center'><input onclick='vymaz(innertext);showMsg2()' placeholder='Zde napište text do tlačítka.' id='innertext' onkeyup='onInputKeyPress(event);loadobsahtlacitka()'><br><hr>" +
    "<input onclick='vymaz(pozadi);showMsg2()' placeholder='Zde napište barvu pozadí(anglicky).' id='pozadi' size='30' onkeyup='onInputKeyPress1(event);loadbarvatlacitka1()'><br><hr>" +
    "<button id='buttonNaZobrazeni' onclick='zobrazUpozorneni()'>Zobrazit upozornění</button>" +
    "<div id='zobrazovaniUpozorneni'></div>" +
    "<hr><button onclick='pridejbutton();console1()'>Přidej tlačítko</button>" +
    "<div id='ConsoleDiv'></div>"














