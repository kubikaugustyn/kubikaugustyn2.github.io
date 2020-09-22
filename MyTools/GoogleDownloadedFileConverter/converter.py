#  -*- coding: utf-8 -*-
__author__ = "kubik.augustyn@post.cz"

import os


def convert(path, downloadedFileName):
    print path, downloadedFileName
    filesDir = path + os.path.sep + downloadedFileName + "_files"
    dirs = os.listdir(filesDir)
    for file in dirs:
        if not os.path.isdir(filesDir + os.path.sep + file):
            #print os.path.splitext(file)[0]
            print file
            #file = file.replace("\x9e", "ž")
            #file = file.replace("\xfd", "ý")
            OldFile = open(file, "r")
            NewFile = open(os.path.splitext(file)[0], "w")
            NewFile.write(OldFile.read())
            OldFile.close()
            NewFile.close()


if __name__ == '__main__':
    PATH = "C:\\Users\\Augustynovi\\Desktop\\Kubik\\programming\\canvas\\3d\\Phoria\\To_Convert"
    NAME = "Phoria - Dev test page 9"
    convert(PATH, NAME)
