from django.contrib import admin
from post_app.models import Post, Comment

admin.site.register([Post, Comment])