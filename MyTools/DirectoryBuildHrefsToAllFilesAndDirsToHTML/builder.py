#  -*- coding: utf-8 -*-
from __future__ import print_function

import os
#import MyTools.myOs

__author__ = "kubik.augustyn@post.cz"

sep = os.path.sep

HTMLFile = open("C:\\Users\\Augustynovi\\Desktop\\Kubik\\programming\\MyTools\\DirectoryBuildHrefsToAllFilesAndDirsToHTML\\Template.html", "r")
HTMLFileTemplate = HTMLFile.read()
Files = []

def ListDir(path, notGoToDirs, notGoToFileExtension):
    dirs = os.listdir(path)
    #print(os.path.isdir("C:\\Users\\Augustynovi\\Desktop\\Kubik\\programming\\MyTools\\DirectoryBuildHrefsToAllFilesAndDirsToHTML"))
    #if ".idea" in dirs:
    #    dirs.remove(".idea")
    for actualNotGoTo in notGoToDirs:
        if actualNotGoTo in dirs:
            dirs.remove(actualNotGoTo)
    for fileName in dirs:
        #print(os.path.isfile(path + sep + fileName), path + sep + fileName)
        #print(os.path.isdir(path+sep+fileName))
        if os.path.isdir(path+sep+fileName):
            if not os.path.isfile(path + sep + fileName):
                ListDir(path + sep + fileName, notGoToDirs, notGoToFileExtension)
                #print(fileName)
                #print("aa")
                dirs.remove(fileName)
        #elif os.path.isfile(path + sep + fileName):
        #    if not os.path.isdir(path+sep+fileName):
        #        if os.path.splitext(path + sep + fileName)[1] in notGoToFileExtension:
        #            dirs.remove(fileName)
    # This would print all the files and directories
    for file in dirs:
        if not os.path.isdir(path + sep + file):
            if not os.path.splitext(path + sep + file)[1] in notGoToFileExtension:
                print(file, os.path.isdir(path + sep + file))
                Files.append(path+sep+file)
    return 0

def Build(path, notGoToDirs, notGoToFileExtension):
    print(path)
    File = open(path+sep+"DirectoryHrefs.html", "w+")
    ListDir(path, notGoToDirs, notGoToFileExtension)
    Hrefs = """"""
    for file in Files:
        Hrefs += f"\t<a target='blank' href='{file}'>{file}</a><br>\n"
    #HTMLFileTemplate.replace("<HREFS />", Hrefs)
    Output = HTMLFileTemplate.replace("<HREFS />", Hrefs).replace(path+sep, ".\\")
    File.write(Output)
    return 0

if __name__ == '__main__':
    path = "C:\\Users\\Augustynovi\\Desktop\\Kubik\\programming\\MyTools"
    Build(path, (), ())