from django.urls import path
from .views import ResearchArticle, TopicToKeywords

urlpatterns = [
    path('', ResearchArticle.as_view(), name='all_articles'),
    path('keywords/', TopicToKeywords.as_view(), name='all_keywords'),
]