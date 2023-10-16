from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer

class CreateUserView(APIView):
    def post(self, request):
        passage_user_id = request.data.get('passage_user_id', None)

        if passage_user_id is not None:
            if User.objects.filter(passage_id=passage_user_id).exists():
                return Response({"message": "User already exists"}, status=status.HTTP_400_BAD_REQUEST)

            user = User(passage_id=passage_user_id)
            user.save()
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "Missing passage_user_id field in the request data"}, status=status.HTTP_400_BAD_REQUEST)
