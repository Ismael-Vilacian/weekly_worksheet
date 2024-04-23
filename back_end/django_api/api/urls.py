from django.urls import path
from . import views

urlpatterns = [
    path("", views.hello_world),
    path("curso/", views.teste),
    path("get-disciplines/", views.get_disciplines),
]