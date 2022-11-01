var __author__ = "kubik.augustyn@post.cz"

class Tag {
    constructor() {

        Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(method => (method !== 'constructor')).forEach((method) => {
            this[method] = this[method].bind(this);
        })
    }
}

class Tags {
    constructor(url = "src/data/tags/names.list") {
        this.url = url
        this.connection = new HttpConnection()

        Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(method => (method !== 'constructor')).forEach((method) => {
            this[method] = this[method].bind(this);
        })
    }

    loadTags() {
        this.connection.onLoad().then(this.onTagsLoad).catch(this.onTagsLoadError)
        this.connection.getBytes(this.url)
    }

    onTagsLoad(bytes) {
        console.group("Parsing tag names")
        bytes = bytes.extend()
        while (bytes.length) {
            var length = bytes.shift()
            var tagBytes = bytes.shiftTimes(length)
            var tagString
            try {
                tagString = tagBytes.fromBytesToUnicode()
            } catch (e) {
                console.log(e)
            }
            console.log(tagString, tagBytes)
        }
        console.groupEnd()
    }

    onTagsLoadError(error) {
        console.log(error)
    }
}
