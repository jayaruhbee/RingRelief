from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PostSerializer, CommentSerializer
from .models import Post, Comment
from rest_framework import status


class Posts(APIView):
    # THIS RETURNS ALL POSTS
    def get(self, request):
        all_posts = Post.objects.all()
        return Response(PostSerializer(all_posts, many=True).data,
                        status=status.HTTP_200_OK)
        
    # THIS CREATES NEW POST
    def post(self, request):
        serializer = PostSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user) 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    # THIS DELETES SELECTED POST
    def delete(self, request, post_id):
        post = get_object_or_404(Post, id = post_id)
        print("post", post)
        post.delete()
        return Response("Post has been deleted", status = status.HTTP_204_NO_CONTENT)
    
    # THIS EDITS SPECIFIED POST
    def put(self, request,post_id):
        post_to_edit = get_object_or_404(Post, id = post_id)
        post_to_edit.content = request.data.get("content", post_to_edit.content)
        post_to_edit.save()
        
        serialized_post = PostSerializer(post_to_edit)
        
        return Response(serialized_post.data, status = status.HTTP_200_OK)
        
class Comments(APIView):
    # THIS WILL GET ALL COMMENTS RELATED TO A SPECIFIED POST
    def get(self, request, post_id):
        all_comments = Comment.objects.filter(post = post_id)
        return Response(CommentSerializer(all_comments, many = True).data, 
                        status = status.HTTP_200_OK)
        
    # THIS WILL ADD A COMMENT TO SELECTED POST
    def post(self, request, post_id):
        comment = {"post" : post_id, "user" : request.user.id, **request.data}
        serialized_comment = CommentSerializer(data = comment)
       
        if serialized_comment.is_valid():
            serialized_comment.save(user=request.user) 
            return Response(serialized_comment.data, status = status.HTTP_201_CREATED)
        
    # DELETE COMMENT FROM SPECIFIED POST
    def delete(self, request, comment_id):
        comment = get_object_or_404(Comment, id = comment_id)
        comment.delete()
        return Response("Comment has been deleted", status = status.HTTP_204_NO_CONTENT)
    
    # EDIT COMMENT ON POST
    def put(self, request, comment_id):
        comment_to_edit = get_object_or_404(Comment, id = comment_id)
        
        comment_to_edit.text = request.data.get('text', comment_to_edit.text)
        comment_to_edit.save()
        
        serialized_comment = CommentSerializer(comment_to_edit)
        return Response(serialized_comment.data, status = status.HTTP_200_OK)
        
            
            