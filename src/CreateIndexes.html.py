#  -*- coding: utf-8 -*-
__author__ = "kubik.augustyn@post.cz"

import os

IndexHtmlTemplate = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Error...</title>
    <style>@import "https://kubikaugustyn.github.io/src/css/min/bgr-clr.min.css";</style>
</head>
<body>
<script>document.location.href = "https://kubikaugustyn.github.io/error/errorNahlizeniDoSrc"</script>
</body>
</html>
"""

def createIndexes(path, overwriteIfExists=False, logIndent=''):
    # !/usr/bin/python
    print logIndent + str(path)
    indexFileName = path + os.sep + "index.html"
    if overwriteIfExists or not os.path.exists(indexFileName):
        print logIndent + "\tindex.html"
        HTML = open(indexFileName, 'w')
        HTML.write(IndexHtmlTemplate)
        HTML.close()

    # This would print all the files and directories
    for name in os.listdir(path):
        fullName = path + os.sep + name
        if os.path.isdir(fullName):
            createIndexes(fullName, overwriteIfExists, logIndent + '\t')



if __name__ == '__main__':
    createIndexes("C:\Users\Augustynovi\Desktop\Kubik\programming\src", True)
