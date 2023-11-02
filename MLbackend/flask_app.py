from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import requests
import spacy
from sklearn.ensemble import RandomForestClassifier
import pickle
import warnings
import joblib
import re

# Suppress specific spacy warnings
warnings.filterwarnings("ignore", category=UserWarning, module="spacy.pipeline.attributeruler")
warnings.filterwarnings("ignore", category=UserWarning, module="spacy.pipeline.lemmatizer")
#Run python -m spacy download en_core_web_sm before python3 app.py
app = Flask(__name__)

allowed_origins = [
    "*"
]

CORS(app, resources={r"/data": {"origins": allowed_origins}})

# Define your data
jsonData = {
    "flow": ["Started a year ago", "Gone to the ENT", "Struggle with the ringing"]
}

# Function to split text into sentences
# def split_text_into_sentences(text):
#     sentences = re.split(r'[.,;!?]', text)

#     # Calculate the average sentence length
#     sentence_lengths = [len(sentence.split()) for sentence in sentences]
#     average_length = sum(sentence_lengths) / len(sentence_lengths)

#     if average_length >= 12:
#         # Split long sentences into segments of 6 words or less
#         segmented_sentences = []
#         for sentence in sentences:
#             words = sentence.split()
#             while words:
#                 segment = " ".join(words[:6])
#                 segmented_sentences.append(segment)
#                 words = words[6:]

#         sentences = segmented_sentences

#     if len(sentences) == 0:
#         return jsonify({"error": "Please type at least 6 words"})

#     return sentences


# @app.route('/data', methods=['POST'])
# def get_data():
#     nlp_loaded = spacy.load('NER_model')
#     try:
#         request_data = request.get_json()
#         user_input = request_data['userText']

#         dic = {
#             "flow": []
#         }
#         #1. Split user_input into sentences
#         sentences = split_text_into_sentences(user_input)
        
#         #2. Look over each sentence to see if ['DOC', 'MED', 'DIAG', 'TEST', 'TREAT', 'SYM', 'TIME'], append to dic['flow']
#         main_NERs = ['DOC', 'MED', 'DIAG', 'TEST', 'TREAT', 'SYM', 'TIME', 'SOUND', 'BOD']
#         words_collected = []
#         for s in sentences:
#             doc = nlp_loaded(s)
#             for entities in doc.ents:
#                 if entities.label_ in main_NERs:
#                     if entities.text not in words_collected:
#                         dic['flow'].append(s)
#                         words_collected.append(entities.text)
#                     break

#         return jsonify(dic)
#     except Exception as e:
#         return jsonify({"error": str(e)})

def encoder(name):
    if (name!= None):
        return 1
    else:
        return 0

@app.route('/process_data', methods=['POST'])
def process_data():
    # severity = request.form.get('severity')
    # clinical = request.form.get('checkAll1')
    # audiological = request.form.get('checkAll2')
    # pulsatile = request.form.get('doYou')


    # print(severity,clinical,audiological,pulsatile,symptoms)

    model = joblib.load('next_step.pkl')

    #List of features and order from python notebook
# 'hearing_loss', 'paroxysmal', 'arterial', 'venous', 'vertigo',
#        'headache', 'psychiatric', 'sensory_neural', 'otoscopy', 'cranio_exam',
#        'auscultations', 'tympanometry', 'tinnitus_type_Non-Pulsatile',
#        'tinnitus_type_Pulsatile', 'severity_Mild', 'severity_Moderate',
#        'severity_Severe'

    hearing_loss = request.form.get('hearing_loss')
    hearing_loss = encoder(hearing_loss)

    paroxysmal = request.form.get('paroxysmal')
    paroxysmal = encoder(paroxysmal)

    tinnitus_type = request.form.get('doYou')

    arterial = 0
    venous = 1

    vertigo = request.form.get('vertigo')
    vertigo = encoder(vertigo)

    headache = request.form.get('headache')
    headache = encoder(headache)

    psychiatric = request.form.get('psychiatric')
    psychiatric = encoder(psychiatric)

    sensory_neural = request.form.get('sensory_neural')
    sensory_neural = encoder(sensory_neural)

    severity = request.form.get('severity')

    otoscopy = request.form.get('otoscopy')
    otoscopy = encoder(otoscopy)

    cranio_exam = request.form.get('cranio_exam')
    cranio_exam = encoder(cranio_exam)

    auscultation = request.form.get('auscultation')
    auscultation = encoder(auscultation)

    tympanometry = request.form.get('tympanometry')
    tympanometry = encoder(tympanometry)

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
    # Add other "Next Steps" as keys and their corresponding possible causes as lists.
    }

    # print(model)
    # print(features)
    nextstep = model.predict([features])
    causes = next_steps_to_causes[nextstep[0]]
    return render_template('result.html', nextstep=nextstep[0], causes=causes)

if __name__ == '__main__':
    app.run(host='localhost', port=5500)
