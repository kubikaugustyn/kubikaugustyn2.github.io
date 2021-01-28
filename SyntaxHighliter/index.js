function render(value) {
    //console.log(value)
    var renderedValue = value
    function myReplace(what, to) {
        renderedValue = renderedValue.replace(what, to)
    }
    var tagNames = [
        "span",
        "html",
        "head",
        "body",
        "!DOCTYPE html",
        "meta",
        'meta charset="UTF-8"',
        "title",
        "link",
        'link rel="stylesheet" href="index.css" type="text/css"',
        "textarea",
        'textarea rows="50" cols="100" name="description" id="code" onchange="render(this.value)" onkeyup="render(this.value)"',
        "br",
        'span id="renderedSpan"',
        "noscript",
        "script",
        'script src="index.js"',
        "div",
    ]
    for (var tagNameIndex in tagNames){
        //console.log(tagNames[0])
        tagName = tagNames[parseInt(tagNameIndex)]
        //console.log("<"+tagName+">")
        myReplace("<"+tagName+">", "<span class='tag'>&lt;"+tagName+"&gt;</span>")
        myReplace("</"+tagName+">", "<span class='tag'>&lt;/"+tagName+"&gt;</span>")
    }
    myReplace("\n", "<br>")
    console.log(renderedValue)
    document.getElementById("renderedSpan").innerHTML = renderedValue
}
render("Hello.")
document.getElementById("code").value = "Hello."

function openLinkInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus()
}

function openCode() {
    var url = "data:text/html;charset=utf-8," + escape(document.getElementById("code").value)
    openLinkInNewTab(url)
}
