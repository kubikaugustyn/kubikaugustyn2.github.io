#  -*- coding: utf-8 -*-
__author__ = "kubik.augustyn@post.cz"

import MyTools.DirectoryBuildHrefsToAllFilesAndDirsToHTML.builder as builder

if __name__ == '__main__':
    path = "C:\\Users\\Radek Augustyn\\Desktop\\Kubik\\kubikaugustyn.github.io"
    notGoToDirs = (".git", ".idea", "MyTools", "Amp_What", "Downloads", "src", "cms", "decko", "MyMinecraft")
    notGoToFileExtension = (
        ".js", ".css", ".py", ".pyc", ".sqlite3", ".gitignoreddd", ".ttf", ".mp4", ".txt", "0", "a", "c", "f", "i", "j",
        "k", "l", "o", "p",
        "t",
        "u",
        "y", "z")
    builder.Build(path, notGoToDirs, notGoToFileExtension)
