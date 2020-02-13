function controlDivsClick() {
    console.log(window.event.srcElement.id)
    if (window.event.srcElement.id === "sound") {
        console.log('Run changeSound()')
        changeSound()
    }
    else if (window.event.srcElement.id === "fullScreen") {
        console.log('Run changeFullScreen()')
        changeFullScreen()
    }
    else if (window.event.srcElement.id === "closeButton") {
        console.log('RuncloseApp()')
        closeApp()
    }
}
