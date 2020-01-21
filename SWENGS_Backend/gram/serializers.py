from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from friendship.models import *
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
    name = serializers.SerializerMethodField()
    activity = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'name', 'content', 'pictures', 'likes', 'activity', 'date']

    def get_name(self, obj):
        return obj.user_id.username

    def get_activity(self, obj):
        return obj.activity.name


class CommentsSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'content', 'posts_id', 'user_id', 'date', 'name']

    def get_name(self, obj):
        return obj.user_id.username


class ProfileFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

    def create(self, validated_data):
        user = super(ProfileFormSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class ProfileListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 'username', 'greenscore']


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 'username', 'greenscore', 'bio', 'date_of_birth', 'pictures']


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = '__all__'


class FriendshipRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendshipRequest
        fields = '__all__'
