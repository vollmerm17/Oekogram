from rest_framework import serializers
from friendship.models import *
from gram.models import Media, Activity, Profile, Post, Comment, LikedByUser, Email


# Activities
class ActivityOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['id', 'name', 'shortcut', 'greenscore']


class ActivityFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'


# Posts
class PostsSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    activityName = serializers.SerializerMethodField()
    user_picture = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'name', 'content', 'pictures', 'likes',  'activity', 'activityName', 'date', 'pictures', 'user_id', 'user_picture']

    def get_name(self, obj):
        return obj.user_id.username

    def get_activityName(self, obj):
       return obj.activity.name

    def get_user_picture(self, obj):
        list_media = obj.user_id.pictures.all()
        list_of_id = []
        for media in list_media:
            list_of_id.append(media.id)
        return list_of_id

class WritePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'user_id', 'content', 'pictures', 'activity', 'date']


# Comments
class CommentsSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    picture = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'content', 'posts_id', 'user_id', 'date', 'name', 'picture']

    def get_name(self, obj):
        return obj.user_id.username

    def get_picture(self, obj):
        list_media = obj.user_id.pictures.all()
        list_of_id = []
        for media in list_media:
            list_of_id.append(media.id)
        return list_of_id


# Profile
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'first_name', 'last_name', 'username', 'greenscore', 'email', 'bio', 'date_of_birth',
                  'pictures', ]


class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'first_name', 'last_name', 'email', 'bio', 'date_of_birth', 'pictures', 'greenscore']


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
        fields = ['id', 'first_name', 'last_name', 'username', 'greenscore', 'pictures']


class ProfileUsernameEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['username', 'email']


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = '__all__'


class FriendshipRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendshipRequest
        fields = '__all__'


class LikedByUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikedByUser
        fields = '__all__'


class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = ['subject', 'recipient', 'body']
