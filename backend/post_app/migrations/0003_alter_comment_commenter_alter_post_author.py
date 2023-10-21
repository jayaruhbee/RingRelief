# Generated by Django 4.2.4 on 2023-10-21 00:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0002_user_interests'),
        ('post_app', '0002_rename_user_comment_commenter_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='commenter',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user_app.user'),
        ),
        migrations.AlterField(
            model_name='post',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user_app.user'),
        ),
    ]
