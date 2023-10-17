from django.shortcuts import render
from rest_framework.generics import ListAPIView
from .serializers import ResearchArticleSerializer, TopicToKeywordsSerializer
from .models import ResearchArticle, TopicToKeywords


class ResearchArticle(ListAPIView):
    queryset = ResearchArticle.objects.all()
    serializer_class = ResearchArticleSerializer
    
class TopicToKeywords(ListAPIView):
    queryset = TopicToKeywords.objects.all()
    serializer_class = TopicToKeywordsSerializer
