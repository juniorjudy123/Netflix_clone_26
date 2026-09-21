

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User


from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import EmailTokenObtainPairSerializer,watchlistSerializer

from .models import Watchlist


@api_view(["GET"])
@permission_classes([IsAuthenticated])

def profile(request):
    return Response(
        {
            "message":"You are authenticated",
            "username":request.user.username
        }
    )

@api_view(["POST"])
def register(request):
    name=request.data.get('name')
    email=request.data.get('email')
    password=request.data.get('password')

    if not name or not email or not password:
        return Response(
            {"error": "Name, email and password are required"},
            status=400
        )

    if User.objects.filter(email=email).exists():
        return Response(
            {"error": "Email already registered"},
            status=400
        )

    user = User.objects.create_user(
        username=email,
        email=email,
        password=password,
        first_name=name
    )

    return Response(
        {
            "message": "User created successfully",
            "name": user.first_name,
            "email": user.email
        },
        status=201
    )

class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def get_watchlist(request):

    if request.method == "GET":
        movies = Watchlist.objects.filter(user=request.user)
        serializer = watchlistSerializer(movies, many=True)

        return Response(serializer.data)

    if request.method == "POST":
        movie_id = request.data.get("tmdb_movie_id")

        watchlist, created = Watchlist.objects.get_or_create(
            user=request.user,
            tmdb_movie_id=movie_id
        )

        serializer = watchlistSerializer(watchlist)

        if created:
            return Response(
                serializer.data,
                status=201
            )

        return Response(
            {
                "message": "Movie already exists in your watchlist",
                "data": serializer.data
            },
            status=200
        )


# Deleting watchlist

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])

def delete_watchlist(request,id):
        movie = Watchlist.objects.get(
            id= id,
            user=request.user
        )
        movie.delete()

        return Response(
           status =204
            
            )

