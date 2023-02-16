var __author__ = "kubik.augustyn@post.cz"

var chars = {
    undef: "?",
    start: "&#9580;",
    end: "&#9579;",
    letterSplit: "&#9474;",
    wordSplit: "&#9553;",
    options: [
        "&#9675;",
        "&#9651;",
        "&#9633;"
    ]
}
var canvas = document.getElementById("tree")
var A4 = {
    width: 210,// mm
    height: 297,// mm
    border: 10 // mm
}
var paper = A4
// Make paper 'to width' from 'to height'
var temp = paper.width
paper.width = paper.height
paper.height = temp
//
var scale = 10
var tree = new Tree(canvas, scale * (paper.width - 2 * paper.border), scale * (paper.height - 2 * paper.border))
tree.childBranchsNum = 3
tree.data = [
    "OEN",
    ["A", "T", "V", "S", "CH", "I", "L", "K", "R"],
    "DPMUZJYCBHFGˇ´°XWQ012345678",
    ["9", "~", "~", "?", "~", "~", ".", "~", "~", "!", "~", "~", "Ahoj!", "~", "~", "Co je?", "~", "~", "Opravdu?", "~", "~", "Jak", "~", "~", "se", "~", "~", "máš", "~", "~", "to", "~", "~", "dělá", "~", "~", "Dobře.", "~", "~", "Špatně.", "~", "~"]
]

/**
 *
 * @param multi {Object<string, string>}
 */
String.prototype.replaceAllMulti = function (multi) {
    var value = this.valueOf()
    for (var [from, to] of Object.entries(multi)) value = value.replaceAll(from, to)
    return value
}

function normalizeMessage(message) {
    message = message.replaceAllMulti({
        "Á": "A´",
        "Č": "Cˇ",
        "Ď": "Dˇ",
        "É": "E´",
        "Ě": "Eˇ",
        "Í": "I´",
        "Ó": "O´",
        "Ř": "Rˇ",
        "Š": "Sˇ",
        "Ť": "Tˇ",
        "Ú": "U´",
        "Ů": "U°",
        "Ý": "Y´",
        "Ž": "Zˇ",
    })
    return message
}

function encodeMessage(message) {
    // Encode message word by word
    var wordPaths = []
    for (var word of message.split(" ")) wordPaths.push(encodeWord(word))
    return wordPaths
}

function encodeWord(word) {
    var wholeWordPath = searchWord(word)
    // If the whole word is in tree
    if (wholeWordPath) return [wholeWordPath]
    // Else encode letter by letter
    var paths = []
    for (var letter of word) paths.push(searchWord(letter))
    return paths
}

function searchWord(word) {
    for (var i = 0; i < tree.children.length; i++) {
        var children = tree.children[i]
        for (var childI = 0; childI < children.length; childI++) {
            var child = children[childI]
            if (child.text === word) {
                var path = []
                // console.log(child, childI)
                for (var depth = child.depth - 1; depth >= 0; depth--) {
                    path.push(childParentI(path.length ? path[path.length - 1] : childI))
                }
                path.reverse()
                path.push(childI)
                path = path.map(val => val % tree.childBranchsNum)
                return path
            }
        }
    }
}

function childParentI(childI) {
    return Math.floor(childI / tree.childBranchsNum)
}

document.getElementById("messageInput").onchange = function () {
    if (!document.getElementById("messageInput").value) {
        document.getElementById("messageOutput").innerHTML = "Zadejte text."
        return
    }
    var encodedText = "Zakódovaný text: ".concat(chars.start)
    var normalizedMessage = normalizeMessage(document.getElementById("messageInput").value)
    document.getElementById("normalizedMessageOutput").innerHTML = normalizedMessage
    var wordPaths = encodeMessage(normalizedMessage)
    wordPaths = wordPaths.map(wordPath => {
        return wordPath.map(letterPath => {
            if (!letterPath) return chars.undef
            return letterPath.map(i => {
                return chars.options[i]
            }).join("")
        }).join(chars.letterSplit)
    })
    encodedText += wordPaths.join(chars.wordSplit)
    encodedText += chars.end
    document.getElementById("messageOutput").innerHTML = encodedText
}

tree.render()

// console.log(searchWord("Z")) // Expected: [0, 1, 1]
// console.log(searchWord("7")) // Expected: [2, 2, 1]
// console.log(searchWord("to")) // Expected: [1, 0, 1, 0]
