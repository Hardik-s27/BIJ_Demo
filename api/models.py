from django.db import models

class UserProfile(models.Model):
    contact_info = models.CharField(max_length=255)
    password = models.CharField(max_length=255)