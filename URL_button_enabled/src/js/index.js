function onLoadProc() {
    var tableRowsHTML = ""

    var query = document.location.search.substr(1)
    var paramList = query.split("&")
    var params = {}
    for (index=0; index<paramList.length; index++) {
        paramItems = paramList[index].split("=")
        console.log("paramItems:", paramItems)
        params[paramItems[0]] = paramItems[1]
    }
    console.log("params:", params)
    /*if (query) {
        var paramsHTML = ""
        for (var key in params) {
            paramsHTML += key + ":" + params[key] + "<br>"
        }
        tableRowsHTML += "\t<tr><td>Params:</td><td>"+ paramsHTML + "</td></tr>\n"
    }

    document.getElementById("Values_Table_tbody").innerHTML = tableRowsHTML*/

    var plusKrizek = '' +
        '<svg class="controlBtn" style="cursor: pointer; width: 36px; height: 36px; margin-left: 4px;">' +
        '<circle class="controlBtnBg" fill="#FFFFFF" cx="18" cy="18" r="15" style="fill: rgb(0, 0, 0);"></circle>' +
        '<g class="controlBtnIco" id="CBC-icoClose" style="fill: rgb(255, 255, 255);">' +
        '<path style="fill-rule:evenodd;clip-rule:evenodd;" d="M20.625,18.133l4.246,4.245c0.276,0.276,0.276,0.724,0,0.999l-1.499,1.499c-0.276,0.276-0.723,0.276-0.999,0l-4.246-4.245l-4.245,4.245c-0.276,0.276-0.724,0.276-0.999,0l-1.499-1.499c-0.275-0.275-0.275-0.723,0-0.999l4.246-4.245l-4.246-4.246c-0.275-0.276-0.275-0.723,0-0.999l1.499-1.499c0.276-0.276,0.723-0.276,0.999,0l4.245,4.246l4.246-4.246c0.276-0.276,0.723-0.276,0.999,0l1.499,1.499c0.276,0.276,0.276,0.723,0,0.999L20.625,18.133z"></path>' +
        '</g>' +
        '</svg>'

    if (params["buttonEnabled"]) {
        console.log("buttonEnabled is in URL...")
        if (params["buttonEnabled"] === "true") {
            console.log("buttonEnabled = true...")
            document.getElementById('controlsDiv').innerHTML += plusKrizek
        }
    }
}
