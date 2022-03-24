from django.urls import path, re_path
from django.conf.urls import include

from Register.views import RegisterUserAPI


urlpatterns = [
    re_path(r'^create_user/$', RegisterUserAPI.as_view()),
]