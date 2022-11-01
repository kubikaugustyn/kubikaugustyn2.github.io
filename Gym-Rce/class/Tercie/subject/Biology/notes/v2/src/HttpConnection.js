var __author__ = "kubik.augustyn@post.cz"

class HttpConnection {
    constructor() {
        this.http = new XMLHttpRequest()
        this.responseType = "string"
        this.onLoadHandlers = []

        Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(method => (method !== 'constructor')).forEach((method) => {
            this[method] = this[method].bind(this);
        })

        this.http.onreadystatechange = this.readyStateChange
    }

    open(method, url, username, password) {
        this.http.open(method, url, true, username, password)
        return this
    }

    send(body) {
        this.http.send(body)
        return this
    }

    addOnloadPromise(onDone, onCatch) {
        this.onLoadHandlers.push({done: onDone, catch: onCatch})
    }

    readyStateChange() {
        if (this.http.readyState === 4) {
            var error = this.http.status !== 200
            for (var handler of this.onLoadHandlers) {
                if (error) handler?.error?.({
                    type: "request",
                    status: this.http.status,
                    statusText: this.http.statusText,
                    message: this.http.statusText,
                    request: this.http
                })
                else {
                    switch (this.responseType) {
                        case "string":
                            handler?.done?.(`${this.http.responseText}`)
                            break
                        case "json":
                            handler?.done?.(JSON.parse(this.http.responseText))
                            break
                        case "bytes":
                            handler?.done?.(new Array(...(new Uint8Array(this.http.response))))
                            break
                        default:
                            handler?.error?.({
                                type: "responseType",
                                responseType: this.responseType,
                                message: "Invalid response type."
                            })
                    }
                }
            }
        }
    }

    onLoad() {
        return new Promise(this.addOnloadPromise)
    }

    get(url, username, password) {
        this.responseType = "string"
        this.open("GET", url, username, password)
        this.send()
    }

    json(url, username, password) {
        this.responseType = "json"
        this.open("GET", url, username, password)
        this.send()
    }

    getBytes(url, username, password) {
        this.responseType = "bytes"
        this.open("GET", url, username, password)
        this.http.responseType = "arraybuffer"
        this.send()
    }
}
