var __author__ = "kubik.augustyn@post.cz"

class DeckoHackerPromiseInfo {
    constructor(info, thena, catcha) {
        this.promise = undefined
        this.info = info
        this.thena = thena
        this.catcha = catcha
        this.myThen = this.myThen.bind(this)
        this.myCatch = this.myCatch.bind(this)
        this.doPromise = this.doPromise.bind(this)
    }

    doPromise(func, ...args) {
        this.promise = func(...args).then(this.myThen).catch(this.myCatch)
    }

    myThen(result) {
        this.thena(this.info, result)
    }

    myCatch(result) {
        this.catcha(this.info, result)
    }
}

class DeckoHacker {
    constructor(container, data = {}) {
        this.container = container
        this.data = $$.Object.combine({
            game: {
                externalUrlBeginning: "https://decko.ceskatelevize.cz/flashAppIframe/"
            }
        }, data)
        this.games = {
            "kutej-darky-spunte": {
                id: "ff1af0a6-7386-49be-9b85-6d06a1c72788",
                name: "Kutej dárky, špunte!"
            },
            "hopsvaca": {
                id: "267a4ea7-6241-4297-8a0d-cd5f02dfbc80",
                name: "Hopsváča",
                memory: [["saved_state"]],
                // uses: "dpapi"
            },
            "bzz": {
                id: "2ace6e72-fc28-4a47-bd71-fcd2a006358d",
                name: "Bzz!"
            }
        }
        this.token = localStorage.getItem("DeckoHackerToken") || ""
        this.tokenIsAlive = false
        this.selectedGameId = Object.keys(this.games)[1]
        this.previousSelectedGameId = Object.keys(this.games)[0]
        this.selectedGameMemory = 0
        this.memoryEditor = undefined
        this.lastResult = undefined
        this.tempArray = []
        this.hackingMemory = {}

        this.elements = {}
        this.tokenWindow = undefined

        Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(method => (method !== 'constructor')).forEach((method) => {
            this[method] = this[method].bind(this)
        })
    }

    selectGame() {
        var a = this.elements.gameSelection.value
        if (a) {
            this.previousSelectedGameId = this.selectedGameId
            this.selectedGameId = a
            this.selectedGameMemory = 0
            this.renderHackingDiv()
        }
    }

    loadGameData(slot, name) {
        if (this.token.length === 20) {
            // AmfConnector.loadAppState(console.log, slot, name, "text")
            return dpapi.loadAppState(slot, name, this.token)
        } else {
            console.log("We don't have a token")
        }
    }

    saveAppData(slot, data = []) {
        if (this.token.length === 20) {
            // AmfConnector.saveAppState(console.log, slot, "v4.0", data)
            dpapi.saveAppState(slot, "v4.0", data)
        } else {
            console.log("We don't have a token")
        }
    }

    createElem(attributes = {}, tagName = "div", eventListeners = {}) {
        var a = document.createElement(tagName)
        for (var [b, c] of Object.entries(attributes)) {
            if (b.includes("-")) a.setAttribute(b, c)
            else a[b] = c
        }
        for (var [d, e] of Object.entries(eventListeners)) {
            a.addEventListener(d, e)
        }
        return a
    }

    updateToken() {
        if (this.elements.tokenInput.value.length === 20) {
            this.token = this.elements.tokenInput.value
            localStorage.setItem("DeckoHackerToken", this.token)
            this.closeTokenWindow()
            this.renderHackingDiv()
        }
    }

    openTokenWindow() {
        if (this.tokenWindow) this.closeTokenWindow()
        $$.User.copyToClipboard(`function listener(e) {e.clipboardData.setData("text/plain", typeof AmfConnector !== "undefined" ? AmfConnector.token : integrativeContainer.getToken());e.preventDefault();}document.addEventListener("copy", listener);document.execCommand("copy");document.removeEventListener("copy", listener);`)
        this.tokenWindow = window.open(this.data.game.externalUrlBeginning + this.games[this.selectedGameId].id)
    }

    closeTokenWindow() {
        if (this.tokenWindow && !this.tokenWindow.closed) this.tokenWindow.close()
    }

