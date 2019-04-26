from django.urls import path
from . import views

app_name = 'appTwo'

urlpatterns = [
    path('help/', views.help, name='help'),
    path('',views.index,name='index'),
    path('users/',views.users,name='users'),
    path('add_user/',views.add_users,name='newuser'),
    path('connect/',views.connect4,name='connect'),
]

#     path('', views.index, name="index"),
#     path('users/',views.users,name="users"),
#     path('help/', include('appTwo.urls')),
#     path('admin/', admin.site.urls),
