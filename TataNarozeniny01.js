console.log("TataNarozeniny01.js...")

var name

function nameload() {
    name = document.getElementById("innerText").value
}

function pridej() {
    var pridej = document.createElement("button")
    pridej.innerText = name
    //pridej.placeholder = placeholder
    //pridej.id = "+guug+"
    document.body.appendChild(pridej)
}
