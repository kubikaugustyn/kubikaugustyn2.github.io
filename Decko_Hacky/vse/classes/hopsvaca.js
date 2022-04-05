var __author__ = "kubik.augustyn@post.cz"

class Hopsvaca {
    constructor(container, parentClass) {
        this.container = container
        this.parentClass = parentClass
        this.elements = {}

        Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(method => (method !== 'constructor')).forEach((method) => {
            this[method] = this[method].bind(this)
        })
    }

    render() {
        this.container.innerHTML = "<h1>Hopsváča - Hacky</h1>"
        var a = this.elements.hackingSection = this.parentClass.createElem()

    }

    remove() {
        this.container.innerHTML = ""
    }
}
