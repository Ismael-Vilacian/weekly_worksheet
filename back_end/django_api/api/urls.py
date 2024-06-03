from django.urls import path
from . import views

urlpatterns = [
    path("hello-world/", views.hello_world),
    path("get-disciplines/", views.get_disciplines),
    path("get-disciplines-by-courseid/<int:id>/", views.get_disciplines_by_courseid),
    path("set-disciplines/", views.set_disciplines),
    path("delete-discipline/<int:id>/", views.delete_disciplines),
    path("set-course/", views.set_course),
    path("get-course/", views.get_course),
    path("delete-course/<int:id>/", views.delete_course),
    path("set-time/", views.set_time),
    path("get-data-availability/", views.get_data_availability),
    path("set-teacher/", views.set_teacher),
    path("get-teacher/", views.get_teacher),
    path("delete-teacher/<int:id>/", views.delete_teacher),
    path("creat-work-board/", views.create_work_board),
    path("get-work-board/", views.get_work_board),
    path("delete-work-board/<int:id>/", views.delete_work_board),
    path("get-home-data/", views.get_home_data)
]