var __author__ = "kubik.augustyn@post.cz"

function doNothing(...args) {

}

var DataEditorOptions = {
    default: {
        rootEdit: false
    },
    doNotEditRoot: {
        rootEdit: true
    }
}

class DataEditor {
    constructor(container = HTMLDivElement, data = {}, onChange = doNothing, onSave = doNothing, options = DataEditorOptions.default, styles = {}) {
        this.container = container
        this.data = data
        this.map = this.data2map(this.data, true)
        this.onChange = onChange
        this.onSave = onSave
        this.options = options
        this.styles = $$.Object.combine({}, styles)
    }

    changeData(newData = {}) {
        this.data = newData
        this.map = this.data2map(this.data, true)
        this.render()
    }

    map2data() {

    }

    data2map(data, isRoot = false) {
        var map = {}
        for (var [key, val] of Object.entries(data)) {
            switch (typeof val) {
                case "number":
                case "bigint":
                case "string":
                case "symbol":
                case "undefined":
                case "function":
                case "boolean":
                    //console.log(typeof val, val)
                    map[key] = {
                        type: typeof val,
                        value: val,
                        editable: true
                    }
                    break
                case "object":
                    console.log(JSON.stringify(val)[0] === "{" ? "Object" : "Array", val)
                    if (JSON.stringify(val)[0] === "{") {
                        map[key] = {
                            type: "map",
                            map: this.data2map(val),
                            editable: isRoot ? this.options.rootEdit : true
                        }
                    } else {
                        map[key] = {
                            type: "array",
                            value: val,
                            editable: true
                        }
                    }
                    break
                default:
                    console.log("??????????", typeof val, val)
            }
        }
        return map
    }

    render() {
        this.container.innerHTML = JSON.stringify(this.map)
    }
}
