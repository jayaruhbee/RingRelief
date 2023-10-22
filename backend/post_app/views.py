from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PostSerializer, CommentSerializer
from user_app.serializers import UserSerializer
from .models import Post, Comment
from rest_framework import status
from user_app.models import User

def get_user_id_by_passage_id(self, passage_id):
    user = User.objects.filter(passage_id=passage_id).first()
    if user:
        return user.id
    return None

class Posts(APIView):
    # THIS RETURNS ALL POSTS. DONE
    def get(self, request):
        all_posts = Post.objects.all()
        return Response(PostSerializer(all_posts, many=True).data,
                        status=status.HTTP_200_OK)
        
    # THIS CREATES NEW POST. DONE
    def post(self, request):
        passage_id = request.data['author']['passage_id']
        
        user_in_db_with_passage_id = User.objects.filter(passage_id=passage_id).first()
        
        if user_in_db_with_passage_id:
            author_id = user_in_db_with_passage_id.id 
            content = request.data.get('content')

            new_post = Post(author_id=author_id, content=content) 
            new_post.save()

            return Response(PostSerializer(new_post).data, status=status.HTTP_201_CREATED)
        else:
            return Response("User not found", status=status.HTTP_404_NOT_FOUND)


    # THIS DELETES SELECTED POST. DONE
    def delete(self, request, post_id):
        post = get_object_or_404(Post, id = post_id)
        # print("post", post)
        post.delete()
        return Response("Post has been deleted", status = status.HTTP_204_NO_CONTENT)
    
    # THIS EDITS SPECIFIED POST
    ''' 
    TODO:
    '''
    def put(self, request,post_id):
        post_to_edit = get_object_or_404(Post, id = post_id)
        post_to_edit.content = request.data.get("content", post_to_edit.content)
        post_to_edit.save()
        
        serialized_post = PostSerializer(post_to_edit)
        
        return Response(serialized_post.data, status = status.HTTP_200_OK)
        
class Comments(APIView):
    def get_user_id_by_passage_id(self, passage_id):
        user = User.objects.filter(passage_id=passage_id).first()
        if user:
            return user.id
        return None
    # THIS WILL GET ALL COMMENTS RELATED TO A SPECIFIED POST. DONE
    def get(self, request, post_id):
        all_comments = Comment.objects.filter(post = post_id)
        return Response(CommentSerializer(all_comments, many = True).data, 
                        status = status.HTTP_200_OK)
        
    # THIS WILL ADD A COMMENT TO SELECTED POST
 
    def post(self, request, post_id):
        print("data", request.data)
        passage_id = request.data.get('commenter')
        print("passage id:", passage_id)
        # Use your custom method to get the user's ID
        user_id = self.get_user_id_by_passage_id(passage_id)
        print("user id", user_id)

        
        if user_id:
            commenter_id = user_id 
            text = request.data.get('text')

            new_comment = Comment(post_id=post_id, commenter_id=commenter_id, text=text) 
            new_comment.save()

            return Response(CommentSerializer(new_comment).data, status=status.HTTP_201_CREATED)
        else:
            return Response("User not found", status=status.HTTP_404_NOT_FOUND)

    # DELETE COMMENT FROM SPECIFIED POST
    
    def delete(self, request, comment_id):
        comment = get_object_or_404(Comment, id = comment_id)
        # print("id", comment_id)
        comment.delete()
        return Response("Comment has been deleted", status = status.HTTP_204_NO_CONTENT)
    
    # EDIT COMMENT ON POST

    def put(self, request, comment_id):
        comment_to_edit = get_object_or_404(Comment, id = comment_id)
        
        comment_to_edit.text = request.data.get('text', comment_to_edit.text)
        comment_to_edit.save()
        
        serialized_comment = CommentSerializer(comment_to_edit)
        return Response(serialized_comment.data, status = status.HTTP_200_OK)
        
            
            