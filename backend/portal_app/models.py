from django.db import models
from user_app.models import User

# Create your models here.
class Portal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    flowchart = models.TextField(blank=True, null=True)
    tfi_score = models.IntegerField(blank=True, null=True)
    next_step = models.CharField(blank=True, null=True)
