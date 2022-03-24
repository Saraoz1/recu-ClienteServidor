from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfileModel(models.Model):
    id_user = models.OneToOneField(User, on_delete=models.CASCADE, null=False, blank=False)
    url_img = models.ImageField(null=True, blank=True, default='', upload_to='img-userProfile/')

    class Meta:
        db_table: 'profile'