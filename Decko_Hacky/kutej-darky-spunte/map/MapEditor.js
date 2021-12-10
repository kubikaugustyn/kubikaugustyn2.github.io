var __author__ = "kubik.augustyn@post.cz"

class MapEditor {
    constructor(mapKey, textures, mapCanvasId, mapStrInputId, mapLinksDivId, mapSaveIdPart, replaceWhatInputId, replaceToInputId) {
        console.log("Map editor...")
        this.blockSize = 53
        this.specialBlocks = {
            horizon: {
                ys: [-2, 372, 746, 1120]
            },
            soil: {}
        }
        this.specialBlocks.horizon.texture = {
            specialTextureType: "byBlockX,movedY,computeX",
            byBlockX: {
                11: this.createHorizonPiece(646, 1),
                12: this.createHorizonPiece(1132, 2),
                13: this.createHorizonPiece(970, 3),
                14: this.createHorizonPiece(862, 0),
                15: this.createHorizonPiece(700, 1),
                16: this.createHorizonPiece(538, 3),
                17: this.createHorizonPiece(431, 0),
                18: this.createHorizonPiece(269, 1),
                19: this.createHorizonPiece(106, 2),
                20: this.createHorizonPiece(1295, 1),
                21: this.createHorizonPiece(1241, 3),
                22: this.createHorizonPiece(1241, 2),
                23: this.createHorizonPiece(1241, 1),
                24: this.createHorizonPiece(1241, 0),
                25: this.createHorizonPiece(1186, 3),
                26: this.createHorizonPiece(1186, 2),
                27: this.createHorizonPiece(1186, 1),
                28: this.createHorizonPiece(1186, 0),
                29: this.createHorizonPiece(1132, 3),
                30: this.createHorizonPiece(1132, 1),
                31: this.createHorizonPiece(1132, 0),
                32: this.createHorizonPiece(1078, 3),
                33: this.createHorizonPiece(1078, 2),
                34: this.createHorizonPiece(1078, 1),
                35: this.createHorizonPiece(1078, 0),
                36: this.createHorizonPiece(1024, 3),
                37: this.createHorizonPiece(1024, 2),
                38: this.createHorizonPiece(1024, 1),
                39: this.createHorizonPiece(1024, 0),
                40: this.createHorizonPiece(970, 2),
                41: this.createHorizonPiece(970, 1),
                42: this.createHorizonPiece(970, 0),
                43: this.createHorizonPiece(916, 3),
                44: this.createHorizonPiece(916, 2),
                45: this.createHorizonPiece(916, 1),
                46: this.createHorizonPiece(916, 0),
                47: this.createHorizonPiece(862, 3),
                48: this.createHorizonPiece(862, 2),
                49: this.createHorizonPiece(862, 1),
                50: this.createHorizonPiece(808, 3),
                51: this.createHorizonPiece(808, 2),
                52: this.createHorizonPiece(808, 1),
                53: this.createHorizonPiece(808, 0),
                54: this.createHorizonPiece(754, 3),
                55: this.createHorizonPiece(754, 2),
                56: this.createHorizonPiece(754, 1),
                57: this.createHorizonPiece(754, 0),
                58: this.createHorizonPiece(700, 3),
                59: this.createHorizonPiece(700, 2),
                60: this.createHorizonPiece(700, 0),
                61: this.createHorizonPiece(646, 3),
                62: this.createHorizonPiece(646, 2),
                63: this.createHorizonPiece(1294, 2),
                64: this.createHorizonPiece(646, 0),
                65: this.createHorizonPiece(592, 3),
                66: this.createHorizonPiece(592, 2),
                67: this.createHorizonPiece(592, 1),
                68: this.createHorizonPiece(592, 0),
                69: this.createHorizonPiece(538, 2),
                70: this.createHorizonPiece(538, 1),
                71: this.createHorizonPiece(538, 0),
                72: this.createHorizonPiece(484, 3),
                73: this.createHorizonPiece(484, 2),
                74: this.createHorizonPiece(484, 1),
                75: this.createHorizonPiece(484, 0),
                76: this.createHorizonPiece(430, 3),
                77: this.createHorizonPiece(430, 2),
                78: this.createHorizonPiece(430, 1),
                79: this.createHorizonPiece(376, 3),
                80: this.createHorizonPiece(376, 2),
                81: this.createHorizonPiece(376, 1),
                82: this.createHorizonPiece(376, 0),
                83: this.createHorizonPiece(322, 3),
                84: this.createHorizonPiece(322, 2),
                85: this.createHorizonPiece(322, 1),
                86: this.createHorizonPiece(322, 0),
                87: this.createHorizonPiece(268, 3),
                88: this.createHorizonPiece(268, 2),
                89: this.createHorizonPiece(268, 0),
                90: this.createHorizonPiece(214, 3),
                91: this.createHorizonPiece(214, 2),
                92: this.createHorizonPiece(214, 1),
                93: this.createHorizonPiece(214, 0),
                94: this.createHorizonPiece(160, 3),
                95: this.createHorizonPiece(160, 2),
                96: this.createHorizonPiece(160, 1),
                97: this.createHorizonPiece(160, 0),
                98: this.createHorizonPiece(106, 3),
                99: this.createHorizonPiece(106, 1),
                100: this.createHorizonPiece(106, 0),
                101: this.createHorizonPiece(52, 3),
                102: this.createHorizonPiece(52, 2),
                103: this.createHorizonPiece(52, 1),
                104: this.createHorizonPiece(52, 0),
                105: this.createHorizonPiece(0, 3),
                106: this.createHorizonPiece(0, 2),
                107: this.createHorizonPiece(0, 1),
                108: this.createHorizonPiece(0, 0),
                109: this.createHorizonPiece(1294, 0),
                110: {x: 0, y: 0, w: 0, h: 0}
            },
            movedY: -4 * this.blockSize - 34,
            computeX: function (x) {
                return 11 * this.blockSize + ((x - 11) * (this.blockSize * (110 / 109)))
            }
        }
        this.specialBlocks.horizon.texture.computeX = this.specialBlocks.horizon.texture.computeX.bind(this)
        this.specialBlocks.soil.texture = {
            specialTextureType: "byBlockY",
            byBlockY: {
                7: {x: 830, y: 214, w: this.blockSize, h: this.blockSize},
                else: {x: 828, y: 52, w: this.blockSize, h: this.blockSize}
            }
        }
        this.blocks = {
            none: {
                code: "A",
                texture: {
                    x: 0,
                    y: 0,
                    w: 0,
                    h: 0,
                    hasTexture: false,
                    specialTexture: false,
                    textureId: undefined
                }
            },
            shop: {
                code: "B",
                texture: {
                    x: 0,
                    y: 0,
                    w: 0,
                    h: 0,
                    hasTexture: false,
                    specialTexture: false,
                    textureId: undefined
                }
            },
            invisible: {
                code: "C",
                texture: {
                    x: 0,
                    y: 0,
                    w: 0,
                    h: 0,
                    hasTexture: false,
                    specialTexture: false,
                    textureId: undefined
                }
            },
            horizon: {
                code: "D",
                texture: {
                    x: 0,
                    y: 0,
                    w: 0,
                    h: 0,
                    hasTexture: true,
                    specialTexture: true,
                    textureId: "horizon"
                }
            },
            unbreakable: this.createNormalBlock("E", 1150, 376),
            teleport: this.createNormalBlock("F", 0, 738),
            coin_0: this.createNormalBlock("G", 958, 916),
            coin_1: this.createNormalBlock("H", 958, 268),
            coin_2: this.createNormalBlock("I", 894, 1024),
            coin_3: this.createNormalBlock("J", 510, 862),
            coin_4: this.createNormalBlock("K", 830, 1132),
            bonus: this.createNormalBlock("L", 1022, 916),
            artifact_0: this.createNormalBlock("M", 1366, 646),
            artifact_1: this.createNormalBlock("N", 1366, 592),
            artifact_2: this.createNormalBlock("O", 1320, 0),
            artifact_3: this.createNormalBlock("P", 1312, 808),
            artifact_4: this.createNormalBlock("Q", 1312, 484),
            artifact_5: this.createNormalBlock("R", 1312, 430),
            artifact_6: this.createNormalBlock("S", 1312, 376),
            artifact_7: this.createNormalBlock("T", 1312, 322),
            artifact_8: this.createNormalBlock("U", 1312, 268),
            artifact_9: this.createNormalBlock("V", 1312, 214),
            artifact_10: this.createNormalBlock("W", 1367, 538),
            artifact_11: this.createNormalBlock("X", 1364, 484),
            artifact_12: this.createNormalBlock("Y", 1364, 430),
            artifact_13: this.createNormalBlock("Z", 1364, 376),
            artifact_14: this.createNormalBlock("a", 1364, 322),
            artifact_15: this.createNormalBlock("b", 1364, 268),
            artifact_16: this.createNormalBlock("c", 1364, 214),
            artifact_17: this.createNormalBlock("d", 1364, 160),
            artifact_18: this.createNormalBlock("e", 1320, 106),
            artifact_19: this.createNormalBlock("f", 1320, 52),
            artifact_20: this.createNormalBlock("g", 1312, 1348),
            artifact_21: this.createNormalBlock("h", 1312, 1294),
            artifact_22: this.createNormalBlock("i", 1312, 1240),
            artifact_23: this.createNormalBlock("j", 1312, 1186),
            artifact_24: this.createNormalBlock("k", 1312, 1132),
            artifact_25: this.createNormalBlock("l", 1312, 1078),
            artifact_26: this.createNormalBlock("m", 1312, 1024),
            artifact_27: this.createNormalBlock("n", 1312, 970),
            artifact_28: this.createNormalBlock("o", 1312, 916),
            artifact_29: this.createNormalBlock("p", 1312, 862),
            artifact_30: this.createNormalBlock("q", 1312, 754),
            artifact_31: this.createNormalBlock("r", 1312, 700),
            artifact_32: this.createNormalBlock("s", 1312, 646),
            artifact_33: this.createNormalBlock("t", 1312, 592),
            artifact_34: this.createNormalBlock("u", 1312, 538),
            obstacle: this.createNormalBlock("v", 830, 700),
            // soil: this.createNormalBlock("w", 828, 52),
            soil: {
                code: "w",
                texture: {
                    x: 0,
                    y: 0,
                    w: 0,
                    h: 0,
                    hasTexture: true,
                    specialTexture: true,
                    textureId: "world"
                }
            },
            cave_up: this.createNormalBlock("x", 766, 1186),
            cave_down: this.createNormalBlock("y", 1022, 538),
        }
        this.blockCodesMap = {}
        for (var key of Object.keys(this.blocks)) {
            this.blockCodesMap[this.blocks[key].code] = key
        }
        this.mapKey = mapKey
        this.textures = textures
        this.images = undefined
        this.mapCanvasId = mapCanvasId
        this.mapCanvas = document.getElementById(this.mapCanvasId)
        this.mapStrInputId = mapStrInputId
        this.mapStrInput = document.getElementById(this.mapStrInputId)
        this.mapLinksDivId = mapLinksDivId
        this.mapLinksDiv = document.getElementById(this.mapLinksDivId)
        this.mapSaveIdPart = mapSaveIdPart
        this.replaceWhatInputId = replaceWhatInputId
        this.replaceWhatInput = document.getElementById(this.replaceWhatInputId)
        this.replaceToInputId = replaceToInputId
        this.replaceToInput = document.getElementById(this.replaceToInputId)
        this.mapStr = undefined
        this.map = undefined
        this.loadTextures()
        this.loadMapStr()
        this.mapStrInput.value = this.mapStr
        // [38309, 38309 + 2].includes(this.mapStr.length) && this.done()
        // this.A = ['none', 'shop', 'invisible', 'horizon', 'unbreakable', 'teleport', 'coin_0', 'coin_1', 'coin_2', 'coin_3', 'coin_4', 'bonus', 'artifact_0', 'artifact_1', 'artifact_2', 'artifact_3', 'artifact_4', 'artifact_5', 'artifact_6', 'artifact_7', 'artifact_8', 'artifact_9', 'artifact_10', 'artifact_11', 'artifact_12', 'artifact_13', 'artifact_14', 'artifact_15', 'artifact_16', 'artifact_17', 'artifact_18', 'artifact_19', 'artifact_20', 'artifact_21', 'artifact_22', 'artifact_23', 'artifact_24', 'artifact_25', 'artifact_26', 'artifact_27', 'artifact_28', 'artifact_29', 'artifact_30', 'artifact_31', 'artifact_32', 'artifact_33', 'artifact_34', 'obstacle', 'soil', 'cave_up', 'cave_down']
        // this.B = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y']
        // this.C = [
        //     null, null, null, null,
        //     [1150, 376], [0, 738],
        //     [958, 916], [958, 268], [894, 1024], [510, 862], [830, 1132],       //Coin
        //     [1022, 916],                                                        //Bonus
        //     [1366, 646],                                                                 //Artifact
        //     [1366, 592], [1320, 0], [1312, 808], [1312, 484], [1312, 430], [1312, 376], [1312, 322], [1312, 268], [1312, 214], [1367, 538],  //Artifact
        //     [1364, 484], [1364, 430], [1364, 376], [1364, 322], [1364, 268], [1364, 214], [1364, 160], [1320, 106], [1320, 52], [1312, 1348],                              //Artifact
        //     [1312, 1294], [1312, 1240], [1312, 1186], [1312, 1132], [1312, 1078], [1312, 1024], [1312, 970], [1312, 916], [1312, 862], [1312, 754],                    //Artifact
        //     [1312, 700], [1312, 646], [1312, 592], [1312, 538],                                                     //Artifact
        //     /**/ [830, 700], [828, 52], [766, 1186], [1022, 538]
        // ]
    }

