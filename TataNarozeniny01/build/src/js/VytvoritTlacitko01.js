console.log("VytvoritTlacitko01.js...")
var addingEnabled = false
function reloadAddingEnabledButton() {
addingEnabled = (document.getElementById('innertext').value !== '' && document.getElementById('pozadi').value !== '')
}
function addButton() {
if (addingEnabled) {
alert("Přidávám tlačítko " + document.getElementById("innertext").value + ", barva pozadí " + color + ".")
console.log("Přidávám tlačítko " + document.getElementById("innertext").value + ", barva pozadí " + color + ".")
var pridej = document.createElement("button")
pridej.innerHTML = document.getElementById("innertext").value
pridej.style.backgroundColor = backgroundColor
backToBody()
document.getElementById("addingDivForEditedHTML").appendChild(pridej)
}
}
