console.log("VytvoritInput01.js...")

var addingEnabled = false

function reloadAddingEnabledIput() {
    addingEnabled = (document.getElementById('placeholder').value !== '' && document.getElementById('pozadi').value !== '')
    //console.log(addingEnabled)
}

function addInput() {
    ////////////confirm('Text v tlačítku je ' + obsahtlacitka + '.')
    alert("Přidávám vstup textu pomoc pri zadávání " + document.getElementById("placeholder").value + ", barva pozadí " + color + ".")
    console.log("Přidávám vstup textu " + document.getElementById("placeholder").value + ", barva pozadí " + color + ".")
    var pridej = "<input" +
        " placeholder='" + document.getElementById("placeholder").value +
        "' style='background-color: " + backgroundColor + "'>"
    console.log(pridej)
    /*document.createElement("input")
    pridej.placeholder = document.getElementById("placeholder").value
    pridej.style.backgroundColor = color*/
    backToBody()
    document.getElementById("addingDivForEditedHTML").innerHTML += pridej
}