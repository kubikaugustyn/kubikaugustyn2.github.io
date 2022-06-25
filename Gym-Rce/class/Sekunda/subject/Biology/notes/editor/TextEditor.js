var __author__ = "kubik.augustyn@post.cz"

class TextEditorLetter {
    constructor(letter, color = "black", backgroundColor = "white", decoration = "none", translateX = 0, translateY = 0) {
        this.letter = letter
        this.color = color
        this.backgroundColor = backgroundColor
        this.decoration = decoration
        this.translateX = translateX
        this.translateY = translateY
    }

    hasSamePropertiesAs(b) {
        var a = this
        return !([a.color === b.color, a.backgroundColor === b.backgroundColor, a.decoration === b.decoration, a.translateX === b.translateX, a.translateY === b.translateY].includes(false))
    }

    getProperties() {
        return [this.color, this.backgroundColor, this.decoration, this.translateX, this.translateY]
    }
}

class TextEditorPhrase {
    constructor(letters, color, backgroundColor, decoration, translateX, translateY) {
        this.letters = letters
        this.color = color
        this.backgroundColor = backgroundColor
        this.decoration = decoration
        this.translateX = translateX
        this.translateY = translateY
    }

    getAsChild() {
        var span = document.createElement("span")
        span.style.color = this.color
        span.style.backgroundColor = this.backgroundColor
        span.style.textDecoration = this.decoration
        span.style.transform = `translate(${this.translateX}, ${this.translateY})`
        span.style.width = "min-content"
        for (var letter of this.letters) {
            if (letter.isNewLine) console.error(letter)
            span.innerHTML += letter.letter || "!???!"
        }
        return span
    }
}

class TextEditorNewLine {
    constructor() {
        this.isNewLine = true
    }

    getProperties() {
        return new TextEditorLetter().getProperties()
    }

    getAsChild() {
        return document.createElement("br")
    }
}

function TextEditorBlankSyntaxFunction(letters) {
    return letters
}

class TextEditor {
    constructor(container = document.body, syntaxFunction = TextEditorBlankSyntaxFunction, id = Math.random().toString(36).slice(2)) {
        this.container = container
        this.syntaxFunction = syntaxFunction
        this.id = id

        this.div = document.createElement("div")
        this.div.id = this.id
        this.div.setAttribute("elem-type", "TextEditor")
        this.codeDiv = document.createElement("div")
        this.codeDiv.setAttribute("elem-type", "TextEditor-Code")
        this.div.appendChild(this.codeDiv)
        this.cursorDiv = document.createElement("div")
        this.cursorDiv.setAttribute("elem-type", "TextEditor-Cursor")
        this.div.appendChild(this.cursorDiv)
        this.active = true
        this.letters = []
        this.phrases = []
        this.cursorTimeout = undefined
        this.cursorVisible = true

        this.canLog = false
        this.normalLetters = "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`'\"~!@#$%^&*(){}[]\\/+-=_<>áčďéěíóřšťúůýžÁČĎÉĚÍÓŘŠŤÚŮÝŽ"
        this.cursorTimeoutMillis = 500
        this.cursorPos = 0

        Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(method => (method !== 'constructor')).forEach((method) => {
            this[method] = this[method].bind(this)
        })

        this.init()
    }

    log(...data) {
        if (this.canLog) console.log(...data)
    }

    init() {
        this.initDiv()
        this.initListeners()
        this.initCursor()
        this.cursorChange()
        this.activeChange()
    }

    initDiv() {
        this.container.appendChild(this.div)
    }

    initListeners() {
        document.addEventListener("keydown", this.keyEvent)
        document.addEventListener("keypress", this.keyEvent)
        document.addEventListener("keyup", this.keyEvent)

        this.div.addEventListener("mouseup", this.mouseEvent)
        this.div.addEventListener("mouseout", this.mouseEvent)
        this.div.addEventListener("mouseover", this.mouseEvent)
        this.div.addEventListener("mousedown", this.mouseEvent)
        this.div.addEventListener("mousemove", this.mouseEvent)
        this.div.addEventListener("mouseleave", this.mouseEvent)
        this.div.addEventListener("mouseenter", this.mouseEvent)

        this.div.addEventListener("click", this.mouseEvent)

        this.div.addEventListener("paste", this.pasteEvent)

        document.addEventListener("click", this.documentMouseEvent)
    }

