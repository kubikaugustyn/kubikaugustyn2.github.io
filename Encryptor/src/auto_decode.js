Array.prototype.toLowerCase = function () {
    for (var i = 0; i < this.length; i++) {
        this[i] = this[i].toString().toLowerCase();
    }
}


/*Thread is: we have an coded string:

);(: ?+(=+)&%£@+¥+

/€(@ €(."{ @/" %+ ,/¥+?+@( /=( ¥/"{)&%,/, %+ =(!;+€+€+€/€/€&€&%/,/ @%& =&~?/ .(. @/"? +~& ( :( @=*?+£,&% ¥( ¥/" ?+)&% ?+%,{%.{

and we must decode it into normal text.*/
var coded_string = `);(: ?+(=+)&%£@+¥+`

var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var alphabet_small = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
var code_alphabet_str = `);(:?+=&%£@¥/€(@ €(."{ @/" %+ ,/¥+?+@( /=( ¥/"{)&%,/, %+ =(!;+€+€+€/€/€&€&%/,/ @%& =&~?/ .(. @/"? +~& ( :( @=*?+£,&% ¥( ¥/" ?+)&% ?+%,{%.{!?~&.{()`
code_alphabet_str = code_alphabet_str.replace(" ", "")
var code_alphabet = code_alphabet_str.split("")
code_alphabet = code_alphabet.filter(function (item, pos, self) {
    return self.indexOf(item) === pos;
})
code_alphabet_sort = [...code_alphabet].sort()

function bodyBR() {
    document.body.innerHTML += "<br>"
}

function onLoad() {
    code_alphabet_sort.shift()
    code_alphabet_sort.reverse()
    var rows = [
        alphabet,
        alphabet_small,
        code_alphabet,
        code_alphabet_sort
    ]
    var table = document.createElement("table")
    for (var row of rows) {
        var tr = document.createElement("tr")
        for (var column of row) {
            var th = document.createElement("th")
            th.innerHTML = column
            tr.appendChild(th)
        }
        table.appendChild(tr)
    }
    document.body.appendChild(table)

    var list = {}
    for (var key of code_alphabet_sort) {
        list[key] = alphabet[code_alphabet_sort.indexOf(key)]
    }
    console.log(list)
    var string = ""
    for (var character of coded_string.split("")) {
        if (character === " ") {
            string += character
        } else {
            string += list[character]
        }
    }
    console.log(`"${coded_string}"=>"${string}"`)


    // document.body.innerText += alphabet.join(" ")
    // bodyBR()
    // document.body.innerText += alphabet_small.join(" ")
    // bodyBR()
    // document.body.innerText += code_alphabet.join(" ")
    rootDiv = document.getElementById("root")
}


var rootDiv
var oneCharsFromID = "abcdefghijklmnopqrstuvwxyz"
oneCharsFromID = oneCharsFromID + oneCharsFromID.toUpperCase()
oneCharsFromID += "0123456789"
oneCharsFromID += "_-"
console.log(oneCharsFromID.length)

var defaultIDIndexes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//var defaultIDIndexes = [44, 37, 32, 45, 41, 37, 46, 3, 13, 53, 0]
var IDIndexes = localStorage.getItem("IDIndexes") ? JSON.parse(localStorage.getItem("IDIndexes")) : defaultIDIndexes

var ID, ind
IDs = []

function loadNext() {
    rootDiv.innerHTML = ""
    for (var i = 0; i < oneCharsFromID.length; i++) {
        var oneCharFromID = oneCharsFromID[i]
        ID = ""
        for (ind in IDIndexes) {
            ID += oneCharsFromID[IDIndexes[ind]]
        }
        loadIMG(ID)
        document.getElementById("videoID").innerHTML = ID
        IDIndexes[10]++
    }
    IDIndexes[10] = 0
    IDIndexes[9]++
    localStorage.setItem("IDIndexes", JSON.stringify(IDIndexes))
    IDIndexes = localStorage.getItem("IDIndexes") ? JSON.parse(localStorage.getItem("IDIndexes")) : defaultIDIndexes
    /*ID = ""
    for (ind in IDIndexes) {
        ID += oneCharsFromID[IDIndexes[ind]]
    }
    // console.clear()
    console.log(ID)*/
    OK()
}

function imageExists(image_url) {
    /*var http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status !== 404;*/
    console.log(image_url)
    return false
}

function loadIMG(ID) {
    if (imageExists("https://i.ytimg.com/vi/" + ID + "/hqdefault.jpg")) {
        IDs.push(ID)
        rootDiv.innerHTML += "<button id='" + ID + "' onclick='myRemove(`" + ID + "`)'><img src='https://i.ytimg.com/vi/" + ID + "/hqdefault.jpg'></button>"
        //"https://i.ytimg.com/vi/"+ID+"/hqdefault.jpg"
    }
}

function myRemove(id) {
    for (var i = 0; i < IDs.length; i++) {
        if (IDs[i] === id) {
            IDs.splice(i, 1);
        }
    }
    document.getElementById(id).style.display = "none"
    return "Removed."
}

function OK() {
    var storedIDs = localStorage.getItem("IDs") ? JSON.parse(localStorage.getItem("IDs")) : []
    storedIDs = storedIDs.concat(IDs)
    localStorage.setItem("IDs", JSON.stringify(storedIDs))
    rootDiv.innerHTML = ""
    if (document.getElementById("canDo").value === "1") {
        loadNext()
    }
}
