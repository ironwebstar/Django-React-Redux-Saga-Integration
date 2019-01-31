from django.conf.urls import url, include
from django.contrib import admin
from .views import ListClientView, ClientCreateView, ClientDetail

urlpatterns = [
    url(r'client/$', ListClientView.as_view(), name='client-all'),
    url(r'client/create/$', ClientCreateView.as_view(), name='client-create'),
    url(r'client/(?P<pk>[0-9]+)/$', ClientDetail.as_view(), name='client-detail'),
]
