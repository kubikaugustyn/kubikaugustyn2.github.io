#  -*- coding: utf-8 -*-
__author__ = "kubik.augustyn@post.cz"

import os


def buildFilesInDir(path=""):
    if path != "":
        for dirname, dirnames, filenames in os.walk(path):
            #print "dirname: ", dirname
            #print "filenames: ", filenames
            if dirname == path and 'build' in dirnames:
                dirnames.remove('build')
            elif dirname == path and 'build' not in dirnames:
                os.mkdir(dirname + os.sep + "build")
                """print dirname + os.sep + "build" + os.sep + "build.txt"
                File = openCode(dirname + os.sep + "build" + os.sep + "build.txt", "w")
                File.write(path)
                File.close()"""
            """if '__init__.py' in filenames:
                dirnames.remove('__init__.py')"""
            for filename in filenames:
                #print(os.path.join(dirname, filename))
                buildFile(filename, dirname, path)


def buildFile(fileName="", FileDirFullPath="", FileBuildingStartingPath=""):
    PathSplitter = os.sep
    if fileName != "" and FileDirFullPath != "" and FileBuildingStartingPath != "":
        FileExtension = os.path.splitext(FileDirFullPath + fileName)[1]
        suprottedExtensions = (".js", ".html", ".css")
        if FileExtension in suprottedExtensions:
            print(FileDirFullPath + os.sep + fileName)
            FileNoteOnOneLine = ""
            FileNoteOnMoreLinesStart = ""
            FileNoteOnMoreLinesEnd = ""
            #Definice poznamek
            if FileExtension == ".js":
                FileNoteOnOneLine = "//"
                FileNoteOnMoreLinesStart = "/*"
                FileNoteOnMoreLinesEnd = "*/"
            elif FileExtension == ".css":
                FileNoteOnOneLine = "jkskfjdrihetftrfjygt"
                FileNoteOnMoreLinesStart = "/*"
                FileNoteOnMoreLinesEnd = "*/"
            elif FileExtension == ".html":
                FileNoteOnOneLine = "fdjhdeujfegykdhgfhjg"
                FileNoteOnMoreLinesStart = "<!--"
                FileNoteOnMoreLinesEnd = "-->"

            BuiltFileValue = ""
            File = open(FileDirFullPath + PathSplitter + fileName, "r")
            FileValue = File.read()

            FileValue = FileValue.split("\n")
            FileCurrentLineIsToPrint = True
            for FileValueLine in FileValue:
                FileValueLine = FileValueLine.replace("    ", "")#Smaze tabulatory
                PrintFileCurrentLineByMoreLines = False
                PrintFileCurrentLineByOneLine = False
                PrintFileCurrentLineByLineNothing = FileValueLine == ""
                if FileNoteOnOneLine != "":  # V tomto souboru je poznamka na jeden radek
                    if FileValueLine.startswith(FileNoteOnOneLine) == False:  # V tomto radku neni poznamka na jeden radek
                        PrintFileCurrentLineByOneLine = True  # Vytisknout
                if FileValueLine.find(FileNoteOnMoreLinesStart) == -1 and \
                        FileValueLine.find(FileNoteOnMoreLinesEnd) == -1 and \
                        FileCurrentLineIsToPrint == True:
                    # V tomto souboru je poznamka na vice radku a tento radek je urcen na vytisteni
                    PrintFileCurrentLineByMoreLines = True  # Vytisknout
                if FileValueLine.find(FileNoteOnMoreLinesStart) != -1:
                    FileCurrentLineIsToPrint = False
                if FileValueLine.find(FileNoteOnMoreLinesEnd) != -1:
                    FileCurrentLineIsToPrint = True
                if FileCurrentLineIsToPrint:
                    if PrintFileCurrentLineByMoreLines:
                        if PrintFileCurrentLineByOneLine:
                            if not PrintFileCurrentLineByLineNothing:
                                BuiltFileValue += FileValueLine + "\n"

            # print(FileValue)
            FileDirFromBuildingStartingPath = FileDirFullPath.replace(FileBuildingStartingPath, "")
            if os.path.exists(FileBuildingStartingPath+PathSplitter+"build"+FileDirFromBuildingStartingPath) == False:
                os.makedirs(FileBuildingStartingPath+PathSplitter+"build"+FileDirFromBuildingStartingPath)
            BuiltFileLocation = FileBuildingStartingPath + PathSplitter + "build" + FileDirFromBuildingStartingPath + PathSplitter + fileName  # .replace(FileExtension, ".min" + FileExtension)
            BuiltFile = open(BuiltFileLocation, "w")
            BuiltFile.write(BuiltFileValue)
            BuiltFile.close()
            File.close()

    return 1


if __name__ == '__main__':
    path = "/Web Editor To Build"
    buildFilesInDir(path)
    """
    for dirname, dirnames, filenames in os.walk('.'):
        # print path to all subdirectories first.
        for subdirname in dirnames:
            print(os.path.join(dirname, subdirname))

        # print path to all filenames.
        for filename in filenames:
            print(os.path.join(dirname, filename))

        # Advanced usage:
        # editing the 'dirnames' list will stop os.walk() from recursing into there.
        if '.git' in dirnames:
            # don't go into any .git directories.
            dirnames.remove('build')"""
