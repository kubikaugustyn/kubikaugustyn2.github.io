var fulscreenVar = document.fullscreen
var elem = document.documentElement;

function changeFullScreen() {
    console.log('Changing screen...')
    console.log(document.onfullscreenchange = changeFullScreenDiv());
    document.onfullscreenchange = changeFullScreenDiv();
    if (fulscreenVar === true){
        closeFullscreen()
    }
    else if (fulscreenVar === false){
        openFullscreen()
    }
}

function changeFullScreenDiv() {
    fulscreenVar = document.fullscreen
    console.log(fulscreenVar)
}

/* View in fullscreen */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
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