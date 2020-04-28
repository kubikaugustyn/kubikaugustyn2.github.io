console.log("index.js...")

var cursor = "<b>|</b>"
var cursorIndex = -1
var savedKey = ""
var bodyInnerHTML = ""
var bodyInnerHTMLSplit = bodyInnerHTML.split('')
var cursorTimeout = 500

function backspace() {
    reloadBody(bodyInnerHTML)
    bodyInnerHTML = ""
    for (var i = 0; i < bodyInnerHTMLSplit.length; i++) {
        if (bodyInnerHTMLSplit[cursorIndex] !== bodyInnerHTMLSplit[i]){
            bodyInnerHTML += bodyInnerHTMLSplit[i]
        }
    }
    reloadBody(bodyInnerHTML)
    reloadBodyInnerHTMLSplit()
}

function cursorBlinkingVisible() {
    bodyInnerHTMLSplit[cursorIndex] = bodyInnerHTMLSplit[cursorIndex] + '<b>|</b>'

    //console.log("Po cursorBlinkingVisible:", bodyInnerHTMLSplit[cursorIndex])

    bodyInnerHTML = ""

    for (var i = 0; i < bodyInnerHTMLSplit.length; i++) {
        bodyInnerHTML += bodyInnerHTMLSplit[i]
        //console.log(bodyInnerHTML[i])
    }

    reloadBody(bodyInnerHTML)

    setTimeout(function() {cursorBlinkingInvisible()}, cursorTimeout)
}

function cursorBlinkingInvisible() {
    //var bodyInnerHtml1 = document.body.innerHTML

    var bodyInnerHTML1 = bodyInnerHTML
    //bodyInnerHTML = bodyInnerHTML.replace('<b>|</b>', '') //split('<b>|</b>')/*Split[cursorIndex]*/

    var a = bodyInnerHTML1.split('<b>|</b>').length - 1
    for (var ind = 0; ind < a;ind++){
        bodyInnerHTML1 = bodyInnerHTML1.replace('<b>|</b>', '')
        console.log("bodyInnerHTML1:", bodyInnerHTML1)
    }
    console.log('')


    //console.log("Po cursorBlinkingInvisible:", bodyInnerHTMLSplit)
    //console.log("bodyInnerHTML.split(cursor)[0] + bodyInnerHTML.split(cursor)[1]:", bodyInnerHTML.split(cursor)[0] + bodyInnerHTML.split(cursor)[1])
    //console.log("document.body.innerHTML:", document.body.innerHTML)
    /*console.log("bodyInnerHtml1.split(cursor):", bodyInnerHtml1.split(cursor))
    var bodyInnerHtml2

    for (var i = 0; i < bodyInnerHtml1.split(cursor).length; i++) {
        if (bodyInnerHtml1.split(cursor) !== [i] || bodyInnerHtml1.split(cursor)[i] !== "" || bodyInnerHtml1.split(cursor)[i] !== undefined || bodyInnerHtml1.split(cursor)[i] !== null) {
            bodyInnerHtml2 += bodyInnerHtml1.split(cursor)[i]
        }
        //console.log(bodyInnerHTMLSplit[i])
    }*/

    /*for (var i = 0; i < bodyInnerHTMLSplit.length; i++) {
        bodyInnerHTML += bodyInnerHTMLSplit[i]
        //console.log(bodyInnerHTMLSplit[i])
    }*/

    //console.log("bodyInnerHtml2:", bodyInnerHtml2)
    bodyInnerHTML = bodyInnerHTML1
    //console.log("document.body.innerHTML:", document.body.innerHTML, bodyInnerHtml2)
    reloadBody(bodyInnerHTML)

    setTimeout(function() {cursorBlinkingVisible()}, cursorTimeout)
}

function keyDown(e) {
    //console.log("keyDown..., event:", e)
    if (e.code.split("Key")[1] || e.code.split("Numpad")[1]  || e.code.split("Digit")[1] || e.code === "Backspace" || e.code === "Space" || e.key === "." || e.key === "," || e.key === "Enter") {/*|| e.code === "Tab" */
        if (e.key === "Enter") {//Nový řádek
            bodyInnerHTML += "<br>"
        }
        else if (e.code === "Backspace"){//Backspace
            backspace()
            cursorIndex = cursorIndex - 1
        }
        else if (e.code === "Space"){//Mezera
            bodyInnerHTML += " "
            cursorIndex = cursorIndex + 1
        }
        /*else if (e.code === "Tab"){//Tabulátor
            bodyInnerHTML += " "
            bodyInnerHTML += " "
            bodyInnerHTML += " "
            cursorIndex = cursorIndex + 1
        }*/
        else {//Jiné znaky
            if (e.shiftKey) {
                bodyInnerHTML += e.key.toUpperCase()
            }
            else {
                bodyInnerHTML += e.key
            }
            cursorIndex = cursorIndex + 1
        }
        console.log("cursorIndex:", cursorIndex)
        reloadBodyInnerHTMLSplit()
    }

    reloadBody(bodyInnerHTML)
    //console.log("bodyInnerHTMLsplit:", bodyInnerHTMLSplit)
}

function keyUp(e) {
    //console.log("keyUp...")

    if (e.code.split("Key")[1] || e.code.split("Numpad")[1] || e.code.split("Digit")[1]) {
        /*if (e.key === "Backspace"){
            bodyInnerHTML -= savedKey
        }
        else *///{
            savedKey = e.key
        //}
        reloadBodyInnerHTMLSplit()
    }

    reloadBody(bodyInnerHTML)

    //console.log("savedKey:", savedKey)
    //console.log("bodyInnerHTMLSplit:", bodyInnerHTMLSplit)
}

function keyPress(e) {
    //console.log("keyPress...")

    reloadBody(bodyInnerHTML)

    if (e.code !== "Control") {
        reloadBodyInnerHTMLSplit()
    }
}

function reloadBody(newBodyValue) {
    document.body.innerHTML = newBodyValue
}

function reloadBodyInnerHTMLSplit() {
    bodyInnerHTMLSplit = bodyInnerHTML.split('')
}

var b = ''
function cursorBlinkingVisible1(a) {
    if (a === 'first' && b === '') {
        b = a
        cursorBlinkingVisible()
    }
}