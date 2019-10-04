function mic() {
    console.log("Fotbalový míč");
    //document.getElementById("td01").innerHTML="<img onclick='pumpickaAmica1()' class='img01' alt='Vyfouklý fotbalový míč' src='Vyfoukly_mic_01.jpg' height='45px'>";

    CoMasMic();

    //pumpickaAmic = pumpickaAmic+1;
    //console.log("pumpickaAmic=",pumpickaAmic);

    //if (pumpickaAmic === 2) {
        //console.log("funkce pumpickaAmic = 2");
    //}
}

function pumpicka() {
    console.log("Pumpička");
    //document.getElementById("td02").innerHTML="<img onclick='pumpickaAmica1()' class='img01' alt='Pumpička' src='Pumpička_01.jpg' height='45px'>";

    CoMasPumpicku();

    //pumpickaAmic = pumpickaAmic+1;
    //console.log("pumpickaAmic=",pumpickaAmic);

    //if (pumpickaAmic === 2) {
        //console.log("funkce pumpickaAmic = 2");
    //}
}

function CoMasPumpicku() {

     if (comas === 0) {
        console.log("mas",comas);
        document.getElementById("td01").innerHTML="<img onclick='pumpickaAmica5()' class='img01' alt='Pumpička' src='Pumpička_01.jpg' height='45px'>";
    }

     else {
        document.getElementById("td02").innerHTML="<img onclick='pumpickaAmica6()' class='img01' alt='Pumpička' src='Pumpička_01.jpg' height='45px'>";
     }

     comas =comas+1;
}

function CoMasMic() {

     if (comas === 0) {
        console.log("mas",comas);
        document.getElementById("td01").innerHTML="<img onclick='pumpickaAmica3()' class='img01' alt='Mic' src='Vyfoukly_mic_01.jpg' height='45px'>";
    }

     else {
         document.getElementById("td02").innerHTML="<img onclick='pumpickaAmica4();' class='img01' alt='Mic' src='Vyfoukly_mic_01.jpg' height='45px'>";
     }

     comas =comas+1;
}

var pumpickaAmic = 0

var comas = 0

var pumpickaAmica2 = 0

function pumpickaAmica1() {
    pumpickaAmica2 = pumpickaAmica2+1;
    console.log("pumpickaAmica1=", pumpickaAmica2);
    nafouklymic();
}

function pumpickaAmica3() {
    pumpickaAmica1();
    document.getElementById("td01").innerHTML="<img class='img01' alt='Mic' src='Vyfoukly_mic_01.jpg' height='45px'>";
}

function pumpickaAmica4() {
    pumpickaAmica1();
    document.getElementById("td02").innerHTML="<img class='img01' alt='Mic' src='Vyfoukly_mic_01.jpg' height='45px'>";
}

function pumpickaAmica5() {
    pumpickaAmica1();
    document.getElementById("td01").innerHTML="<img class='img01' alt='Pumpička' src='Pumpička_01.jpg' height='45px'>";
}

function pumpickaAmica6() {
    pumpickaAmica1();
    document.getElementById("td02").innerHTML="<img class='img01' alt='Pumpička' src='Pumpička_01.jpg' height='45px'>";
}

function nafouklymic() {
    if (pumpickaAmica2 === 2) {
        console.log("pumpickaAmica2=", pumpickaAmica2, "Míč nafouknut...")
        document.getElementById("td01").innerHTML="<img class='img01' alt='Nafouklý fotbalový míč' src='Nafoukly_mic_01.jpg' height='45px'>"
        document.getElementById("td02").innerHTML=""
    }
}

console.log("pumpickaAmic=",pumpickaAmic)

console.log("pumpickaAmica2=",pumpickaAmica2)

console.log("comas=",comas)
