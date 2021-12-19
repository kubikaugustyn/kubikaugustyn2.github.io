var __author__ = "kubik.augustyn@post.cz"

var mapEditor, mapKey = "kutej-darky-spunte-mapStr"
var textures = {
    world: {
        // URL: "https://decko.ceskatelevize.cz/rest/FileStore/FLASH_APP_DATA_PACKAGES/FILE-2136509!/img/World.png",
        URL: "./img_World.png",
        id: "map"
    },
    horizon: {
        // URL: "https://decko.ceskatelevize.cz/rest/FileStore/FLASH_APP_DATA_PACKAGES/FILE-2136509!/img/Horizon.png",
        URL: "./img_Horizon.png",
        id: "horizon"
    }
}


function onLoad() {
    console.log("onLoad...")
    mapEditor = new MapEditor(mapKey, textures, "map_canvas", "mapStr", "mapLinks", "mapSave", "replaceWhatId", "replaceToId")
}

onLoad()
