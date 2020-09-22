#  -*- coding: utf-8 -*-
__author__ = "kubik.augustyn@post.cz"

import MyTools.DirectoryBuildHrefsToAllFilesAndDirsToHTML.builder as Builder

if __name__ == '__main__':
    path = "C:\\Users\\Augustynovi\\Desktop\\Kubik\\programming"
    Builder.Build(path, (".git", ".idea"))