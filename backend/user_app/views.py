from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from passageidentity import Passage
from django.http import JsonResponse
import os
# from .serializers import UserSerializer


class CreateUserView(APIView):
    def post(self, request):
        print("user debugging")
        passage_user_id = request.data.get('passage_user_id', None)
        first_name = request.data.get('first_name', None)
        last_name = request.data.get('last_name', None)
        email = request.data.get('email', None)
        username = request.data.get('username', None)

        if passage_user_id is not None:
            user = User(
                passage_id=passage_user_id,
                first_name=first_name,
                last_name=last_name,
                email=email,
                username=username
            )
            user.save()
            print(f"User saved to the database with ID: {user.id}")
            return JsonResponse({"result": 200})
        else:
            return JsonResponse({"message": "Missing passage_user_id field in the request data"}, status=400)



PASSAGE_APP_ID = os.environ.get("PASSAGE_APP_ID")

class AuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        psg = Passage(PASSAGE_APP_ID)
        
        try:
            user = psg.authenticateRequest(request)
        except Exception:
            print("no")
        request.user = user
        response = self.get_response(request)
        return response
