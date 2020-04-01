var soundIsOn = true
var soundTypeImg

function changeSound() {
    console.log('Changing sound...')
    if (soundIsOn === true) {
        soundTypeImg = "soundIsOff.svg"
        soundIsOn = false
        console.log("soundIsOn:", soundIsOn)
    }
    else if (soundIsOn === false){
        soundTypeImg = "soundIsOn.svg"
        soundIsOn = true
        console.log("soundIsOn:", soundIsOn)
    }
    reloadButtonsDiv()
}

function changeSoundVar() {
    if (soundIsOn === true) {
        soundTypeImg = "soundIsOff.svg"
        soundIsOn = false
        console.log("soundIsOn:", soundIsOn)
    }
    else if (soundIsOn === false){
        soundTypeImg = "soundIsOn.svg"
        soundIsOn = true
        console.log("soundIsOn:", soundIsOn)
    }
}
