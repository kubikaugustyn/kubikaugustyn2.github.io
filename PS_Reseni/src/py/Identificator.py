#  -*- coding: utf-8 -*-
__author__ = "kubik.augustyn@post.cz"

import math


class Identificator:
    def __init__(self, length, char_map):
        if length <= 0:
            raise ValueError("Length of ID must be grater than 0.")
        if len(char_map) == 0:
            raise ValueError("Char map must have at least one char.")
        self.length = length
        self.char_map = char_map
        self.limit = int(math.pow(len(self.char_map), self.length))
        self.value = 0
        self.indexes = []
        for _ in range(self.length):
            self.indexes.append(0)

        self.__generate_indexes()

    def __generate_indexes(self):
        temp = int(self.value)
        for i in range(len(self.indexes)):
            ind = len(self.indexes) - 1 - i
            value = math.pow(len(self.char_map), ind)
            self.indexes[i] = int(temp / value)
            temp %= value

    def __str__(self):
        string = ""
        for i in self.indexes:
            string += self.char_map[i]
        return string

    def __check_value(self):
        if self.value > self.limit or self.value < 0:
            raise ValueError("ID's value exceeded it's bounds.")

    def sub(self, value):
        self.value -= value
        self.__check_value()
        self.__generate_indexes()

    def add(self, value):
        self.value += value
        self.__check_value()
        self.__generate_indexes()

    def next(self):
        self.add(1)


if __name__ == '__main__':
    id = Identificator(5, "abcdefghijklmnopqrstuvwxyz")
    id.add(27)
    print(id)
