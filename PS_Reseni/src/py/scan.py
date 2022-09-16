#  -*- coding: utf-8 -*-
__author__ = "kubik.augustyn@post.cz"

from Identificator import Identificator
from File import File

root_url = "https://www.etaktik.cz/download/reseni/{id}_hd7.pdf"
working_urls = []
limit_urls = 1
id_len = 3
chars = "abcdefghijklmnopqrstuvwxyz"
files = []


def on_file_load(file):
    if file.exists:
        print("Found file:", file.url, file, file.exists)
        working_urls.append(file.url)
    if len(working_urls) >= limit_urls:
        for url in working_urls:
            print(url)
        exit()


print("Scanning")
try:
    id = Identificator(id_len, chars)
    for _ in range(id.limit):
        # print(id)
        file = File(root_url.replace("{id}", str(id)), on_file_load)
        on_file_load(file)
        files.append(file)
        if id.value % 100 == 0:
            # print("", end=".")
            print(f"{id} {id.value}/{id.limit}")
        id.next()
except ValueError:
    print("ValueError happened.")
