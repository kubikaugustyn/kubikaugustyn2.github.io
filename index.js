console.log("Checking index.js...")

var pageVariants = {
    "aaa" : "<br><a href='https://decko.ceskatelevize.cz/hry/kutej-spunte'><img alt='Kutej špunte' src='Kutej_spunte.png'></a>",

    "bbb" : "Vítejte Paní učitelko (Pane učiteli)!!!<br><a href='PythonLessons/Html/UcitelPoHeslu.html'>Kubíkův web</a>",

    "ccc": "Vítej Žáku!!!<br><a href='PythonLessons/Html/ZakPoHeslu.html'>Kubíkův web</a>",

    "dddd": "<a href='PythonLessons/Html/PoHeslu.html'>Kubíkův web</a>",

    "eee" : "Ahoj Ondro!!!<br><a href='PythonLessons/Ondra/Ondra1.html'>Ondráškův web</a>",

    "test" : "<a href='Testy.html'>Testy</a>"

    //další heslo a funkce k němu ("heslo" : "funkce")
}

function onKeyPress() {
    //zobrazí v consoli "Klávesa stisknuta..."
    console.log("Klávesa stisknuta...");
    //najde element neco a podle varu pageVariants rozpozná heslo a pokud není správné, tak se zobrazí zámeček(&#128274;)
    document.getElementById("neco").innerHTML = pageVariants[document.getElementById("input01").value] || "&#128274;"
}

//zobrazí hesla (pageVariants)
console.log(pageVariants)
