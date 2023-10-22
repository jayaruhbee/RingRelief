from rest_framework import serializers
from .models import Portal
from user_app.serializers import UserSerializer

class PortalSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Portal
        fields = ['id', 'user', 'flowchart', 'tfi_score', 'next_step']
