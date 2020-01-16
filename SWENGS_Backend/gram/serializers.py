from rest_framework import serializers
from .models import Media, Activity, Profile, Post, Comment


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
        model = Post
        fields = '__all__'


class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class ProfileFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class ProfileListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 'username', 'greenscore']


class ProfilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'username']


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = '__all__'





