#  -*- coding: utf-8 -*-
__author__ = "kubik.augustyn@post.cz"

import MyTools.DirectoryBuildHrefsToAllFilesAndDirsToHTML.builder as builder

if __name__ == '__main__':
    path = "C:\\Users\\Augustynovi\\Desktop\\Kubik\\programming"
    notGoToDirs = (".git", ".idea", "MyTools", "Amp_What", "Downloads", "src", "")
    notGoToFileExtension = (".js", ".css", ".py", ".gitignoreddd", ".ttf", ".mp4")
    builder.Build(path, notGoToDirs, notGoToFileExtension)