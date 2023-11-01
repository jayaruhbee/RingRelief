from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import PortalSerializer
from .models import Portal
from rest_framework import status
from user_app.models import User
import spacy
from sklearn.ensemble import RandomForestClassifier
import pickle
import warnings
import joblib
import re
# Create your views here.
# TFI SCORE: GET TFI SCORE/ POST TFI SCORE
# FLOWCHART: GET FLOWCHART/ POST FLOWCHART

from django.http import HttpResponse, HttpRequest

def hello_world2(request: HttpRequest):
    print("You are here")

    if request.method == 'POST':
        yourtfi = request.POST.get('yourtfi', None)

        if yourtfi is not None:
            print("Here", yourtfi)
            return render(request, 'insights.html', {'yourtfi': yourtfi})

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

# Function to split text into sentences
def split_text_into_sentences(text):
    sentences = re.split(r'[.,;!?]', text)

    # Calculate the average sentence length
    sentence_lengths = [len(sentence.split()) for sentence in sentences]
    average_length = sum(sentence_lengths) / len(sentence_lengths)

    if average_length >= 12:
        # Split long sentences into segments of 6 words or less
        segmented_sentences = []
        for sentence in sentences:
            words = sentence.split()
            while words:
                segment = " ".join(words[:6])
                segmented_sentences.append(segment)
                words = words[6:]

        sentences = segmented_sentences

    if len(sentences) == 0:
        return jsonify({"error": "Please type at least 6 words"})

    return sentences

def get_data(request):
    nlp_loaded = spacy.load('NER_model')
    try:
        request_data = request.POST.get("userText")
        print(request_data, "REQ DATAA")

        dic = {
            "flow": []
        }

        #1. Split user_input into sentences
        sentences = split_text_into_sentences(user_input)

        #2. Look over each sentence to see if ['DOC', 'MED', 'DIAG', 'TEST', 'TREAT', 'SYM', 'TIME'], append to dic['flow']
        main_NERs = ['DOC', 'MED', 'DIAG', 'TEST', 'TREAT', 'SYM', 'TIME', 'SOUND', 'BOD']
        words_collected = []
        for s in sentences:
            doc = nlp_loaded(s)
            for entities in doc.ents:
                if entities.label_ in main_NERs:
                    if entities.text not in words_collected:
                        dic['flow'].append(s)
                        words_collected.append(entities.text)
                    break    

        return JsonResponse(dic)

    except Exception as e:
        return JsonResponse({"error": e})
        