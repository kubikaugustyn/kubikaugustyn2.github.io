#  -*- coding: utf-8 -*-
__author__ = "radek.augustyn@email.cz"


import os, codecs
from json import dump, dumps, load

IMAGE_EXTENSIONS = '.jpg', '.jpeg', '.png'


def processDirectory(directory, indent=""):
    directoryProcessed = False

    directory = os.path.normpath(directory) +  os.sep
    listDirFileName = directory + "listdir.json"
    if os.path.exists(listDirFileName):
        listDir = load(codecs.open(listDirFileName, "r", 'utf-8'))
    else:
        listDir = {}
    listDir["images"] = []
    listDir["directories"] = []

    for name in os.listdir(directory):
        name = unicode(name)
        fullName = directory + name
        if os.path.isdir(fullName):
            if not directoryProcessed:
                directoryProcessed = True
                print(indent, directory)

            processDirectory(fullName, indent + "    ")
            listDir["directories"].append(name)
        else:
            fileName, fileExtension = os.path.splitext(fullName)
            if fileExtension.lower() in IMAGE_EXTENSIONS:
                #print indent, "\t", name
                listDir["images"].append(name)

    dump(listDir, codecs.open(listDirFileName, "w", 'utf-8'), indent=4)

    if directoryProcessed:
        msg = "Done"
    else:
        msg = directory

    print(indent, "%s, %d directories, %d images." % (msg, len(listDir["directories"]), len(listDir["images"])))


if __name__ == "__main__":
    import sys
    reload(sys)
    sys.setdefaultencoding("utf-8")

    processDirectory("./")

