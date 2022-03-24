from django.urls import path, include, re_path

from userProfile.views import ProfileTable,ProfileTableDetail, UserProfile

urlpatterns = [
    re_path(r'^myprofile',ProfileTable.as_view()),
    re_path(r'^detailprofile/(?P<pk>\d+)/$',ProfileTableDetail.as_view()),
    re_path(r'^profiledata/(?P<pk>\d+)/$',UserProfile.as_view()),
    
] 