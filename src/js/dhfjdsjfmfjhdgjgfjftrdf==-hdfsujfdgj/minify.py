#  -*- coding: utf-8 -*-
__author__ = "kubik.augustyn@post.cz"


def minify(path):
    ScriptToMinify = open(path, 'r')
    #ScriptToMinify = ScriptToMinify.read()
    MinifiedScriptValue = ""
    while True:
        line = ScriptToMinify.readline()
        line = line.replace("\n", "")
        line = line.replace("   ", "")
        if line:
            MinifiedScriptValue += line
        else:
            break
    ScriptToMinify.close()
    MinifiedScript = open(path + ".js", "w")
    MinifiedScript.write(MinifiedScriptValue)
    MinifiedScript.close()


if __name__ == '__main__':
    minify("a.b.min.js")
