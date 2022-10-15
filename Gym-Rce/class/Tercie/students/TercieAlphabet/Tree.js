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

        var border = 3
        w -= 2 * border
        var width, y, line_h, rootChild
        width = w
        y = 0
        line_h = h / this.children.length
        rootChild = new Child("", 0, true)
        rootChild.y = 0
        rootChild.x = border + w / 2
        for (var [depth, line] of Object.entries(this.children)) {
            depth = parseInt(depth)
            // c.fillStyle = depth % 2 ? "red" : "green"
            // c.fillRect(0, y, w, line_h)

            // width = w / (line.filter(a => a.text !== "~").length)
            var xIndex = 0
            for (var [i, child] of Object.entries(line)) {
                if (child.text === "~") continue
                i = parseInt(i)
                var parentI = Math.floor(i / this.childBranchsNum)
                var branchI = i % this.childBranchsNum
                var parentChild = depth ? this.children[depth - 1][parentI] : rootChild
                var parentBranches = []
                for (var a = 0; a < this.childBranchsNum; a++) {
                    var d = this.children[depth][parentI + a]
                    d && d.text !== "~" && parentBranches.push(d)
                }
                // depth && console.log(this.children[depth - 1], parentBranches.length)
                // depth && (width = (w / this.children[depth - 1].length) / parentBranches.length)
                width = (parentChild.width || w) / parentBranches.length
                // console.log(parentBranches, parentI, branchI, parentChild, this.children)
                var x = xIndex * width
                // console.log(depth, i, branchI, child, parentChild)
                child.x = border + Math.floor(x + (width / 2))
                child.y = Math.floor(y + (line_h / 2))
                child.width = width
                // child.size = Math.floor(width > 25 ? 25 : width) // Limit: 25px
                child.size = Math.floor(width > 100 ? 100 : width) // Limit: 50px
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
