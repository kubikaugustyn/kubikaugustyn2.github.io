//  -*- coding: utf-8 -*-
// eslint-disable-next-line no-unused-vars
var __author__ = "kubik.augustyn@post.cz";

var LeftDivHeight
function onLoad() {
    LeftDivHeight = document.getElementById('left').style.height
}
function LeftDivMouseChange(LeftDiv) {
    if (LeftDivHeight !== document.getElementById('left').style.height) {
        document.getElementById('right').style.height = document.getElementById('left').style.height
        console.log()
        LeftDivHeight = document.getElementById('left').style.height
    }
}

function SearchAndReplace(input, whatReplace, toWhatReplace) {
    for (var i = 0; i === i, input.search(whatReplace) !== -1; i++) {
        input = input.replace(whatReplace, toWhatReplace)
    }
    return input
}

function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

function run(a, b) {
    var url = document.getElementById('body').value +
        '&' +
        document.getElementById('head').value
    if (b === "a") {
        a.src = SearchAndReplace(SearchAndReplace(SearchAndReplace("./Wiew_Edited_Web_Page.html?" + url, "\n", ""), "\r", ""), "\t", "")
        return "Reloading iframe."
    }
    else if (b === "b") {
        //url = document.getElementById('IframeEdited').src
        url = "./Wiew_Edited_Web_Page.html?" + url
        url = SearchAndReplace(SearchAndReplace(SearchAndReplace("" + url, "\n", ""), "\r", ""), "\t", "")
        //console.log(url)
        openInNewTab(url)
        return "Opened in new tab."
    } else {
        console.error("Error. Reload the page to delete this error.")
        return -1
    }
}