var __author__ = "kubik.augustyn@post.cz"

var canvas = document.getElementById("tree")
var tree = new Tree(canvas, window.innerWidth - 50, window.innerHeight - 50)
tree.childBranchsNum = 3
tree.data = [
    "OEN",
    ["A", "T", "V", "S", "CH", "I", "L", "K", "R"],
    "DPMUZJYCBHFGˇ´°XWQ012345678",
    "9~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
]
tree.render()
