from django.urls import path
from .views import Posts, Comments

urlpatterns = [
    path('', Posts.as_view(), name='all_posts'),
    path('create/', Posts.as_view(), name='create_post'),
    path('delete/<int:post_id>/', Posts.as_view(), name='delete_post'),
    path('edit/<int:post_id>/', Posts.as_view(), name='edit_post'),
    path('comments/<int:post_id>/', Comments.as_view(), name='comments'),
    path('post_comment/<int:post_id>/', Comments.as_view(), name='post_comment'),
    path('delete_comment/<int:comment_id>/', Comments.as_view(), name='delete_comment'),
    path('edit_comment/<int:comment_id>/', Comments.as_view(), name='edit_comment'),
]
