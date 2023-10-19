from django.contrib import admin
from post_app.models import Post, Comment
from user_app.models import User

admin.site.register([Post, Comment, User])