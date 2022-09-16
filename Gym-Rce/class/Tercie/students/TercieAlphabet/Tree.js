var __author__ = "kubik.augustyn@post.cz"

class Tree {
    constructor(canvas, width, height) {
        this.canvas = canvas
        this.canvas.width = width
        this.canvas.height = height
        this.ctx = this.canvas.getContext("2d")
        this.children = undefined
        this.childBranchsNum = 2

        /*Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(method => (method !== 'constructor')).forEach((method) => {
            this[method] = this[method].bind(this)
        })*/
        this.render = this.render.bind(this)
    }

    render() {
        if (!this.children) return
        var c = this.ctx
        var w = c.canvas.width
        var h = c.canvas.height
        c.fillStyle = "white"
        c.fillRect(0, 0, w, h)

        var width, y, line_h, rootChild
        width = w
        y = 0
        line_h = h / this.children.length
        rootChild = new Child("", 0, true)
        rootChild.y = 0
        rootChild.x = w / 2
        for (var [depth, line] of Object.entries(this.children)) {
            depth = parseInt(depth)
            // c.fillStyle = depth % 2 ? "red" : "green"
            // c.fillRect(0, y, w, line_h)

            width = w / (line.filter(a => a.text !== "~").length)
            var xIndex = 0
            for (var [i, child] of Object.entries(line)) {
                if (child.text === "~") continue
                i = parseInt(i)
                var parentI = Math.floor(i / this.childBranchsNum)
                var branchI = i % this.childBranchsNum
                var parentChild = depth ? this.children[depth - 1][parentI] : rootChild
                var x = xIndex * width
                // console.log(depth, i, branchI, child, parentChild)
                child.x = Math.floor(x + (width / 2))
                child.y = Math.floor(y + (line_h / 2))
                child.size = Math.floor(width > 25 ? 25 : width)
                // var b = (branchI * (255 / this.childBranchsNum)).toString(16)
                // c.fillStyle = `#ffff${b.length > 1 ? b : "0" + b}`
                // c.fillRect(x, y, width, line_h)
                c.strokeStyle = "black"
                c.beginPath()
                c.moveTo(parentChild.x, parentChild.y + parentChild.size + 1)
                c.lineTo(child.x, child.y)
                c.closePath()
                c.lineWidth = 4
                c.stroke()
                child.render(c)
                xIndex++
            }

            y += line_h
        }
    }

    set data(val) {
        this.children = []
        for (var [depth, line] of Object.entries(val)) {
            var resLine = []
            for (var text of line) {
                var child = new Child(text, parseInt(depth))
                resLine.push(child)
            }
            this.children.push(resLine)
        }
    }
}
