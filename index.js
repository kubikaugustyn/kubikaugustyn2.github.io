var pageVariants = {
    "bbb" : "Vítejte Paní učitelko (Pane učiteli)!!!<br><a href='PythonLessons/Html/UcitelPoHeslu.html'>Kubíkův web</a>",
    "ccc": "Vítej Žáku!!!<br><a href='PythonLessons/Html/ZakPoHeslu.html'>Kubíkův web</a>",
    "dddd": "<a href='PythonLessons/Html/PoHeslu.html'>Kubíkův web</a>"
}

function onKeyPress() {
    console.log("Klávesa stisknuta...");
    document.getElementById("neco").innerHTML = pageVariants[document.getElementById("input01").value]
}
