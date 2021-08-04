class Canvas {
    constructor(params = {}, style = {}, divId = "") {
        this.canvas = document.createElement("canvas")
        this.params = params
        this.style = style
        this.divId = divId
        for (let [key, value] of Object.entries(this.params)) {
            this.canvas.setAttribute(key, value);
        }
        for (let [key, value] of Object.entries(this.style)) {
            this.canvas.style[key] = value
        }
        this.ctx = this.canvas.getContext("2d")
        /*this.size = this.size.bind(this)
        this.reload = this.reload.bind(this)
        this.get = this.get.bind(this)
        this.fillStyle = this.fillStyle.bind(this)
        this.circle = this.circle.bind(this)
        this.line = this.line.bind(this)
        this.rect = this.rect.bind(this)
        this.createLinearGradient = this.createLinearGradient.bind(this)
        this.createRadialGradient = this.createRadialGradient.bind(this)
        this.fillText = this.fillText.bind(this)
        this.strokeText = this.strokeText.bind(this)
        this.font = this.font.bind(this)
        this.image = this.image.bind(this)*/
    }

    size(w = NaN, h = NaN) {
        this.ctx.canvas.width = w
        this.ctx.canvas.height = h
    }

    reload() {
        document.getElementById(this.divId).innerHTML = ""
        document.getElementById(this.divId).appendChild(this.get())
    }

    get() {
        return this.canvas
    }

    fillStyle(clr = "") {
        this.ctx.fillStyle = clr
    }

    strokeStyle(clr = "") {
        this.ctx.strokeStyle = clr
    }

    triangle(x0 = NaN, y0 = NaN, x1 = NaN, y1 = NaN, x2 = NaN, y2 = NaN, fill = true) {
        this.ctx.beginPath();
        this.ctx.moveTo(x0, y0);
        this.ctx.lineTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        if (fill) this.ctx.fill();

        this.reload()
    }

    circle(x = NaN, y = NaN, radius = NaN, startAngle = 0, endAngle = 2 * Math.PI, anticlockwise = false) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        this.ctx.stroke();

        this.reload()
    }

    line(fromX = NaN, fromY = NaN, toX = NaN, toY = NaN) {
        this.ctx.moveTo(fromX, fromY);
        this.ctx.lineTo(toX, toY);
        this.ctx.stroke();

        this.reload()
    }

    rect(x = NaN, y = NaN, w = NaN, h = NaN) {
        this.ctx.fillRect(x, y, w, h)

        this.reload()
    }

    createLinearGradient(x = NaN, y = NaN, w = NaN, h = NaN, colorStops = {}, x0 = NaN, y0 = NaN, x1 = NaN, y1 = NaN) {
        // Create gradient
        var grd = this.ctx.createLinearGradient(x0, y0, x1, y1);
        for (let [offset, color] of Object.entries(colorStops)) {
            grd.addColorStop(offset, color)
        }

        // Fill with gradient
        this.fillStyle(grd)
        this.rect(x, y, w, h)

        this.reload()
    }

    createRadialGradient(x = NaN, y = NaN, w = NaN, h = NaN, colorStops = {}, x0 = NaN, y0 = NaN, x1 = NaN, r0 = NaN, y1 = NaN, r1 = NaN) {
        // Create gradient
        var grd = this.ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
        for (let [offset, color] of Object.entries(colorStops)) {
            grd.addColorStop(offset, color)
        }

        // Fill with gradient
        this.fillStyle(grd)
        this.rect(x, y, w, h)

        this.reload()
    }

    fillText(text = "", x = NaN, y = NaN) {
        this.ctx.fillText(text, x, y);

        this.reload()
    }

    strokeText(text = "", x = NaN, y = NaN) {
        this.ctx.strokeText(text, x, y);

        this.reload()
    }

    font(f = "") {
        this.ctx.font = f
    }

    image(img, dx = NaN, dy = NaN, crispEdges = false) {
        this.ctx.imageSmoothingEnabled = !crispEdges
        this.ctx.drawImage(img, dx, dy)

        this.reload()
    }
}
