var __author__ = "kubik.augustyn@post.cz"

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
tree.render()
