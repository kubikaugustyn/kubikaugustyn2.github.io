var __author__ = "kubik.augustyn@post.cz"

class GirlsCode_1 {
    constructor() {
        this.languageID = "GirlsCode_1"
        this.languageName = "Girls Code 1"
        this.alphabet = {
            "/": "A",
            "!": "B",
            ":": "C",
            "=": "D",
            "+": "E",
            "-": "F",
            "×": "G",
            "€": "H",
            "&": "I",
            "@": "J",
            '"': "K",
            '“': "K",
            '”': "K",
            ".": "L",
            ",": "M",
            "?": "N",
            "(": "O",
            ")": "P",
            'nevim': "Q",
            ";": "R",
            "%": "S",
            "¥": "T",
            "£": "U",
            "~": "V",
            ">": "W",
            "#": "X",
            "{": "Y",
            "*": "Z",
            " ": " ",
        }
        this.alphabetReverse = {}
        for (var key of Object.keys(this.alphabet)) {
            this.alphabetReverse[this.alphabet[key]] = key
        }
    }

    decode(text) {
        var decoded_string = ""
        for (var part of text.split("")) decoded_string += this.alphabet[part] || "?"
        return decoded_string
    }

    code(text) {
        var decoded_string = ""
        for (var part of text.split("")) decoded_string += this.alphabetReverse[part.toUpperCase()] || "?"
        return decoded_string
    }
}
