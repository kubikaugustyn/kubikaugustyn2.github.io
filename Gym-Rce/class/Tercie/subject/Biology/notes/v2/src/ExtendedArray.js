var __author__ = "kubik.augustyn@post.cz"

class ExtendedArray extends Array {
    shiftTimes(times) {
        times = Math.abs(Math.floor(times))
        var result = new ExtendedArray(times)
        for (var i = 0; i < times; i++) result[i] = this.shift()
        return result
    }

    fromBytesToUnicode() {
        return decodeURI(this.map(a => {
            if (typeof a !== "number" || a < 0 || a > 255) return ""
            var hex = a.toString(16)
            return '%' + (hex.length === 1 ? "0" : "") + hex
        }).join(""))
    }
}

Array.prototype.extend = function () {
    var extended = new ExtendedArray(this.length)
    extended = extended.fill(0).map((_, i) => this[i])
    return extended
}
