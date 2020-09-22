console.log("Checking Ondra1.js")

function Login() {
    console.log("function Login()");
    document.getElementById("div1").innerHTML = password[document.getElementById("heslo").value] || ""
}

var password = {
    "ondrášek12345" : "<a class='odkaz' href='Ondra3.html'><span class='span1'>Ondráškův web</span></a>"
}
 console.log(password)
