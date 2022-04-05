var __author__ = "kubik.augustyn@post.cz"

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
                name: "Hopsváča"
            },
            "bzz": {
                id: "2ace6e72-fc28-4a47-bd71-fcd2a006358d",
                name: "Bzz!"
            }
        }
        this.token = ""
        this.selectedGameId = Object.keys(this.games)[1]
        this.previousSelectedGameId = Object.keys(this.games)[0]

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
            this.renderHackingDiv()
        }
    }

    loadGameData(slot, name) {
        if (this.token.length === 20) {
            AmfConnector.loadAppState(console.log, slot, name, "text")
        } else {
            console.log("We don't have a token")
        }
    }

    saveAppData(slot, data) {
        if (this.token.length === 20) {
            AmfConnector.saveAppState(console.log, slot, "v4.0", data)
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
        this.token = this.elements.tokenInput.value
    }

    openTokenWindow() {
        if (this.tokenWindow) this.tokenWindow.close()
        document.addEventListener("copy", this.tokenWindowChange);
        $$.User.copyToClipboard(`function listener(e) {e.clipboardData.setData("text/plain", typeof AmfConnector !== "undefined" ? AmfConnector.token : integrativeContainer.getToken());e.preventDefault();}document.addEventListener("copy", listener);document.execCommand("copy");document.removeEventListener("copy", listener);`)
        this.tokenWindow = window.open(this.data.game.externalUrlBeginning + this.games[this.selectedGameId].id)
    }

    tokenWindowChange(e) {
        console.log(e.clipboardData.getData("text/plain"))
    }

    closeTokenWindow() {
        document.removeEventListener("copy", this.tokenWindowChange);
        this.tokenWindow.close()
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
            type: "text"
        }, "input", {keyup: this.updateToken, click: this.openTokenWindow})
        c = this.elements.hackingDiv = this.createElem({
            href: "help/token.html",
            target: "_blank",
            innerHTML: "?",
            style: "text-decoration:none"
        }, "a")
        d = this.elements.hackingDiv = this.createElem()

        this.container.appendChild(a)
        this.container.appendChild(b)
        this.container.appendChild(c)
        this.container.appendChild(d)

        this.games.hopsvaca.class = new Hopsvaca(d, this)

        this.selectGame()
    }

    renderHackingDiv() {
        if (this.games[this.previousSelectedGameId].class) {
            this.games[this.previousSelectedGameId].class.remove()
        }
        if (this.games[this.selectedGameId].class) {
            this.games[this.selectedGameId].class.render()
        } else {
            this.elements.hackingDiv.innerHTML = "K této hře zde zatím neexistují hacky."
        }
    }
}
