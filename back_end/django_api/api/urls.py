from django.urls import path
from . import views

urlpatterns = [
    path("get-disciplines/", views.get_disciplines),
    path("get-disciplines-by-courseid/<int:id>/", views.get_disciplines_by_courseid),
    path("set-disciplines/", views.set_disciplines),
    path("set-course/", views.set_course),
    path("get-course/", views.get_course),
    path("set-time/", views.set_time),
    path("get-data-availability/", views.get_data_availability),
    path("set-teacher/", views.set_teacher),
    path("creat-work-board/", views.creat_work_board)
]