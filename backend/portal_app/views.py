from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import PortalSerializer
from .models import Portal
from rest_framework import status
from user_app.models import User

# Create your views here.
# TFI SCORE: GET TFI SCORE/ POST TFI SCORE
# FLOWCHART: GET FLOWCHART/ POST FLOWCHART
# from django.shortcuts import render

from django.http import HttpResponse, HttpRequest

def hello_world2(request: HttpRequest):
    print("You are here")

    if request.method == 'POST':
        yourtfi = request.POST.get('yourtfi', None)

        if yourtfi is not None:
            print("Here", yourtfi)
            return render(request, 'insights.html', {'yourtfi': yourtfi})

    # Handle other cases if 'yourtfi' is not found or request method is not POST
    return HttpResponse("Error: 'yourtfi' not found or invalid request")
# NEXT STEP: GET NEXT STEP/ POST NEXT STEP
class Tfi_Scores(APIView):
    def post(self, request):
            passage_id = request.data
            tfi_score = request.data.get('tfi_score')
            user_in_db_with_passage_id = User.objects.filter(passage_id=passage_id).first()
            tfi_score = tfi_score
            
            if user_in_db_with_passage_id:
                user = user_in_db_with_passage_id.id 

                new_tfi_score = Portal(user = user.id, tfi_score=tfi_score) 
                new_tfi_score.save()

                return Response(PortalSerializer(new_tfi_score).data, status=status.HTTP_201_CREATED)
            else:
                return Response("User not found", status=status.HTTP_404_NOT_FOUND)
    # def get(self, request):
        