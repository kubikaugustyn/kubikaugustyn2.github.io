var __author__ = "kubik.augustyn@post.cz";
function cara() {
return "<div class='divcara'></div>"
}
function button(classAttribute, onclickAttribute, innerHTML, afterButtonBr, onmouseupAttribute) {
return "<button class='" + classAttribute + "' onclick='" + onclickAttribute + "' onmouseup='" + onmouseupAttribute + "'>" + innerHTML + "</button>" + (afterButtonBr ? "<br>" : "")
}
function div(parameters, innerHTML) {
var divToReturn = "";
for (var parameter of parameters) {
divToReturn += " " + parameter.name + "='" + parameter.value + "'"
}
divToReturn = "<div" + divToReturn + ">" + innerHTML + "</div>"
return divToReturn
}
var body = div([
{
name: "onmousemove",
value: "pageBody()"
},
{
name: "onmousedown",
value: "pageBody()"
},
{
name: "onkeyup",
value: "pageBody()"
},
{
name: "onload",
value: "pageBody()"
}
],
button("roundedButtons", "", "Přidat element", false, "makeElement()") +
"<hr>" +
div([
{
name: "id",
value: "addingDivForEditedHTML"
},
{
name: "class",
value: "rounded"
}
],
'<span class="yellow">Zde jsou všechny přidané elementy: </span>'
)
)
function onLoad() {
document.body.innerHTML = body
}
