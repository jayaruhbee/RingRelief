from django.urls import path
from .views import ResearchArticles, TopicToKeyword, FilteredArticles, KeywordsSet

urlpatterns = [
    path('', ResearchArticles.as_view(), name='all_articles'),
    path('filter/<str:keyword>/', FilteredArticles.as_view(), name='filtered_articles'),
    path('keywords/', TopicToKeyword.as_view(), name='all_keywords'),
    path('keyword_set/', KeywordsSet.as_view(), name='set_keywords'),
]