    createNormalBlock(code, x, y) {
        return {
            code,
            texture: {
                x,
                y,
                w: this.blockSize,
                h: this.blockSize,
                hasTexture: true,
                specialTexture: false,
                textureId: "world"
            }
        }
    }

    createHorizonPiece(x, yi) {
        return {
            x,
            y: this.specialBlocks.horizon.ys[yi],
            w: 51,
            h: 371
        }
    }

    loadTextures() {
        this.images = {}
        for (var textureId of Object.keys(this.textures)) {
            var textureInfo = this.textures[textureId]
            textureInfo.loaded = true
            var img = document.getElementById(textureInfo.id)
            this.images[textureId] = img
            img.src = textureInfo.URL
        }
    }

    generateMap() {
        // console.log("Generate map from mapStr...")
        this.map = []
        var y = 0, x = 0, row = [];
        for (var block of this.mapStr.split("")) {
            //console.log(x, y, all[block])
            row.push(block)
            if (x >= 121) {
                y++
                x = 0
                this.map.push(row)
                row = []
            } else {
                x++
            }
        }
    }

    generateMapStr() {
        this.mapStr = ""
        for (var row of this.map) {
            /*for (var col of row){
                this.mapStr += col
            }*/
            this.mapStr += row.join("")
        }
        this.mapStr += this.blocks.unbreakable.code
    }

