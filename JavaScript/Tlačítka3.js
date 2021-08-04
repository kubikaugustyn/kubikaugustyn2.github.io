var viditelnaTlacitka = [];

function ButtonProc1(sender, coZviditelnitId) {
    console.log(sender);
    sender.disabled = true;
    var spanToBeVisible = document.getElementById(coZviditelnitId);
    spanToBeVisible.style.visibility = "visible";
    viditelnaTlacitka.push(spanToBeVisible);
    document.getElementById("RemoveAddedButtons_Button").disabled = false;
}


function ButtonProc6() {
    console.log("6", viditelnaTlacitka);
    var i
    for (i = 0; i < viditelnaTlacitka.length; i++) {
        viditelnaTlacitka[i].style.visibility = "hidden";
    }

    const switcherButtons = document.querySelectorAll(".switcher");
    console.log(switcherButtons)
    for (i = 0; i < switcherButtons.length; i++) {
        switcherButtons[i].disabled = false;
    }

    document.getElementById("RemoveAddedButtons_Button").disabled = true;
}

function openLinkInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}
