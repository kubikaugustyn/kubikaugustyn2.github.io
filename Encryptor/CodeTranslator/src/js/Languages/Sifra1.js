var __author__ = "kubik.augustyn@post.cz"

class Sifra1 {
    constructor() {
        this.languageID = "Sifra1"
        this.languageName = "Šifra 1"
    }

    decode(text) {
        var i, temp
        var decoded_string = ""
        for (var line of text.split("\n")) {
            if (line !== "") {
                // Decode
                var decoded_line = line + ""
                // Step 2 = JAOH -> JOHA
                temp = decoded_line + ""
                var left = "", right = ""
                decoded_line = ""
                for (i = 0; i < temp.length; i++) {
                    // 0, 2...
                    if (i / 2 === Math.floor(i / 2)) {
                        left += temp[i]
                    }
                    // 1, 3...
                    else {
                        right = temp[i] + right
                    }
                }
                temp = left + right
                decoded_line = temp
                // Step 1 = JOHA -> AHOJ
                decoded_line = decoded_line.split("").reverse().join("")
                //End
                decoded_string += decoded_line
                decoded_string += "\n"
            }
        }
        return decoded_string
    }

    code(text) {
        var i, temp
        var coded_string = ""
        for (var line of text.split("\n")) {
            if (line !== "") {
                // Code
                var coded_line = line + ""
                // Step 1 = AHOJ -> JOHA
                coded_line = coded_line.split("").reverse().join("")
                // Step 2 = JOHA -> JAOH
                temp = coded_line + ""
                coded_line = ""
                for (i = 0; i < temp.length; i++) {
                    // 0, 2...
                    if (i / 2 === Math.floor(i / 2)) {
                        coded_line += temp[i / 2]
                    }
                    // 1, 3...
                    else {
                        coded_line += temp[temp.length - Math.ceil(i / 2)]
                    }
                }
                //End
                coded_string += coded_line
                coded_string += "\n"
            }
        }
        return coded_string
    }
}
