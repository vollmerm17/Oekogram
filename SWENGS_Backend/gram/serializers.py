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

    class Meta:
        model = Post
        fields = ['id', 'name', 'content', 'pictures', 'likes', 'activity', 'date']

    def get_name(self, obj):
        return obj.user_id.username


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


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = '__all__'


class FriendshipRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendshipRequest
        fields = '__all__'
