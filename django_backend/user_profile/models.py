from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class UserProfile(models.Model):
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)
    # custom fields for user
    website = models.URLField(blank=True, null=True)
    about = models.CharField(max_length=255, blank=True, null=True)
