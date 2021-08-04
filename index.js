console.log("Checking index.js...")

function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

var pageVariants = {
    "aaa": "<br><a href='https://decko.ceskatelevize.cz/hry/kutej-spunte'><img alt='Kutej špunte' src='Kutej_spunte.png'></a>",

    "bbb": "Vítejte Paní učitelko (Pane učiteli)!!!<br><a href='Html/UcitelPoHeslu.html'>Kubíkův web</a>",

    "ccc": "Vítej Žáku!!!<br><a href='Html/ZakPoHeslu.html'>Kubíkův web</a>",

    "dddd": "<a href='Html/PoHeslu.html'>Kubíkův web</a>",

    "test": "<a href='Testy.html'>Testy</a>",

    "tata": "<a href='TataNarozeniny01/TataNarozeniny01.html'>Tátův editor</a>",

    "editor": "<a href='Editor.html'>Editor webu</a>",

    "game": "" +
        "<a href='URL_button_enabled/index.html?closeButtonEnabled=true'>" +
        "URL_button_enabled/index.html?buttonEnabled=true" +
        "</a><br>" +
        "<a href='URL_button_enabled/index.html?closeButtonEnabled=false'>" +
        "URL_button_enabled/index.html?buttonEnabled=false" +
        "</a>",

    "node": "<a href='./node'>Node</a>",

    "loading": "<a href='./loading'>Loading</a>",

    //další heslo a funkce k němu ("heslo" : "funkce")
}

function onKeyPress() {
    //zobrazí v consoli "Klávesa stisknuta..."
    console.log("Klávesa stisknuta...");

    //najde element neco a podle varu pageVariants rozpozná heslo a pokud není správné, tak se zobrazí zámeček(&#128274;)
    document.getElementById("neco").innerHTML = pageVariants[document.getElementById("input01").value] || "&#128274;"
}

//zobrazí v consoli hesla (pageVariants)
//console.log(pageVariants)
