var myURL = {
    parseParams: function (urlSearch = document.location.search) {
        var params = {}
        urlSearch = urlSearch.slice(1)
        var myParams = urlSearch.split("&")
        for (var param of myParams) {
            var paramSplit = param.split("=")
            params[paramSplit[0]] = paramSplit[1]
        }
        if (Object.keys(params).includes("")) {
            delete params[""]
        }
        return params
    },
    setParams: function (params = {}, target = document.location) {
        if (Object.keys(params).length > 0) {
            var urlSearch = "?"
            for (var key of Object.keys(params)) {
                var value = params[key]
                urlSearch += `${key}=${value}&`
            }
            // Remove "&" from end
            if (urlSearch[urlSearch.length - 1] === "&") urlSearch = urlSearch.slice(0, urlSearch.length - 1)
            target.search = urlSearch
            return urlSearch
        } else {
            target.search = ""
            return ""
        }
    },
    parseURL: function (url) {
        return new URL(url)
    }
}
