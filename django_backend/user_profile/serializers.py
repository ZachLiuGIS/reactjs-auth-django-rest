from rest_framework import serializers
from rest_auth.serializers import UserDetailsSerializer


class UserSerializer(UserDetailsSerializer):

    website = serializers.URLField(source="userprofile.website", allow_blank=True, required=False)
    about = serializers.CharField(source="userprofile.about", allow_blank=True, required=False)

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('website', 'about')

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('userprofile', {})
        website = profile_data.get('website')
        about = profile_data.get('about')

        instance = super(UserSerializer, self).update(instance, validated_data)

        # get and update user profile
        profile = instance.userprofile
        if profile_data:
            if website:
                profile.website = website
            if about:
                profile.about = about
            profile.save()
        return instance
