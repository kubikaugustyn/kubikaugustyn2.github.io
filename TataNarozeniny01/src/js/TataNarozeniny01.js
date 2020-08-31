console.log("TataNarozeniny01.js...")

var pagebody
var backgroundColor
var color

function loadBackgroundColor() {
    var englishToCzechColors = {
        "lightblue": "světlemodrá",
        "lightgreen": "světlezelená",
        "lightyellow": "světležlutá",
        "lightgray": "světlešedá",
        "red": "červená",
        "darkblue": "tmavěmodrá",
        "violet": "fialová",
        "blueviolet": "modrofialová",
        "blue": "modrá",
        "green": "zelená",
        "darkgreen": "tmavězelená",
        "greenyellow": "zelenožlutá",
        "darkred": "tmavěčervená",
        "orangered": "oranžovočervená",
        "gold": "zlatá",
        "orange": "oranžová",
        "darkorange": "tmavěoranžová",
        "yellow": "žlutá",
        "darkviolet": "tmavěfialová",
        "pink": "růžová",
        "white": "bílá",
        "darkgray": "tmavěšedá",
        "gray": "šedá",
        "black": "černá",
        "brown": "hnědá"
    }

    color = document.getElementById("pozadi").value
    for (var englishColor in englishToCzechColors) {
        color = color.replace(englishColor, englishToCzechColors[englishColor])
    }
    backgroundColor = document.getElementById("pozadi").value
    document.getElementById("pozadi").value = color;
    ////////////console.log(buttonColor)
    //backgroundColor = color
    console.log('color: ', color)
}

function pageBody() {
    pagebody = document.getElementById('body').innerHTML
    ////////////console.log(pagebody + "54")
}

function openLinkInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

function makeElement() {
    /////////////console.log(pagebody + "1")
    //////////console.log(pagebody + "1")
    /////////////////console.log(pagebody + "1")
    document.getElementById('body').innerHTML = makeElementInnerHTML
}

function backToBody() {
    ////////////console.log(pagebody + "5")
    document.getElementById('body').innerHTML = pagebody
}

var make = {
    "Button": function () {
        console.log('Vytvořit tlačítko...');
        document.getElementById('body').innerHTML = makeButtonInnerHTML
    },
    "Input": function () {
        console.log('Vytvořit vstup textu...');
        document.getElementById('body').innerHTML = makeInputInnerHTML
    }
}

function vymaz(covymaz) {
    document.getElementById(covymaz).value = ""
}

var makeElementInnerHTML =
    "<div class='divcenter center rounded'>Vytvořit<br>" +
    cara() +
    button('roundedButtons', 'make.Button()', 'Tlačítko', true) +
    cara() +
    button('roundedButtons', 'make.Input()', 'Vstup textu', true) +
    cara() +
    "<a class='roundedButtons' href='../../TataNarozeniny01Error.html'>Odkaz(Nemačkat!!!)</a><br>" +
    cara() +
    button('roundedButtons down', 'backToBody()', 'Zrušit', false) +
    "</div>"

var warningShow = true
TextZobrazitSkryt = "Zobrazit upozornění"

function zobrazUpozorneni() {
    if (warningShow === true) {
        warningShow = false
        TextZobrazitSkryt = "Skrýt upozornění"
        document.getElementById('buttonNaZobrazeni').innerText = TextZobrazitSkryt
        document.getElementById('zobrazovaniUpozorneni').innerHTML = "Barva pozadí napsaná anglicky se sama převádí na češtinu, ale zadávejte anglicky!!!!!!!!!!!<br>Pokud se angličtina nepřevede, musíte si být jisti správnosti barvy zadané anglicky!!!!!!!!!!!!!!!"
    } else {
        warningShow = true
        TextZobrazitSkryt = "Zobrazit upozornění"
        document.getElementById('buttonNaZobrazeni').innerText = TextZobrazitSkryt
        document.getElementById('zobrazovaniUpozorneni').innerHTML = ""
    }
}

var warningInnerHTML = "<button class='roundedButtons' id='buttonNaZobrazeni' onclick='zobrazUpozorneni()'>Zobrazit upozornění</button><div id='zobrazovaniUpozorneni'></div><hr>"

var cancelButton = "<button class='down roundedButtons' onclick='backToBody()'>Zrušit</button>"

var makeButtonInnerHTML = "<div class='center'>" +
    "<input class='rounded center' onclick='vymaz(this.id)' placeholder='Zde napište text do tlačítka...' size='35' id='innertext' onkeyup='reloadAddingEnabledButton()/*showmsg1();loadobsahtlacitka()*/'><br><hr>" +
    "<input class='rounded center' onclick='vymaz(this.id)' placeholder='Zde napište barvu pozadí(anglicky).' id='pozadi' size='35' onkeyup='reloadAddingEnabledButton();loadBackgroundColor()'><br><hr>" +
    warningInnerHTML +
    "<button class='roundedButtons' onclick='addButton();'>Přidej tlačítko</button><br><hr>" +
    cancelButton +
    "</div>"

var makeInputInnerHTML = "<div class='center'>" +
    "<input class='rounded center' id='placeholder' placeholder='Zde napište pomoc při psaní...' size='35' onclick='vymaz(this.id)' onkeyup='reloadAddingEnabledIput()//showmsg2()'><br><hr>" +
    "<input class='rounded center' id='pozadi' placeholder='Zde napište barvu pozadí...' size='35' onclick='vymaz(this.id)' onkeyup='reloadAddingEnabledIput();loadBackgroundColor()'><br><hr>" +
    warningInnerHTML +
    "<button class='roundedButtons' onclick='addInput()'>Přidej vstup textu</button><br><hr>" +
    cancelButton +
    "<div>"