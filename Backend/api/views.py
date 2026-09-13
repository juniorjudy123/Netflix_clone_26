

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import EmailTokenObtainPairSerializer



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