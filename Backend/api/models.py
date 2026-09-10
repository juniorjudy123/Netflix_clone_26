from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Watchlist(models.Model):
    user= models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='watchlist'
    )

    tmdb_movie_id= models.IntegerField()

    created_at=models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.user.username}-{self.tmdb_movie_id}"