    begin() {
        console.log("Begin!")

        var a, b, c, d, e, f, g, h, i, j
        this.container.innerHTML = ""
        a = this.elements.gameSelection = this.createElem({title: "Vyberte hru"}, "select", {change: this.selectGame})
        this.elements.gameSelectionOptions = []
        for ([b, c] of Object.entries(this.games)) {
            d = this.createElem({
                value: b,
                selected: b === this.selectedGameId,
                title: c.name
            }, "option")
            d.innerHTML = c.name
            this.elements.gameSelectionOptions.push(d)
            a.appendChild(d)
        }
        b = this.elements.tokenInput = this.createElem({
            size: 20,
            placeholder: "Zadejte token",
            type: "text",
            value: this.token
        }, "input", {keyup: this.updateToken, click: this.openTokenWindow})
        c = this.elements.tokenHelp = this.createElem({
            href: "help/token.html",
            target: "_blank",
            innerHTML: "?",
            style: "text-decoration:none"
        }, "a")
        d = this.elements.tokenInfo = this.createElem({}, "span")
        e = this.elements.hackingDiv = this.createElem()
        this.elements.gameMemorySelection = this.createElem({title: "Vyberte slot hacků"}, "select", {change: this.selectGameMemory})

        this.container.appendChild(a)
        this.container.appendChild(b)
        this.container.appendChild(c)
        this.container.appendChild(d)
        this.container.appendChild(e)

        this.selectGame()
        this.checkToken()
    }

    selectGameMemory() {
        var a = this.elements.gameMemorySelection.value
        if (a) {
            this.selectedGameMemory = parseInt(a)
            this.beginRenderHackingMemory()
        }
    }

    renderHackingDiv() {
        var game = this.games[this.selectedGameId]
        this.elements.hackingDiv.innerHTML = `<h1>${game.name} - Hacky</h1>`
        this.elements.hackingDiv.appendChild(this.elements.gameMemorySelection)
        this.elements.gameMemorySelection.innerHTML = ``
        for (var a in game.memory) {
            a = parseInt(a)
            var b = this.createElem({value: a, selected: a === this.selectedGameMemory, title: "Slot " + a}, "option")
            b.innerHTML = "Slot " + a
            this.elements.gameMemorySelection.appendChild(b)
        }
        this.elements.hackingDiv.appendChild(this.elements.gameMemoryEditorDiv = this.createElem())
        this.beginRenderHackingMemory()
    }

    tokenInfo(text) {
        this.elements.tokenInfo.innerHTML = text
    }

    checkToken() {
        this.tokenInfo("Ověřuji token...")
        dpapi.isTokenAlive(this.token).then(this.tokenAlive).catch(this.tokenDied)
    }

    tokenAlive() {
        this.tokenInfo("Token ověřen.")
        this.tokenIsAlive = true
        setTimeout(this.checkToken, 10000)
    }

    tokenDied() {
        this.tokenInfo("Token nefunguje - zadejte ho znovu.")
        this.tokenIsAlive = false
        setTimeout(this.checkToken, 10000)
    }

    beginRenderHackingMemory() {
        var a = this.games[this.selectedGameId]
        // var b = a.memory.filter(a => a.id === this.selectedGameMemory)[0]
        // if (a.uses === "dpapi") {
        // dpapi.loadAppState(b.slot, b.id, this.token).then(this.renderHackingMemory)
        // console.log(a.memory,this.selectedGameMemory)
        for (var b of a.memory[this.selectedGameMemory]) {
            var c = new DeckoHackerPromiseInfo(b, this.hackingMemoryDoneSlot, this.hackingMemoryErrorSlot)
            c.doPromise(this.loadGameData, this.selectedGameMemory, b)
            this.tempArray.push(c)
        }
        // }
    }

    hackingMemoryDoneSlot(id, result) {
        this.hackingMemory[id] = result
        if (this.games[this.selectedGameId].memory[this.selectedGameMemory].length === Object.keys(this.hackingMemory).length) this.renderHackingMemory()
    }

    hackingMemoryErrorSlot(id, result) {
        console.log(id, JSON.stringify(result), result.name, result.code, "https://cors-anywhere.herokuapp.com/corsdemo", result)
        if (result.code === 404) {
            this.elements.gameMemoryEditorDiv.innerHTML = "Něco se pokazilo."
        } else if (result.code === 403) {
            this.elements.gameMemoryEditorDiv.innerHTML = "<a target='_blank' href='https://cors-anywhere.herokuapp.com/corsdemo'>Klikněte na 'Request temporary access to the demo server'</a>"
        }
    }

    saveHackedMemory() {
        var a = []
        for (var [b, c] of Object.entries(this.memoryEditor.data)) {
            a.push({name: b, state: c})
        }
        this.saveAppData(this.selectedGameMemory, a)
    }

    renderHackingMemory() {
        this.memoryEditor = new DataEditor(this.elements.gameMemoryEditorDiv, this.hackingMemory, doNothing, this.saveHackedMemory, DataEditorOptions.doNotEditRoot)
        this.memoryEditor.render()
    }
}