    initCursor() {

    }

    clearCursorTimeout() {
        if (this.cursorTimeout) clearTimeout(this.cursorTimeout)
    }

    setCursorTimeout() {
        this.cursorTimeout = setTimeout(this.cursorChange.bind(this, true), this.cursorTimeoutMillis)
    }

    setCursorVisibility() {
        this.cursorDiv.style.display = this.cursorVisible ? "block" : "none"
    }

    setCursorPosition(newPos) {
        this.cursorPos = newPos
        var x = 0
        var y = 0
        for (var i = 0; i < this.cursorPos; i++) {
            if (this.letters[i].isNewLine) {
                x = 0
                y++
            } else x++
        }
        this.cursorDiv.style.left = x * 8.29 + "px"
        this.cursorDiv.style.top = y * 20 + "px"
        this.cursorVisible = true
        this.cursorChange()
        console.log("Cursor pos!")
    }

    moveCursorRight() {
        if (this.cursorPos < this.letters.length) this.setCursorPosition(this.cursorPos + 1)
    }

    moveCursorLeft() {
        if (this.cursorPos) this.setCursorPosition(this.cursorPos - 1)
    }

    cursorChange(changeVisibility) {
        this.clearCursorTimeout()
        if (this.active) changeVisibility && (this.cursorVisible = !this.cursorVisible)
        else this.cursorVisible = false
        this.setCursorVisibility()
        this.setCursorTimeout()
    }

    keyEvent(event) {
        this.log("Key event:", event.type, event.key, event)
        if (this.active) {
            if (event.type === "keypress") {
                if (this.normalLetters.search(event.key) > -1) {
                    this.letters.push(new TextEditorLetter(event.key))
                    this.textChange()
                    this.moveCursorRight()
                } else if (event.key === "Enter") {
                    this.letters.push(new TextEditorNewLine())
                    this.textChange()
                    this.moveCursorRight()
                } else alert(`Undefined key "${event.key}", code: "${event.code}", key code: "${event.keyCode}".`)
            } else if (event.type === "keydown") {
                console.log(event.key)
                if (event.key === "ArrowLeft") {
                    this.moveCursorLeft()
                } else if (event.key === "ArrowRight") {
                    this.moveCursorRight()
                }
            }
        }
    }

    mouseEvent(event) {
        this.log("Mouse event:", event)
    }

    pasteEvent(event) {
        this.log("Paste event:", event)
    }

    documentMouseEvent(event) {
        this.log("Document mouse event:", event)
        this.active = event.path.includes(this.div)
        this.activeChange()
    }

    activeChange() {
        if (!this.active) this.cursorChange()
        this.div.setAttribute("active", this.active)
    }

    textChange() {
        // Do syntax coloring...
        var letters = this.syntaxFunction(this.letters)

        // Create phrases from letters (phrase is list of letters with same properties), phrase ends with a newline
        this.phrases = []
        var currentLetters = []
        for (var i = 0; i < letters.length; i++) {
            var letter = letters[i]

            if (i === letters.length - 1) {
                if (!letter.isNewLine) currentLetters.push(letter)
                this.phrases.push(new TextEditorPhrase(currentLetters, ...(currentLetters[0] || letter).getProperties()))
            } else {
                if (letter.isNewLine) {
                    this.phrases.push(new TextEditorPhrase(currentLetters, ...(currentLetters[0] || letter).getProperties()))
                    currentLetters = []
                    this.phrases.push(letter)
                } else if (currentLetters.length && !currentLetters[0].hasSamePropertiesAs(letter)) {
                    this.phrases.push(new TextEditorPhrase(currentLetters, ...currentLetters[0].getProperties()))
                    currentLetters = [letter]
                } else {
                    currentLetters.push(letter)
                }
            }
        }

        // Render phrases to div
        this.codeDiv.innerHTML = ""
        for (var phrase of this.phrases) {
            console.log(this.letters, phrase.letters, phrase)
            this.codeDiv.appendChild(phrase.getAsChild())
        }
    }
}
