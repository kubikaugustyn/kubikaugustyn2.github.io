var __author__ = "kubik.augustyn@post.cz"

class Child {
    constructor(text, depth, root = false) {
        this.text = text
        this.depth = depth
        this.root = root
        this.x = 0
        this.y = 0
        this.size = 10

        Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(method => (method !== 'constructor')).forEach((method) => {
            this[method] = this[method].bind(this)
        })
    }

    render(c) { // c is CanvasRenderingContext2D or ctx
        console.log(`Render children with text '${this.text}' at tree depth: ${this.depth} x: ${this.x} y: ${this.y} size: ${this.size}`)
        if (this.root) return
        var x = this.x - this.size / 2
        var y = this.y
        var w = this.size
        var h = this.size
        var s = 5
        this.drawRect(c, x, y, w, h, "black", s, "white")
        // this.drawRect(c, x + s / 2, y + s / 2, w - s, h - s, "green", s, "red")
        this.drawText(c, x + s / 2, y + s / 2, w - s, h - s, this.text, "black")
    }

    calculateScale(width, height, maxWidth, maxHeight, margin) {
        var scaleWidth = (maxWidth - 2 * margin) / width
        var scaleHeight = (maxHeight - 2 * margin) / height
        var scale = (scaleWidth < scaleHeight ? scaleWidth : scaleHeight)
        var newWidth = Math.floor(width * scale)
        var newHeight = Math.floor(height * scale)
        return [scale, newWidth, newHeight]
    }

    drawText(c, x, y, w, h, text, fill) {
        c.font = `1px sans-serif`
        var currSize = c.measureText(text)
        // console.log(currSize)
        var size = this.calculateScale(currSize.width, currSize.actualBoundingBoxAscent + currSize.actualBoundingBoxDescent, w, h, 0)
        // console.log(currSize.width, currSize.height, w, h)
        // console.log("Scale:", Math.floor(size[0]))
        c.font = `${Math.floor(size[0])}px sans-serif`
        c.fillStyle = fill
        c.textBaseline = "middle"
        // console.log(text, x, y, c.font)
        var cx = x + w / 2
        var cy = y + h / 2
        c.fillText(text, Math.floor(cx - size[1] / 2), Math.floor(y + h - size[2] / 2))
        // this.drawRect(c, Math.floor(cx - size[1] / 2), Math.floor(y + h - size[2] / 2), size[1], size[2], "blue", 0, "blue")
        // CanvasRenderingContext2D.prototype.text
    }

    drawRect(c, x, y, w, h, stroke, strokeWidth, fill) {
        c.strokeStyle = stroke
        c.lineWidth = strokeWidth
        c.fillStyle = fill
        c.beginPath()
        c.rect(x, y, w, h)
        c.closePath()
        c.stroke()
        c.fill()
    }
}