    loadMapStr() {
        this.mapStr = localStorage.getItem(this.mapKey) || ''
    }

    saveMapStr() {
        localStorage.setItem(this.mapKey, this.mapStr)
    }

    moveToBlock(x, y) {
        var blockX = x * this.blockSize
        var blockY = y * this.blockSize
        var bRect = this.mapCanvas.getBoundingClientRect()
        var pageX = Math.floor(bRect.x + blockX - window.innerWidth / 2)
        var pageY = Math.floor(bRect.y + blockY - window.innerHeight / 2)
        // window.scroll(pageX, pageY)
        // window.scrollTo(pageX, pageY)
        window.scrollBy(pageX, pageY)
        // console.log("Move to:", x, y, window.innerWidth / 2, window.innerHeight / 2)
    }

    copyToClipboard(elemId) {
        var elem = document.getElementById(elemId)
        elem.select()
        elem.setSelectionRange(0, 99999)
        document.execCommand("copy")
    }

    replaceInMap() {
        var whatId = this.replaceWhatInput.value
        var toId = this.replaceToInput.value
        var mapStr = this.mapStrInput.value
        var whatCode = this.blocks[whatId].code
        var toCode = this.blocks[toId].code
        if (whatId.length === 1) {
            whatCode = whatId
        }
        if (toId.length === 1) {
            toCode = toId
        }
        mapStr = mapStr.replaceAll(whatCode, toCode)
        console.log(`Replace all, ${whatId}-->${toId}, ${whatCode}-->${toCode}.`)
        this.mapStrInput.value = mapStr
        this.mapStr = mapStr
        this.done()
    }

