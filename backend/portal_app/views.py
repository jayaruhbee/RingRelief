from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import PortalSerializer
from .models import Portal
from rest_framework import status
from user_app.models import User
from django.http import JsonResponse, HttpResponse, HttpRequest
import spacy
from sklearn.ensemble import RandomForestClassifier
import pickle
import warnings
import joblib
import re
import json
from django.views.decorators.csrf import csrf_exempt

def hello_world2(request: HttpRequest):
    print("You are here")

    if request.method == 'POST':
        yourtfi = request.POST.get('yourtfi', None)

        if yourtfi is not None:
            print("Here", yourtfi)
            return render(request, 'insights.html', {'yourtfi': yourtfi})

    return HttpResponse("Error: 'yourtfi' not found or invalid request")


class Tfi_Scores(APIView):
    def post(self, request):
        passage_id = request.data
        tfi_score = request.data.get('tfi_score')
        user_in_db_with_passage_id = User.objects.filter(
            passage_id=passage_id).first()
        tfi_score = tfi_score

        if user_in_db_with_passage_id:
            user = user_in_db_with_passage_id.id

            new_tfi_score = Portal(user=user.id, tfi_score=tfi_score)
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
        return JsonResponse({"error": "Please type at least 6 words"})

    return sentences


@csrf_exempt
def get_data(request):
    # print("Get_data POST request running")
    nlp_loaded = spacy.load('portal_app/NER_model')
    try:
        request_data = json.loads(request.body)
        user_input = request_data.get("userText")
        # print(type(user_input))
        # print(user_input, "REQ DATAA")

        dic = {
            "flow": []
        }

        # 1. Split user_input into sentences
        sentences = split_text_into_sentences(user_input)

        # 2. Look over each sentence to see if ['DOC', 'MED', 'DIAG', 'TEST', 'TREAT', 'SYM', 'TIME'], append to dic['flow']
        main_NERs = ['DOC', 'MED', 'DIAG', 'TEST',
                     'TREAT', 'SYM', 'TIME', 'SOUND', 'BOD']
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
        return JsonResponse({"error": str(e)})





def encoder(name):
    if (name!= None):
        return 1
    else:
        return 0

@csrf_exempt
def process_data(request):
    model = joblib.load('portal_app/next_step.pkl')
    data = json.loads(request.body)

    hearing_loss = data.get('hearing_loss')
    hearing_loss = encoder(hearing_loss)

    paroxysmal = data.get('paroxysmal')
    paroxysmal = encoder(paroxysmal)

    tinnitus_type = data.get('doYou')

    arterial = 0
    venous = 1

    vertigo = data.get('vertigo')
    vertigo = encoder(vertigo)

    headache = data.get('headache')
    headache = encoder(headache)

    psychiatric = data.get('psychiatric')
    psychiatric = encoder(psychiatric)

    sensory_neural = data.get('sensory_neural')
    sensory_neural = encoder(sensory_neural)

    severity = data.get('severity')

    otoscopy = data.get('otoscopy')
    otoscopy = encoder(otoscopy)

    cranio_exam = data.get('cranio_exam')
    cranio_exam = encoder(cranio_exam)

    auscultation = data.get('auscultation')
    auscultation = encoder(auscultation)

    tympanometry = data.get('tympanometry')
    tympanometry = encoder(tympanometry)

    arterial = 0
    venous = 1

    features = [hearing_loss, paroxysmal, arterial, venous, vertigo, headache, psychiatric,
    sensory_neural, otoscopy, cranio_exam]
    
    if tinnitus_type == 'Non-Pulsatile':
        features.append(1)
        features.append(0)
    else:
        features.append(0) 
        features.append(1)

    if severity == 'Mild':
        features.append(0)
        features.append(1)
        features.append(0)
        features.append(0)
    elif severity == 'Moderate':
        features.append(0)
        features.append(0)
        features.append(1)
        features.append(0)
    elif severity == 'Severe':
        features.append(0)
        features.append(0)
        features.append(0)
        features.append(1)

    if auscultation == 1:
        features.append(0)
        features.append(1)
    else:
        features.append(1)
        features.append(0)

    if tympanometry == 1:
        features.append(0)
        features.append(1)
    else:
        features.append(1)
        features.append(0)

    next_steps_to_causes = {
    'Cardiovascular examination & Echo-doppler & Angiography & Angio-MRI & Blood test': [
        'Arteriovenous malformation',
        'Sinus thrombosis',
        'Aneurysm',
        'Glomus tumor',
        'Carotid stenosis',
        'BIH'
    ],
    'Acute Treatment':['Hearing loss can be treated by many ways'
    ],

    'EEG & MRI & BAEP': [
        'Epilepsy',
        'MVC',
        'Aud. nerve compression',
        'Myoclonus'
    ],
    'MRI & VEMP & BAEP & Electro cochleography': [
        'Otosclerosis',
        'Otitis',
        'Middle ear aplasia',
        'Eustachian tube dysfunction'
    ],
    'MRI & Furosemide test & Lumbar Puncture': [
        'BIH',
        'Chiari',
        'Space occupying lesion',
        'Basilar impression'
    ],
    'Psych. Exam.': [
        'Depression',
        'Anx. disorder',
        'Insomnia',
        'Somatoform disorder',
        'Suicidality'
    ],
    'OAE & MRI & BAEP & Blood test':['Noise Trauma', 'Chronic Hearing loss', 'Prevention'],
    'Imaging & functional exam. for: Neck TMJ': [
        'Disorders Neck TMJ'
    ],
    'Cran. + cerv. CT/MRI BAEP EEG Echo doppler Neck exam Psych. exam': [
        'PTSD',
        'Pertous bone fracture',
        'Ossicular chain disruption',
        'Posttraumatic epilepsy',
        'Carotid dissection',
        'Perilymphatic fistula',
        'Otic barotrauma',
        'Cochlear concussion'
    ]
    }
    print("Final features:", features)
    nextstep = model.predict([features])
    causes = next_steps_to_causes[nextstep[0]]
    result = {"nextstep": nextstep[0], "causes": causes}
    print("result:", result)

    return JsonResponse(result)