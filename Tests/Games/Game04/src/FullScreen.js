var elem = document.documentElement;

var fullscreenopen = false

function openFullscreen() {
    if (fullscreenopen === false) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    }
    document.getElementById('fullscreen_panel').innerHTML = '<img class="red" width="1%" src="./fullscreen_close.jpg" alt="close fullscreen" onclick="closeFullscreen()">'
    fullscreenopen = true
}

function closeFullscreen() {
    if (fullscreenopen === true) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
    document.getElementById('fullscreen_panel').innerHTML = '<img class="red" width="1%" src="./fullscreen_open.jpg" alt="open fullscreen" onclick="openFullscreen()">'
    fullscreenopen = false
}