    replaceInMapAtPos(x, y, blockId) {
        this.map[y][x] = this.blocks[blockId]
        this.generateMapStr()
        this.saveMapStr()
        this.mapStrInput.value = this.mapStr
        this.done()
    }

    renderMap() {
        console.log("Render...")
        var mapToRender = [...this.map]
        // Edit the map to perfectly render
        mapToRender[0] = "EEEEEEEEEEECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEEEEEEEEEEE".split("")
        mapToRender[1] = "EEEEEEEEEEECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEEEEEEEEEEE".split("")
        mapToRender[2] = "EEEEEEEEEEECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEEEEEEEEEEE".split("")
        mapToRender[3] = "EEEEEEEEEEECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEEEEEEEEEEE".split("")
        mapToRender[4] = "EEEEEEEEEEECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEEEEEEEEEEE".split("")
        mapToRender[5] = "EEEEEEEEEEEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDEEEEEEEEEEE".split("")
        mapToRender[6] = 'EEEEEEEEEEEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEEEEEEEEEEE'.split("")
        // console.log(mapToRender)

        var blockPos
        // var useNarutoMethod = true
        var ctx = this.mapCanvas.getContext("2d")
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = "red"
        var mapLinkIdParts = ["teleport", "shop", "artifact_"]
        var mapLinks = []
        var mapLinksNumLimit = 150
        var sTime = Date.now()
        // for (var y = mapToRender.length - 1; y > -1; y--) {
        for (var y = 0; y < mapToRender.length; y++) {
            var row = mapToRender[y]
            for (var x in row) {
                var blockCode = row[x]
                var blockKey = undefined
                var blockData = undefined
                //Naruto method off
                /*if (!useNarutoMethod) {
                    for (blockKey of Object.keys(this.blocks)) {
                        var block = this.blocks[blockKey]
                        if (block.code === blockCode) {
                            blockData = block
                            break
                        }
                    }
                }*/
                //Naruto method on
                // else {
                blockKey = this.blockCodesMap[blockCode]
                blockData = this.blocks[blockKey]
                // }
                if (blockData) {
                    // console.log("Found block data...")
                    if (blockData.texture.hasTexture) {
                        if (blockData.texture.specialTexture) {
                            // console.log("Found block with special texture...")
                            // console.log(blockKey)
                            switch (this.specialBlocks[blockKey].texture.specialTextureType) {
                                case "byBlockX,movedY,computeX":
                                    blockPos = this.specialBlocks[blockKey].texture.byBlockX[x]
                                    //Prevent errors
                                    if (blockPos) {
                                        ctx.imageSmoothingEnabled = false
                                        ctx.drawImage(
                                            this.images[blockData.texture.textureId],
                                            blockPos.x,
                                            blockPos.y,
                                            blockPos.w,
                                            blockPos.h,
                                            this.specialBlocks[blockKey].texture.computeX(x),
                                            y * this.blockSize + this.specialBlocks[blockKey].texture.movedY,
                                            /*blockPos.w*/this.blockSize * (110 / 109),
                                            blockPos.h
                                        )
                                    } else {
                                        console.log("An error, x: " + x + "...")
                                    }
                                    break
                                case "byBlockY":
                                    blockPos = Object.keys(this.specialBlocks[blockKey].texture.byBlockY).includes("" + y) ? this.specialBlocks[blockKey].texture.byBlockY[y] : this.specialBlocks[blockKey].texture.byBlockY.else
                                    //Prevent errors
                                    if (blockPos) {
                                        ctx.imageSmoothingEnabled = false
                                        ctx.drawImage(
                                            this.images[blockData.texture.textureId],
                                            blockPos.x,
                                            blockPos.y,
                                            blockPos.w,
                                            blockPos.h,
                                            x * this.blockSize,
                                            y * this.blockSize,
                                            blockPos.w,
                                            blockPos.h
                                        )
                                    } else {
                                        console.log("An error, y: " + y + "...")
                                    }
                                    break
                            }
                        } else {
                            ctx.imageSmoothingEnabled = false
                            ctx.drawImage(this.images[blockData.texture.textureId], blockData.texture.x, blockData.texture.y, blockData.texture.w, blockData.texture.h, x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize)
                        }
                        // console.log("Found block with texture...")
                    }
                    if (blockKey.includes("artifact_")) {
                        ctx.fillText(blockKey, x * this.blockSize, y * this.blockSize)
                    }
                    /*if (blockData.imgPos && blockData.imgPos.length > 0) {
                        //console.log(`Have image pos, block at x: ${x}, y: ${y}!!!`, x * mapBlockSize, y * mapBlockSize, mapBlockSize, mapBlockSize)
                        ctx.imageSmoothingEnabled = false
                        ctx.drawImage(img, blockData.imgPos[0], blockData.imgPos[1], mapBlockSize, mapBlockSize, x * mapBlockSize, y * mapBlockSize, mapBlockSize, mapBlockSize)
                    } else if (blockData.id.includes("artifact_")) {
                        console.log(`Artifact without texture, id: ${blockData.id}...`)
                        ctx.fillText(blockData.id, x * mapBlockSize, y * mapBlockSize)
                    }*/
                    for (var mapLinkIdPart of mapLinkIdParts) {
                        if (blockKey.includes(mapLinkIdPart)) {
                            mapLinks.push({
                                id: blockKey,
                                x,
                                y
                            })
                        }
                    }
                }
            }
        }
        if (mapLinks.length > mapLinksNumLimit) {
            this.mapLinksDiv.innerHTML = `There are ${mapLinks.length} links to render, but quota is set to ${mapLinksNumLimit}.`
        } else {
            mapLinks = mapLinks.sort(function (a, b) {
                if (a.id < b.id) {
                    return -1;
                }
                if (a.id > b.id) {
                    return 1;
                }
                return 0;
            })
            this.mapLinksDiv.innerHTML = ""
            ctx.strokeStyle = "red"
            for (var mapLink of mapLinks) {
                // console.log(mapLink)
                ctx.rect(mapLink.x * this.blockSize, mapLink.y * this.blockSize, this.blockSize, this.blockSize)
                ctx.stroke()
                var button = document.createElement("button")
                button.innerText = mapLink.id
                button.setAttribute("onclick", `mapEditor.moveToBlock(${mapLink.x}, ${mapLink.y})`)
                this.mapLinksDiv.appendChild(button)
                // mapLinksDiv.innerHTML += "<br>"
            }
        }
        document.getElementById(this.mapSaveIdPart + "Text").innerText = `Engine.tileTypeCodeMap = '...'\nEngine.saveLoad.save((a)=>{console.log(a);a.status==="OK"?document.location.reload():console.error("An error occured.")})`
        document.getElementById(this.mapSaveIdPart + "TextInput").value = `Engine.tileTypeCodeMap = '${this.mapStr}';Engine.saveLoad.save((a)=>{console.log(a);a.status==="OK"?document.location.reload():console.error("An error occured.")})`
        document.getElementById(this.mapSaveIdPart + "Button").setAttribute("onclick", `mapEditor.copyToClipboard("${this.mapSaveIdPart}TextInput")`)
        console.log(`Done in ${Date.now() - sTime}ms.`)
        /*ctx.strokeStyle = "red"
        var mapLinksDiv = document.getElementById("mapLinks")
        mapLinksDiv.innerHTML = ""
        for (var mapLink of mapLinks) {
            // console.log(mapLink)
            ctx.rect(mapLink.x * mapBlockSize, mapLink.y * mapBlockSize, mapBlockSize, mapBlockSize)
            ctx.stroke()
            var button = document.createElement("button")
            button.innerText = mapLink.id
            button.setAttribute("onclick", `moveToBlock(${mapLink.x}, ${mapLink.y})`)
            mapLinksDiv.appendChild(button)
            // mapLinksDiv.innerHTML += "<br>"
        }
        document.getElementById("mapSaveText").innerText = `Engine.tileTypeCodeMap = '...'\nEngine.saveLoad.save((a)=>{console.log(a);a.status==="OK"?document.location.reload():console.error("An error occured.")})`
        document.getElementById("mapSaveTextInput").value = `Engine.tileTypeCodeMap = '${mapStr}';Engine.saveLoad.save((a)=>{console.log(a);a.status==="OK"?document.location.reload():console.error("An error occured.")})`
        document.getElementById("mapSaveButton").setAttribute("onclick", `copyToClipboard("mapSaveTextInput")`)*/
    }

