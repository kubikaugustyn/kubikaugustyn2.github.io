/*function onLoadProc() {
    var valuesToBePrinted = ["href", "pathname"];
    var tableRowsHTML = "";
    for (var index=0; index<valuesToBePrinted.length; index++) {
        tableRowsHTML += "\t<tr><td>"+ valuesToBePrinted[index] + ":</td><td>"+ document.location[valuesToBePrinted[index]] + "</td></tr>\n"
    }

    var query = document.location.search.substr(1);
    var paramList = query.split("&");
    var myParams = {};
    for (index=0; index<paramList.length; index++) {
        var paramItems = paramList[index].split("=");
        myParams[paramItems[0]] = paramItems[1];
    }
    //console.log("params:", myParams);
    if (query) {
        var paramsHTML = "";
        for (var key in myParams) {
            paramsHTML += key + ":" + myParams[key] + "<br>"
        }
        tableRowsHTML += "\t<tr><td>Params:</td><td>"+ paramsHTML + "</td></tr>\n"
    }

    document.getElementById("Values_Table_tbody").innerHTML = tableRowsHTML;
}

onLoadProc();*/

var query = document.location.search.substr(1);
var paramList1 = query.split("&");
var myParams = {};
for (var inde=0; inde<paramList1.length; inde++) {
    var paramItems = paramList1[inde].split("=");
    myParams[paramItems[0]] = paramItems[1];
}

export const params = myParams;