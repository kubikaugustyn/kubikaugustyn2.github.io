console.log("Checking login.js")

function Login1(sender) {
    console.log(sender);
    console.log("function Login1()");
    document.getElementById("div1").innerHTML = username[document.getElementById("input1").value] || ""
}

function Login2(sender) {
    console.log(sender)
    console.log("function Login2()");
    document.getElementById("div2").innerHTML = passwords2[document.getElementById("input2").value] || ""
}

var username = {
    "bbb" : "&#128273;"
}

var passwords2 = {
    "ccc" : "&#128274;"
}
 console.log(passwords2, username)
