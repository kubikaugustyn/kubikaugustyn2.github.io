console.log("TataNarozeniny01.js...")

function openLinkInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

function vymaz() {
    document.getElementById(elementIds).value = ""
}

var name

function nameload() {
    name = document.getElementById("innertext1").innerText
    console.log(name)
}

function pridej() {
    confirm('Text v tlačítku je ' + name + '.')
    var pridej = document.createElement("button")
    pridej.innerHTML = name
    pridej.style.backgroundColor = name1
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

var name1

function nameload1() {
    name1 = document.getElementById("pozadi1").innerText
    console.log(name1)
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
