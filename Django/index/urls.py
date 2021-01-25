#  -*- coding: utf-8 -*-
__author__ = "kubik.augustyn@post.cz"

from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
]
