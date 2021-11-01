//var LeftDivHeight

function DownloadAsFile() {
    var url = document.getElementById('body').value +
        '&' +
        document.getElementById('head').value
    // read text from URL location
    var request = new XMLHttpRequest();
    request.open('GET', "./Wiew_Edited_Web_Page.html?" + url, true);
    //request.openCode('GET', "https://www.youtube.com/embed/5zlOHpoARRA", true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            //var type = request.getResponseHeader('Content-Type');
            //console.log(request)
            //downloads(request.responseText)
            //return request.responseText;
            //console.log(textToSave)
            var textToSave = "data:attachment/text," + request.responseText;
            //console.log(textToSave)
            var hiddenElement = document.createElement('a');
            //var textToSave1 = textToSave;
            hiddenElement.href = textToSave;
            hiddenElement.target = '_blank';
            hiddenElement.download = 'my_edited_html.html';
            hiddenElement.click();
        }
    }
}

function onLoad() {
    LeftDivHeight = document.getElementById('left').style.height
}

/*function LeftDivMouseChange(LeftDiv) {
    if (LeftDivHeight !== document.getElementById('left').style.height) {
        document.getElementById('right').style.height = document.getElementById('left').style.height
        //console.log()
        LeftDivHeight = document.getElementById('left').style.height
    }
}*/

function SearchAndReplace(input, whatReplace, toWhatReplace) {
    for (var i = 0; i === i, input.search(whatReplace) !== -1; i++) {
        input = input.replace(whatReplace, toWhatReplace)
    }
    return input
}

function openInNewTab(a) {
    var win = window.open(a, '_blank');
    win.focus();
}

function run(a, b) {
    var url = document.getElementById('body').value +
        '&' +
        document.getElementById('head').value
    if (b === "a") {
        a.src = SearchAndReplace(SearchAndReplace(SearchAndReplace("./Wiew_Edited_Web_Page.html?" + url, "\n", ""), "\r", ""), "\t", "")
        return "Reloading iframe."
    } else if (b === "b") {
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
