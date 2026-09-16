from django.urls import path
from .views import profile,register,get_watchlist,delete_watchlist



urlpatterns = [
    path('profile/',profile,name='profile' ),
    path('register/',register,name='register'),
    path('watchlist/',get_watchlist,name='watchlist'),
    path('watchlist/<int:id>/',delete_watchlist
         ,name='delete_watchlist'),
    
]