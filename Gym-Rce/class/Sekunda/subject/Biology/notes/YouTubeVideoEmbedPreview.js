var __author__ = "kubik.augustyn@post.cz"

class YouTubeVideoEmbedPreview {
    constructor(id, title, container) {
        this.id = id
        this.title = title
        this.container = container
        this.div = document.createElement("div")
        this.div.innerHTML = "Loading..."
        this.div.style = "position: relative; width: 300px; height: 150px; background-color: white; border-radius: 5px; border: 5px solid black; margin: 30px; transition-duration: 0.1s;"
        //<iframe width="300" height="150" src="https://www.youtube.com/embed/${id}" title="YouTube video player - ${name}" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen>${name}</iframe>
        this.iframe = document.createElement("iframe")
        this.setAttributes(this.iframe, {
            width: 300,
            height: 150,
            src: `https://www.youtube.com/embed/${this.id}`,
            title: `YouTube video player - ${this.title}`,
            frameborder: 0,
            allow: "autoplay; clipboard-write; encrypted-media; picture-in-picture",
            allowfullscreen: ""
        })
        this.iframe.innerHTML = this.title
        this.iframe.style = "position: absolute; top: 50%; left: 50%;transform: translate(-50%, -50%);"
        //<div>${this.title}</div>
        this.nonIframe = document.createElement("div")
        this.nonIframe.innerHTML = (this.title.length ? this.title : "No title.") + "<br>Click to play."
        this.nonIframe.style = "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);text-align: center;"

        this.isIframe = true
        this.changeContent(false)

        Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(method => (method !== 'constructor')).forEach((method) => {
            this[method] = this[method].bind(this);
        });

        this.div.addEventListener("mousedown", this.handleEvent)
        this.div.addEventListener("mouseenter", this.handleEvent)
        this.div.addEventListener("mouseleave", this.handleEvent)
        this.div.addEventListener("mouseout", this.handleEvent)
        this.div.addEventListener("mouseup", this.handleEvent)
        this.div.addEventListener("mousemove", this.handleEvent)
        this.div.addEventListener("mouseover", this.handleEvent)
        document.addEventListener("click", this.handleEvent)
        // console.log($$.Data.http("GET", "https://yt2html5.com/?id=" + this.id, true, null, null, {onload: this.onVideoInfoLoad}))
        this.firstRender()
    }

    onVideoInfoLoad(http) {
        console.log(http)
    }

    changeContent(isIframe) {
        if (this.isIframe !== isIframe) {
            this.isIframe = isIframe
            if (!isIframe) this.handleEvent({type: "mouseleave"})
            this.div.innerHTML = ""
            this.div.appendChild(isIframe ? this.iframe : this.nonIframe)
        }
    }

    setAttributes(element, attributes = {}) {
        for (var [name, value] of Object.entries(attributes)) {
            element.setAttribute(name, value)
        }
    }

    handleEvent(event) {
        console.log(event.type)
        switch (event.type) {
            case "click":
                this.changeContent(event.path.includes(this.div))
                break
            case "mouseenter":
                this.div.style.padding = "30px"
                this.div.style.margin = "5px"
                break
            case "mouseleave":
                if (!this.isIframe) {
                    this.div.style.padding = "5px"
                    this.div.style.margin = "30px"
                }
                break
        }
    }

    firstRender() {
        this.container.appendChild(this.div)
    }
}
