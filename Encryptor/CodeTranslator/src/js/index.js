var __author__ = "kubik.augustyn@post.cz"

var elements = {}
elements.get = function (id) {
    return document.getElementById(id)
}
elements.create = function (tagName) {
    return document.createElement(tagName)
}
elements.createOption = function (name, value, selected, disabled = false) {
    var option = elements.create("option")
    option.name = name
    option.innerHTML = value
    option.selected = selected
    disabled && option.setAttribute("disabled", "disabled")
    return option
}
elements.fromLanguageSelect = elements.get("fromLanguageSelect")
elements.swapLanguagesButton = elements.get("swapLanguagesButton")
elements.toLanguageSelect = elements.get("toLanguageSelect")
elements.fromLanguageTextarea = elements.get("fromLanguageTextarea")
elements.toLanguageTextarea = elements.get("toLanguageTextarea")
var languages = []
languages.push(new Normal())
languages.push(new GirlsCode_1())
auth.loggedIn && auth.userName === "Sifra1" && languages.push(new Sifra1())
var loadedData = localStorage.getItem("CodeTranslatorData") ? JSON.parse(localStorage.getItem("CodeTranslatorData")) : {}
var defaultData = {
    fromLanguage: languages[0].languageID,
    toLanguage: languages[1].languageID
}
var data = {}
for (var key of Object.keys(defaultData)) {
    data[key] = Object.keys(loadedData).includes(key) ? loadedData[key] : defaultData[key]
}

function getLanguageIndexById(id) {
    for (var i in languages) {
        if (languages[i].languageID === id) {
            return i
        }
    }
    return undefined
}

function getLanguageIndexByName(name) {
    for (var i in languages) {
        if (languages[i].languageName === name) {
            return i
        }
    }
    return undefined
}

function saveData() {
    localStorage.setItem("CodeTranslatorData", JSON.stringify(data))
}

function onLoad() {
    elements.fromLanguageSelect.innerHTML = ""
    elements.toLanguageSelect.innerHTML = ""
    for (var language of languages) {
        var fromOption = elements.createOption(
            language.languageID,
            language.languageName,
            language.languageID === data.fromLanguage,
            language.languageID === data.toLanguage
        )
        var toOption = elements.createOption(
            language.languageID,
            language.languageName,
            language.languageID === data.toLanguage,
            language.languageID === data.fromLanguage
        )
        elements.fromLanguageSelect.appendChild(fromOption)
        elements.toLanguageSelect.appendChild(toOption)
    }
}

function languageSelectClick() {
    var fromLanguageName = elements.fromLanguageSelect.value
    data.fromLanguage = languages[getLanguageIndexByName(fromLanguageName)].languageID
    var toLanguageName = elements.toLanguageSelect.value
    data.toLanguage = languages[getLanguageIndexByName(toLanguageName)].languageID
    saveData()
    onLoad()
    translate()
}

elements.fromLanguageSelect.addEventListener("click", languageSelectClick)
elements.toLanguageSelect.addEventListener("click", languageSelectClick)

elements.swapLanguagesButton.addEventListener("click", function () {
    var fromLang, toLang, fromText, toText
    fromLang = data.fromLanguage
    toLang = data.toLanguage
    fromText = elements.fromLanguageTextarea.value
    toText = elements.toLanguageTextarea.value
    data.fromLanguage = toLang
    data.toLanguage = fromLang
    elements.fromLanguageTextarea.value = toText
    elements.toLanguageTextarea.value = fromText
    saveData()
    onLoad()
    translate()
})

function translate(e = {}) {
    var translated
    var toTranslate = elements.fromLanguageTextarea.value
    var fromLanguage = languages[getLanguageIndexById(data.fromLanguage)]
    var toLanguage = languages[getLanguageIndexById(data.toLanguage)]
    if (fromLanguage.languageID !== "Normal") {
        toTranslate = fromLanguage.decode(toTranslate)
    }
    if (toLanguage.languageID === "Normal") {
        translated = toTranslate
    } else {
        translated = toLanguage.code(toTranslate)
    }
    elements.toLanguageTextarea.value = translated
}

elements.fromLanguageTextarea.addEventListener("keyup", function (e) {
    translate(e)
})

onLoad()

document.location.search.length > 0 && (document.location.href = document.location.protocol + "//" + document.location.host + "/" + PATHS.HOME)
