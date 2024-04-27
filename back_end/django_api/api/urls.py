from django.urls import path
from . import views

urlpatterns = [
    path("", views.hello_world),
    path("get-disciplines/", views.get_disciplines),
    path("set-disciplines/", views.set_disciplines),
    path("set-course/", views.set_course),
    path("set-time/", views.set_time),
]