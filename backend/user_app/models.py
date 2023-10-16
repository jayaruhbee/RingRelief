from django.db import models

class User(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, unique=True)
    passage_id = models.CharField(max_length=32, unique=True)
    specialist = models.BooleanField(default=False)
    interests = models.TextField(blank=True, null=True)


    def __str__(self):
        return self.username
