# Generated by Django 4.2.4 on 2023-10-15 18:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='interests',
            field=models.TextField(blank=True, null=True),
        ),
    ]
