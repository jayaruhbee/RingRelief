from django.db import models
from django.contrib.postgres.fields import ArrayField


class ResearchArticle(models.Model):
    title = models.TextField(blank=True, null=True)
    authors = models.TextField(blank=True, null=True)
    author_affiliations = models.TextField(blank=True, null=True)
    publication_title = models.TextField(blank=True, null=True)
    publication_year = models.IntegerField(blank=True, null=True)
    ai_abstract_summary = models.TextField(blank=True, null=True)
    author_keywords = models.TextField(blank=True, null=True)
    ai_keywords = ArrayField(models.TextField(blank=True, null=True))
    topic_numbers = ArrayField(models.IntegerField(blank=True, null=True))
    link = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'research_articles'
        
class TopicToKeywords(models.Model):
    topic_number = models.IntegerField(primary_key=True)
    ai_keywords = ArrayField(models.TextField(blank=True, null=True))


    class Meta:
        managed = False
        db_table = 'topic_to_keywords'    