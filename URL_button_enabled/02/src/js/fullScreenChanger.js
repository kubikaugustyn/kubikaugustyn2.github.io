var fulscreenVar = document.fullscreen
var element = document.documentElement;
var fullscreenTypeImg

function changeFullScreen() {
    console.log('Changing screen...')
    document.onfullscreenchange = changeFullScreenVar();
    console.log(document.onfullscreenchange = "document.onfullscreenchange...")
    if (fulscreenVar === true){
        closeFullscreen()
        fullscreenTypeImg = "fullscreenIsOff.svg"
    }
    else if (fulscreenVar === false){
        openFullscreen()
        fullscreenTypeImg = "fullscreenIsOn.svg"
    }
    reloadButtonsDiv()
}

function changeFullScreenVar() {
    fulscreenVar = document.fullscreen
    console.log("fulscreenVar:", fulscreenVar)
    if (fulscreenVar === true){
        fullscreenTypeImg = "fullscreenIsOff.svg"
    }
    else if (fulscreenVar === false){
        fullscreenTypeImg = "fullscreenIsOn.svg"
    }
    reloadButtonsDiv()
}

function changeFullScreenVar1() {
    fulscreenVar = document.fullscreen
    console.log("fulscreenVar:", fulscreenVar)
    if (fulscreenVar === true){
        fullscreenTypeImg = "fullscreenIsOn.svg"
    }
    else if (fulscreenVar === false){
        fullscreenTypeImg = "fullscreenIsOff.svg"
    }
    reloadButtonsDiv()
}

/* View in fullscreen */
function openFullscreen() {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) { /* Firefox */
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) { /* IE/Edge */
    element.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}