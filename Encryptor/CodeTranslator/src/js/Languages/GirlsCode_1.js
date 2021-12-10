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
        for (var line of text.split("\n")) {
            for (var part of line.split("")) decoded_string += this.alphabet[part] || ""
            decoded_string += "\n"
        }
        return decoded_string
    }

    code(text) {
        var coded_string = ""
        for (var line of text.split("\n")) {
            for (var part of line.split("")) coded_string += this.alphabetReverse[part.toUpperCase()] || ""
            coded_string += "\n"
        }
        return coded_string
    }
}
