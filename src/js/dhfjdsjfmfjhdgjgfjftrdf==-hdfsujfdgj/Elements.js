//  -*- coding: utf-8 -*-
// eslint-disable-next-line no-unused-vars
var __author__ = "kubik.augustyn@post.cz";

function cara() {
    return "<div class='divcara'></div>"
}

function button(classAttribute, onclickAttribute, innerHTML, afterButtonBr, onmouseupAttribute) {
    /*document.createElement("button")
    buttonToReturn.className = classAttribute
    buttonToReturn.onclick = onclickAttribute
    buttonToReturn.innerHTML = innerHTML*/
    //console.log("buttonToReturn: ", buttonToReturn)
    return "<button class='" + classAttribute + "' onclick='" + onclickAttribute + "' onmouseup='" + onmouseupAttribute + "'>" + innerHTML + "</button>" + (afterButtonBr ? "<br>" : "")
}

function div(parameters, innerHTML) {
    var divToReturn = "";
    for (var parameter of parameters) {
        divToReturn += " " + parameter.name + "='" + parameter.value + "'"
    }
    //console.log(divToReturn)
    divToReturn = "<div" + divToReturn + ">" + innerHTML + "</div>"

    return divToReturn
}

/*console.log(div([
    {
        name: "onClick",
        value: "console.log('This div was created with function div()')"
    }
], button("", "", "Ahoj", false)))*/

/*<div onmousemove="pageBody()" onmousedown="pageBody()" onkeyup="pageBody()" onload="pageBody()">
    <button class="roundedButtons" onmouseup="makeElement()">Přidat element</button>
    <hr>
    <div class="rounded" id="addingDivForEditedHTML"><span class="yellow">Zde jsou všechny přidané elementy: </span>
    </div>
</div>*/
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
    //console.log("Body was loaded...")
    document.body.innerHTML = body
}