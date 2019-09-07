console.log("Checking login2.js")

function Login1(sender) {
    console.log(sender);
    console.log("function Login1()");
    document.getElementById("div1").innerHTML = username[document.getElementById("input1").value] || "&#128274;"
}

function Login2(sender) {
    console.log(sender)
    console.log("function Login2()");
    document.getElementById("div2").innerHTML = passwords2[document.getElementById("input2").value] || "&#128274;"
}

function prihlasit(sender) {
    console.log(sender)
}

var username = {
    "bbb" : "&#128275;"
}

var passwords2 = {
    "ccc" : "&#128275;;"
}
 console.log(passwords2, username)
