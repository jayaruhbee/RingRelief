from django.urls import path
from .views import Tfi_Scores, get_data

urlpatterns = [
    path('add_score/', Tfi_Scores.as_view(), name='add_tfi_score'),
    path('get_data/', get_data, name='get_data'),
    ]