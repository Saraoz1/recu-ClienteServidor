from django.urls import path, re_path
from django.conf.urls import include
from django.conf import settings
from django.conf.urls.static import static

# IMPORTACIONES
from loadImage.views import loadImage
from loadImage.views import imageDetail

urlpatterns = [
    re_path(r'^lista/$', loadImage.as_view()),
    re_path(r'^lista/(?P<pk>\d+)$', imageDetail.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)