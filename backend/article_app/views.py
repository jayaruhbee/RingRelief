from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from django.db.models import Q
from .serializers import ResearchArticleSerializer, TopicToKeywordsSerializer
from .models import ResearchArticle, TopicToKeywords
from django.http import JsonResponse


class ResearchArticles(ListAPIView):
    queryset = ResearchArticle.objects.all()
    serializer_class = ResearchArticleSerializer

class FilteredArticles(APIView):
    def get(self, request, keyword):
        articles = ResearchArticle.objects.filter(
            Q(author_keywords__icontains=keyword) | Q(ai_keywords__contains=[keyword]))
        serializer = ResearchArticleSerializer(articles, many=True)
        return Response(serializer.data)

# RETURN ALL TOPIC NUMBERS AND KEYWORDS
class TopicToKeyword(ListAPIView):
    queryset = TopicToKeywords.objects.all()
    serializer_class = TopicToKeywordsSerializer
    
# RETURN KEYWORDS ONLY, NO REPEATS
class KeywordsSet(APIView):
    def get(self, request):
        keyword_data = TopicToKeywords.objects.all()
        all_keywords = [item.ai_keywords for item in keyword_data]
        keyword_set = list(set(keyword for sublist in all_keywords for keyword in sublist))

        return Response(keyword_set, status=HTTP_200_OK)


# def get_data(request):
#     try:
#         request_data = request.POST.get("userText")
#         print(request_data, "REQ DATAA")

#         jsonData = {
#             "flow": ["Started a year ago", "Gone to the ENT", "Struggle with the ringing"]
#         }
#         return JsonResponse(jsonData)
    
#     except Exception as e:
#         return JsonResponse({"error": e})

