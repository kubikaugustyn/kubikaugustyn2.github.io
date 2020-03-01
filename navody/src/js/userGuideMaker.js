console.log('userGuideMaker.js...')

var test01copy = test01

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
            console.log("test01 length is ", test01Length)
        }
        test01LengthOk++
    }
}

function loadUserGuide() {
    for (i = 0; i < test01Length; i++) {
        //console.log(test01[i])
        if (test01[i]["kostky"] === "") {
        } else {
            //console.log(test01[i]["kostky"])
            test01[i]["kostky"] = "../src/img/kostky/" + test01[i]["kostky"] + ".JPG"
            test01[i]["img"] = "../src/img/postup/" + test01[i]["img"] + ".JPG"
            //console.log(test01[i]["kostky"])
            document.getElementById('strany').innerHTML += "" +
                "<img height='100px' width='100px' src='" +
                test01[i]["kostky"] +
                "' alt='" + test01[i]["kostky"] +
                "'>" +
                test01[i]["pocet"] +
                "X" +
                "<img height='100px' width='100px' src='" +
                test01[i]["img"] +
                "' alt='" + test01[i]["img"] +
                "'>" +
                "<br>" +
                "<hr>"
        }
    }
}
