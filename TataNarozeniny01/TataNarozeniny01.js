console.log("TataNarozeniny01.js...")

function vymaz() {
    document.getElementById(elementIds).value = ""
}

var name

function nameload() {
    name = document.getElementById("innertext1").innerText
    console.log(name)
}

function pridej() {
    var pridej = document.createElement("button")
    pridej.innerHTML = name
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
    //////////console.log(event);
    showMsg();
}
