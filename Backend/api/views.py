

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated



@api_view(["GET"])
@permission_classes([IsAuthenticated])

def profile(request):
    return Response(
        {
            "message":"You are authenticated",
            "username":request.user.username
        }
    )