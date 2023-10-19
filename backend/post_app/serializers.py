from rest_framework import serializers
from .models import Post, Comment
from user_app.serializers import UserSerializer

class CommentSerializer(serializers.ModelSerializer):
    commenter = UserSerializer()
    class Meta:
        model = Comment
        fields = ['id', 'commenter', 'post', 'text', 'created_at']

class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer()  
    comments = CommentSerializer(many=True)

    class Meta:
        model = Post
        fields = ['id', 'content', 'author', 'created_at', 'comments']
