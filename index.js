var pageVariants = {
    "aaa" : "<a href='https://decko.ceskatelevize.cz/hry'>Déčko hry</a>",
    "bbb" : "Vítejte Paní učitelko (Pane učiteli)!!!<br><a href='PythonLessons/Html/UcitelPoHeslu.html'>Kubíkův web</a>",
    "ccc": "Vítej Žáku!!!<br><a href='PythonLessons/Html/ZakPoHeslu.html'>Kubíkův web</a>",
    "dddd": "<a href='PythonLessons/Html/PoHeslu.html'>Kubíkův web</a>",
    "eee" : "Ahoj Ondro!!!<br><a href='PythonLessons/Ondra/Ondra1.html'"
}

function onKeyPress() {
    console.log("Klávesa stisknuta...");
    document.getElementById("neco").innerHTML = pageVariants[document.getElementById("input01").value] || "&#128274;"
}

console.log(pageVariants)
