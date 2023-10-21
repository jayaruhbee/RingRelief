from django.urls import path
from .views import Tfi_Scores

urlpatterns = [
    path('add_score/', Tfi_Scores.as_view(), name='add_tfi_score'),
    
    ]