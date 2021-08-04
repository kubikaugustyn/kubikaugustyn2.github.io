var cs = new Canvas(
    {"id": "gameCanvas"},
    {"background-color": "#88ffff"},
    "canvasDiv"
)

function drawHouse(scale, mw, mh, params) {
    // Grass
    cs.fillStyle("green")
    cs.rect(0, (mh - params.grassH) * scale, mw * scale, params.grassH * scale)
    // Roof
    cs.fillStyle("#ff4800")
    var x0 = 0,
        y0 = 15 * scale,
        x1 = mw / 2 * scale,
        y1 = 0,
        x2 = mw * scale,
        y2 = 15 * scale
    cs.triangle(x0, y0, x1, y1, x2, y2)
    // Chimneys
    cs.fillStyle("#a7a7a7")
    cs.rect(mw / 4 * scale, 0, 5 * scale, 7.35 * scale)
    cs.rect((mw / 4 * 3 - 5) * scale, 0, 5 * scale, 7.35 * scale)
    // Main house block
    cs.fillStyle("#ffff00")
    cs.rect(0, 15 * scale, mw * scale, (mh - 15 - 5) * scale)
    // Rooms
    for (var room of params.rooms) {
        cs.fillStyle(params.colors[room[0]])
        cs.rect(room[1] * scale, room[2] * scale, room[3] * scale, room[4] * scale)
    }
}

function play() {
    document.getElementById("playDiv").style.display = 'none'
    // document.getElementById("loadingDiv").style.display = 'block'
    document.getElementById("canvasDiv").style.display = 'block'
}

function calculateScale(width, height, maxWidth, maxHeight, margin) {
    var scaleWidth = (maxWidth - 2 * margin) / width
    var scaleHeight = (maxHeight - 2 * margin) / height
    var scale = (scaleWidth < scaleHeight ? scaleWidth : scaleHeight)
    var newWidth = Math.floor(width * scale)
    var newHeight = Math.floor(height * scale)
    return [scale, newWidth, newHeight]
}

function onLoad() {
    /*cs.reload()
    cs.fillStyle("red")
    cs.rect(50, 50, 50, 50)
    cs.fillStyle("blue")
    cs.rect(100, 100, 50, 50)
    cs.fillStyle("green")
    cs.rect(150, 100, 50, 50)
    cs.strokeStyle("green")
    cs.circle(125, 75, 25)*/
    var ww = window.innerWidth,
        wh = window.innerHeight
    var mw = 200,
        mh = 100

    var calculateScaleResult = calculateScale(mw, mh, ww, wh, 0)
    var gameScale = calculateScaleResult[0]
    console.log(`Actual game scale is ${gameScale}.`)
    var gameWidth = calculateScaleResult[1]
    var gameHeight = calculateScaleResult[2]
    var gameX = Math.floor(ww / 2 - gameWidth / 2),
        gameY = Math.floor(wh / 2 - gameHeight / 2)
    document.getElementById("canvasDiv").style.left = gameX + "px"
    document.getElementById("canvasDiv").style.top = gameY + "px"
    cs.size(gameWidth, gameHeight)
    cs.reload()

    var wPokoje = (mw - 2.5) / 4
    var hPokoje = (mh - 22) / 3
    drawHouse(gameScale, mw, mh, {
        grassH: 5,
        colors: ["red", "green", "#225bff", "blue", "black", "white"],
        rooms: [
            [1, 0.5, 15.5, wPokoje, hPokoje],
            [2, wPokoje + 1, 15.5, wPokoje, hPokoje],
            [2, wPokoje * 2 + 1.5, 15.5, wPokoje, hPokoje],
            [2, wPokoje * 3 + 2, 15.5, wPokoje, hPokoje],

            [2, 0.5, (hPokoje + 16), wPokoje, (hPokoje)],
            [2, wPokoje + 1, (hPokoje + 16), wPokoje, (hPokoje)],
            [2, wPokoje * 2 + 1.5, (hPokoje + 16), wPokoje, (hPokoje)],
            [2, wPokoje * 3 + 2, (hPokoje + 16), wPokoje, (hPokoje)],

            [2, 0.5, (hPokoje * 2 + 16.5), wPokoje, (hPokoje)],
            [2, wPokoje + 1, (hPokoje * 2 + 16.5), wPokoje, (hPokoje)],
            [2, wPokoje * 2 + 1.5, (hPokoje * 2 + 16.5), wPokoje, (hPokoje)],
            [2, wPokoje * 3 + 2, (hPokoje * 2 + 16.5), wPokoje, (hPokoje)]
        ]
    })
}
window.onresize = onLoad
