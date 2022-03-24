from rest_framework import routers, serializers

#importación de models
from userProfile.models import UserProfileModel

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfileModel
        fields = ('__all__')