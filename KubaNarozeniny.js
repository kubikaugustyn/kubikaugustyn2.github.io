console.log("KubaNarozeniny.js...")

var spravne = 0

function Odeslat() {
    console.log("Odesilani...")
    if (document.getElementById("input01").value === "1") {
        console.log("1...")
        console.log("spravne...")
        spravne++
        console.log("Spravne= " + spravne)
        document.getElementById("div01").innerText = "Správně"
    }

    else {
        console.log("spatne...")
    }

    if (document.getElementById("input02").value === "2") {
        console.log("2...")
        console.log("spravne...")
        spravne++
        console.log("Spravne= " + spravne)
        document.getElementById("div02").innerText = "Správně"
    }

    else {
        console.log("spatne...")
    }

    if (document.getElementById("input03").value === "3") {
        console.log("3...")
        console.log("spravne...")
        spravne++
        console.log("Spravne= " + spravne)
        document.getElementById("div03").innerText = "Správně"
    }

    else {
        console.log("spatne...")
    }

    if (document.getElementById("input04").value === "4") {
        console.log("4...")
        console.log("spravne...")
        spravne++
        console.log("Spravne= " + spravne)
        document.getElementById("div04").innerText = "Správně"
    }

    else {
        console.log("spatne...")
    }

    if (document.getElementById("input05").value === "5") {
        console.log("5...")
        console.log("spravne...")
        spravne++
        console.log("Spravne= " + spravne)
        document.getElementById("div05").innerText = "Správně"
    }

    else {
        console.log("spatne...")
    }
}

var hesla = [
    "1",
    "2"
]
