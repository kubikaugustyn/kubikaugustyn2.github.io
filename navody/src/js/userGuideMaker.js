console.log('userGuideMaker.js...')

//var test01copy = test01

var test01Length

//put test01.length to var test01Length
var test01LengthOk = 0
for (var i = 0; i<1000; i++) {
    if (test01[i]) {
        //console.log("i",i)
    }
    else {
        if (test01LengthOk === 0) {
            test01Length = i
            //console.log("test01 length is ", test01Length)
        }
        test01LengthOk++
    }
}

function loadUserGuide() {
    for (i = 0; i < test01Length; i++) {
        //console.log(test01[i])
        if (test01[i]["kostky"] === "" && test01[i]["pocet"] === "") {
            test01[i]["img"] = "../src/img/postup/" + test01[i]["img"] + ".JPG"
            document.getElementById('strany').innerHTML += "" +
                "<img height='100px' width='100px' src='" +
                test01[i]["img"] +
                "' alt='" + test01[i]["img"] +
                "'>" +
                "<br>" +
                "<hr>"
        }
        else {
            var kostkyLenght = test01[i]["kostky"].split(";").length
            function loadImgName() {
                for (var index = 0; index < kostkyLenght; index++) {
                    if (index === kostkyLenght-1){console.error("Ending...")}
                    console.error("Next...")
                    var test01Copy
                    if (index === 0) {test01Copy = ""}
                    console.log(index, test01Copy)
                    console.log(test01[i]["kostky"].split(";")[index])
                    if (index === 0) {
                        test01Copy += "../src/img/kostky/" + test01[i]["kostky"].split(";")[index] + ".JPG"
                    }
                    else {
                        test01Copy += ";../src/img/kostky/" + test01[i]["kostky"].split(";")[index] + ".JPG"
                    }
                    console.log(index, test01Copy)
                    test01[i]["kostky"] = test01Copy
                    console.warn(index, test01[i]["kostky"])
                }
            }
            loadImgName()
            test01[i]["img"] = "../src/img/postup/" + test01[i]["img"] + ".JPG"
            var items = test01[i]["kostky"].split(";")

            if(items.length === test01[i]["pocet"].split(";").length) {
                console.log("OK")
            } else {
                console.error("ERR", test01[i])
            }

            console.log("items.length, items:", items.length, items)
            if (items.length === 0){
                document.getElementById('strany').innerHTML = "ERR"
                console.error("ERR", test01[i])
            }
            else if (items.length === 1){
                document.getElementById('strany').innerHTML += "" +
                    "<img height='50px' width='50px' src='" +
                    test01[i]["kostky"] +
                    "' alt='" + test01[i]["kostky"] +
                    "'>" +
                    "<br>" +
                    test01[i]["pocet"] +
                    "X" +
                    "<br>"
            }
            else if (items.length > 1){
                for (var ind = 0; ind<items.length;ind++) {
                    document.getElementById('strany').innerHTML += "" +
                        "<img height='50px' width='50px' src='" +
                        test01[i]["kostky"].split(";")[ind] +
                        "' alt='" + test01[i]["kostky"].split(";")[ind] +
                        "'>" +
                        "<br>" +
                        test01[i]["pocet"].split(";")[i] +
                        "X" +
                        "<br>"
                }
            }

            document.getElementById('strany').innerHTML += "" +
                "<img height='100px' width='100px' src='" +
                test01[i]["img"] +
                "' alt='" + test01[i]["img"] +
                "'>" +
                "<br>" +
                "<hr>"
        }
    }
}
