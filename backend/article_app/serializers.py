from rest_framework import serializers
from .models import ResearchArticle, TopicToKeywords

class ResearchArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchArticle
        fields = '__all__'

class TopicToKeywordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopicToKeywords
        fields = '__all__'

