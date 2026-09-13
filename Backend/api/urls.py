from django.urls import path
from .views import profile,register,EmailTokenObtainPairView


urlpatterns = [
    path('profile/',profile,name='profile' ),
    path('register/',register,name='register'),
    
]