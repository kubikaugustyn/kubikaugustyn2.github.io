console.log("Checking index.js...")

function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

var pageVariants = {
    "aaa" : "<br><a href='https://decko.ceskatelevize.cz/hry/kutej-spunte'><img alt='Kutej špunte' src='Kutej_spunte.png'></a>",

    "bbb" : "Vítejte Paní učitelko (Pane učiteli)!!!<br><a href='PythonLessons/Html/UcitelPoHeslu.html'>Kubíkův web</a>",

    "ccc": "Vítej Žáku!!!<br><a href='PythonLessons/Html/ZakPoHeslu.html'>Kubíkův web</a>",

    "dddd": "<a href='PythonLessons/Html/PoHeslu.html'>Kubíkův web</a>",

    "eee" : "Ahoj Ondro!!!<br><a href='PythonLessons/Ondra/Ondra1.html'>Ondráškův web</a>",

    "test" : "<a href='Testy.html'>Testy</a>",

    "tata" : "<a href='TataNarozeniny01/TataNarozeniny01.html'>Tátův editor</a>",

    "editor" : "<a href='Editor.html'>Editor webu</a>",

    "game" : "" +
        "<a href='URL_button_enabled/index.html?closeButtonEnabled=true'>" +
            "URL_button_enabled/index.html?buttonEnabled=true" +
        "</a><br>" +
        "<a href='URL_button_enabled/index.html?closeButtonEnabled=false'>" +
            "URL_button_enabled/index.html?buttonEnabled=false" +
        "</a>",

    "node" : "<a href='./node'>Node</a>",

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

function showNext(nextID) {
    switch(nextID){
        case'next1':
            document.getElementById(nextID).innerHTML = "" +
                "<button onclick='download(\"index.html\")'>" +
                "Download index.html" +
                "</button><br>" +
                "<button onclick='download(\"view_source_index.html\")'>" +
                "Download view-source:index.html" +
                "</button><br>" +
                "<button onclick='download(\"view_full_source_index.html.txt\")'>" +
                "Download view-full-source:index.html" +
                "</button><br>";
        default:
            return
    }
}

function download(file){
   fetch(document.location.origin) //To functionally in localhost and http://kubikaugustyn.github.io/
      .then(response => {
          response.blob().then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = file;
            a.click();
          });
    });
}