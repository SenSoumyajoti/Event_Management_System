from django.urls import path
from . import views

urlpatterns = [
    path('register', views.RegisterView, name='register'),
    path('login',views.login_user,   name='login-api'),
    path('logout',views.logout_user,  name='logout'),
    path('forgot-password',views.send_password_reset_email,name='forgot-password'),
    path('generate-ideas/', views.generate_ideas, name='generate_ideas'),
    path('profile', views.profile, name='profile'),
    # path('createevent', views.create_event, name='CreateEvent'),
    path('events', views.show_events_list, name='showEventsList'),

]