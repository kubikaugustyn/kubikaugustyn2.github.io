#  -*- coding: utf-8 -*-
__author__ = "kubik.augustyn@post.cz"

import requests, threading


class File:
    def __init__(self, url, on_done=None):
        self.url = url
        # self.on_done = on_done
        # self.thread = threading.Thread(target=self.exists_on_server)
        self.exists = False
        # self.done = False

        # self.thread.start()
        self.exists_on_server()

    def exists_on_server(self):
        head = requests.head(self.url, stream=True)
        self.exists = head.status_code == 200
        self.done = True
        # if self.on_done:
        #     self.on_done(self)
        # print(self.url, self.exists)


if __name__ == '__main__':
    f = File("https://www.etaktik.cz/download/reseni/utf_hch8.pdf")
    f1 = File("https://www.etaktik.cz/download/reseni/utg_hch8.pdf")