    done() {
        this.mapStr = this.mapStrInput.value
        this.mapStr[0] === "'" ? this.mapStr = this.mapStr.slice(1) : null
        this.mapStr[this.mapStr.length - 1] === "'" ? this.mapStr = this.mapStr.slice(0, -1) : null
        if (this.mapStr !== "") {
            // console.log(this.mapStr)
            this.generateMap()
            // Edit the map so game will not crash
            this.map[0] = 'EEEEEEEEEEECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEEEEEEEEEEE'.split("")
            this.map[1] = 'EEEEEEEEEEECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEEEEEEEEEEE'.split("")
            this.map[2] = 'EEEEEEEEEEECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEEEEEEEEEEE'.split("")
            this.map[3] = 'EEEEEEEEEEECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEEEEEEEEEEE'.split("")
            this.map[4] = 'EEEEEEEEEEECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEEEEEEEEEEE'.split("")
            this.map[5] = 'EEEEEEEEEEEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDEEEEEEEEEEE'.split("")
            this.map[6] = 'EEEEEEEEEEEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEEEEEEEEEEE'.split("")
            for (var i in this.map[7]) {
                var col = this.map[7][i]
                if (![this.blocks.none.code, this.blocks.soil.code, this.blocks.unbreakable.code].includes(col)) {
                    this.map[7][i] = this.blocks["soil"].code
                }
            }
            this.generateMapStr()
            this.saveMapStr()
            this.generateMap()
            // console.log(this.map)
            this.renderMap()
        }
    }
}
