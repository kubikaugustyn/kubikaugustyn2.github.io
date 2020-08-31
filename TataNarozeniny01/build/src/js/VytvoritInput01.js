console.log("VytvoritInput01.js...")
var addingEnabled = false
function reloadAddingEnabledIput() {
addingEnabled = (document.getElementById('placeholder').value !== '' && document.getElementById('pozadi').value !== '')
}
function addInput() {
alert("Přidávám vstup textu pomoc pri zadávání " + document.getElementById("placeholder").value + ", barva pozadí " + color + ".")
console.log("Přidávám vstup textu " + document.getElementById("placeholder").value + ", barva pozadí " + color + ".")
var pridej = "<input" +
" placeholder='" + document.getElementById("placeholder").value +
"' style='background-color: " + backgroundColor + "'>"
console.log(pridej)
backToBody()
document.getElementById("addingDivForEditedHTML").innerHTML += pridej
}
