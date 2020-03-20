"""untitled URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from untitled import views22
from untitled import views11
from untitled import road_flow_cnn_use2

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('admin/new_0/', views22.change_flow),
    path('admin/posttest/', views11.recv_data),
    path('admin/posttest1/', views11.get_data),
    path('admin/new_1/', road_flow_cnn_use2.prediction),
    path('admin/post_view2.0_1/', views22.show_car),
    path('admin/post_view2.0_2/', views22.test_traj),
    path('admin/post_view2.0_3/', views22.change_flow),
    path('admin/post_view2.0_3_1/', views22.change_speed),
    path('admin/post_view2.0_4/', views22.read_road),
    path('admin/post_view2.0_5/', views22.ouput_flow),
    path('admin/post_view2.0_6/', views22.ouput_taxi_time),
    path('admin/post_view2.0_7/', views22.ouput_taxi),
    path('admin/post_view2.0_8/', views22.output_flow_TM),
    path('admin/post_view2.0_9/', views22.output_avefee),
    path('admin/post_view2.0_1_1/', views22.ouputsearchroad),
    path('admin/post_view2.0_1_2/', views22.ouputtaxiname),
    path('admin/post_view2.0_1_3/', views22.taxistatistic),
    path('admin/post_view2.0_1_4/', views22.experiment),
]
