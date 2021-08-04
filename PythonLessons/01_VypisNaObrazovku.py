#  -*- coding: utf-8 -*-
__author__ = "raugustyn@post.cz"

# Tohle je začátek výpisu
print("Kubíček")
print("============================")  # Tohle je oddělovač
znamky = [1, 1, 2, 1, 1, 8, 2]
pocetZnamek = len(znamky) + 6
print(pocetZnamek, znamky, znamky[4])
# print "pocetZnamek", pocetZnamek, "!!!"
print("============================")
print("Konec výpisu")  # A tady je konec pocetZnamek

radek = ""
for sloupec in range(50):
    radek += "%d*56=%d\n" % (sloupec, sloupec * 56)
print(radek)
