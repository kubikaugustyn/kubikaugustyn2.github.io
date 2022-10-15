var __author__ = "kubik.augustyn@post.cz"

var generateId = () => {
    return Math.random().toString(36).slice(2)
}

class Container {
    constructor(parent) {
        this.parent = parent
        this.children = []
        this.id = generateId()
        this.html = undefined
        this.style = undefined

        Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(method => (method !== 'constructor')).forEach((method) => {
            this[method] = this[method].bind(this);
        })

        this.createHtml()
        this.style = this.html.style
    }

    createHtml() {
        this.html = document.createElement("div")
        this.html.className = "hour-container"
    }

    appendChild(child) {
        this.children.push(child)
    }

    removeChild(child) {
        this.children = this.children.filter(a => a.id !== child.id)
    }

    clear() {
        this.children = {}
    }

    render() {
        this.html.innerHTML = ""
        for (var child of this.children) {
            child.render()
            this.html.appendChild(child.html)
        }
    }
}

class Text extends Container {
    createHtml() {
        this.html = document.createElement("div")
        this.html.className = "hour-text"
    }

    render() {

    }
}

class Header extends Container {
    createHtml(size = 1) {
        this.html = document.createElement("h" + size)
        this.html.className = "hour-header"
    }

    setSize(size) {
        this.createHtml(size)
    }

    render() {

    }
}

class YouTubeVideo extends Container {
    createHtml(id, title) {
        this.html = document.createElement("div")
        if (id && title) {
            this.videoClass = new YouTubeVideoEmbedPreview(id, title, this.html)
        } else {
            this.html.innerHTML = "You must pass id, title and container."
        }
    }

    render() {

    }
}

class Link extends Container {
    createHtml() {
        this.html = document.createElement("a")
        this.html.target = "_blank"
    }

    setValue(text) {
        this.html.innerHTML = text
    }

    setURL(url) {
        this.html.setAttribute("href", url)
    }

    render() {

    }
}

class Hour {
    constructor(name) {
        this.name = name
        this.http = undefined
        this.div = document.createElement("div")
        this.div.className = "hour-div"
        this.text_lines = []
        this.container = new Container(this)
        this.container.html.className = ""
        this.header = {}

        Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(method => (method !== 'constructor')).forEach((method) => {
            this[method] = this[method].bind(this);
        })

        this.load()
    }

    load() {
        this.http = new XMLHttpRequest()
        this.http.open("GET", "hours/".concat(this.name).concat(".hour"))
        this.http.onload = this.onLoad
        this.http.onerror = this.onError
        this.http.send()
    }

    onLoad(e) {
        // console.log(e, this.http)
        this.text_lines = this.http.responseText.replaceAll("\r\n", "\n").replaceAll("\r", "\n").split("\n")
        console.groupCollapsed("Process lines")
        try {
            this.processLines()
        } catch (e) {
            this.div.innerHTML = e
        }
        console.groupEnd()
    }

    onError(e) {
        console.log(e, this.http)
    }

    processLines() {
        var lines = this.text_lines.filter(a => a !== "")
        var stage = undefined
        var offset = 0
        var containers = []
        var container = this.container
        var i
        while (lines.length) {
            var line = lines.shift()
            var keyword = line[0]
            line = line.slice(1)
            var lineParts = line.split(" ")
            var endLineParts = lineParts.slice(1).join(" ")
            console.log($$.Data.encryption.string.multiply("    ", offset), stage + ":", keyword, line)
            if (keyword === ":") {
                if (stage === "HEAD") { // On head end
                    this.div.innerHTML = `<h1 class="hour-header-main">Hour ${this.name}</h1>`
                    this.div.innerHTML += `<date>${this.header.date}</date>`
                    this.div.innerHTML += `<day>${this.header.day}</day>`
                }
                stage = line
            } else if (stage === "HEAD") {
                if (keyword === "#") {
                    this.header[lineParts[0].toLowerCase()] = endLineParts
                } else if (keyword === "%") {
                } else {
                    throw new Error(`Parser error: Illegal keyword ${keyword} in header`)
                }
            } else if (stage === "BODY") {
                if (keyword === "=") {
                    var diff = 0
                    if (lineParts[0] === "++") diff = 1
                    else if (lineParts[0] === "--") diff = -1
                    else diff = parseInt(lineParts[0]) - offset
                    offset += diff
                    for (i = 0; i < Math.abs(diff); i++) {
                        if (diff > 0) {
                            containers.push(new Container(container))
                            container.appendChild(containers[containers.length - 1])
                        } else if (diff < 0) {
                            containers.pop()
                        }
                        container = containers[containers.length - 1] || this.container
                    }
                    if (endLineParts) lines = [endLineParts, ...lines]
                } else if (keyword === "~") {
                    var hIndex = 1
                    for (i = 0; i < 5; i++) {
                        if (line[0] === "~") {
                            hIndex++
                            line = line.slice(1)
                        } else break
                    }
                    var header = new Header(container)
                    header.setSize(hIndex)
                    header.html.innerHTML = line
                    container.appendChild(header)
                } else if (keyword === ";") {
                    var colouredText = new Text(container)
                    colouredText.html.innerHTML = endLineParts
                    colouredText.style.color = lineParts[0]
                    container.appendChild(colouredText)
                } else if (keyword === "#") {
                    if (lineParts[0] === "YT-VIDEO") {
                        var id, title, video = new YouTubeVideo()
                        for (i = 0; i < parseInt(endLineParts.split(" ")[0]); i++) {
                            var data_line = lines.shift()
                            var data_keyword = data_line[0]
                            data_line = data_line.slice(1)
                            var data_line_parts = data_line.split(" ")
                            if (data_keyword === "$") {
                                if (data_line_parts[0] === "ID") id = data_line_parts[1]
                                else if (data_line_parts[0] === "TITLE") title = data_line_parts.slice(1, data_line_parts.length).join(" ")
                                else throw new Error(`Parser error: Illegal keyword ${data_line_parts[0]} in YouTube video definition`)
                            } else if (data_keyword === "%") i--
                            else throw new Error(`Parser error: Illegal keyword ${data_keyword} in YouTube video definition`)
                        }
                        video.createHtml(id, title)
                        container.appendChild(video)
                    }
                } else if (keyword === "&") {
                    var link = new Link()
                    link.setValue(endLineParts)
                    link.setURL(lineParts[0])
                    container.appendChild(link)
                } else if (keyword === "%") {
                } else {
                    var text = new Text(container)
                    text.html.innerHTML = keyword + line
                    container.appendChild(text)
                }
            } else if (stage === "END") {
                break
            }
        }
        console.log("Header:", this.header)
        console.log("Container:", this.container)
        this.container.render()
        this.div.appendChild(this.container.html)
    }
}
