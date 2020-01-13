from rest_framework import serializers

from .models import Media, Activity, Posts, Comments, Profile


class ActivityOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['id', 'name', 'shortcut', 'greenscore']


class ActivityFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'


class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = '__all__'


class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'


class ProfileFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class ProfileListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 'username', 'greenscore', 'password']


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = '__all__'



