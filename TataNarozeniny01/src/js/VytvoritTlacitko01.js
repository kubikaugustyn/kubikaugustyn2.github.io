console.log("VytvoritTlacitko01.js...")

var addingEnabled = false

/*function loadobsahtlacitka() {
    document.getElementById("innertext").value = obsahtlacitka
    //////////console.log(obsahtlacitka)
}*/

function reloadAddingEnabledButton() {
    addingEnabled = (document.getElementById('innertext').value !== '' && document.getElementById('pozadi').value !== '')
    //console.log(addingEnabled)
}

function addButton() {
    if (addingEnabled) {
        ////////////confirm('Text v tlačítku je ' + obsahtlacitka + '.')
        alert("Přidávám tlačítko " + document.getElementById("innertext").value + ", barva pozadí " + color + ".")
        console.log("Přidávám tlačítko " + document.getElementById("innertext").value + ", barva pozadí " + color + ".")
        var pridej = document.createElement("button")
        pridej.innerHTML = document.getElementById("innertext").value
        pridej.style.backgroundColor = backgroundColor
        backToBody()
        document.getElementById("addingDivForEditedHTML").appendChild(pridej)
    }
}
