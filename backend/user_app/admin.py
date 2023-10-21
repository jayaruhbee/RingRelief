from django.contrib import admin
from post_app.models import Post, Comment
from user_app.models import User
from portal_app.models import Portal

admin.site.register([Post, Comment, User, Portal])