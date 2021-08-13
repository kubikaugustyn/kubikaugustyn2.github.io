var cs = new Canvas(
    {"id": "gameCanvas"},
    {"background-color": ""},
    "game"
)

function calculateScale(width, height, maxWidth, maxHeight, margin) {
    var scaleWidth = (maxWidth - 2 * margin) / width
    var scaleHeight = (maxHeight - 2 * margin) / height
    var scale = (scaleWidth < scaleHeight ? scaleWidth : scaleHeight)
    var newWidth = Math.floor(width * scale)
    var newHeight = Math.floor(height * scale)
    return [scale, newWidth, newHeight]
}

function onResize() {

}

function onLoad() {
    onResize()
}

window.onresize = onResize()
