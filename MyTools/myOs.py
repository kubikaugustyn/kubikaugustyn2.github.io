#  -*- coding: utf-8 -*-
__author__ = "kubik.augustyn@post.cz"

import os

sep = os.path.sep

def mkDir(dirName):
    os.mkdir(dirName)

def readFile(path):
    return open(path, "r").read()