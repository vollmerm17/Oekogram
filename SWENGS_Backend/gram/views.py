from django.contrib.auth.decorators import permission_required
from django.core import serializers
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.core.mail import send_mail
from django.http import HttpResponse
from drf_yasg.utils import swagger_auto_schema
from friendship.exceptions import AlreadyExistsError
from friendship.models import Friend, FriendshipRequest, BlockManager, FriendshipManager
from rest_framework import views
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework.response import Response

from gram.models import Activity, Post, Comment, Media, Profile, LikedByUser
from gram.serializers import MediaSerializer, ActivityOptionSerializer, ProfileListSerializer, ProfileFormSerializer, \
    ActivityFormSerializer, PostsSerializer, CommentsSerializer, ProfileSerializer, LikedByUserSerializer, \
    EmailSerializer, ProfileUpdateSerializer, WritePostSerializer


# ACTIVITY
@swagger_auto_schema(method='GET', responses={200: ActivityOptionSerializer(many=True)})
@api_view(['GET'])
def activity_option_list(request):
    countries = Activity.objects.all()
    serializer = ActivityOptionSerializer(countries, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: ActivityFormSerializer()})
@api_view(['GET'])
def activity_form_get(request, pk):
    try:
        activity = Activity.objects.get(pk=pk)
    except Activity.DoesNotExist:
        return Response({'error': 'Activity does not exist.'}, status=404)

    serializer = ActivityFormSerializer(activity)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=ActivityFormSerializer, responses={200: ActivityFormSerializer()})
@api_view(['POST'])
def activity_form_create(request):
    data = JSONParser().parse(request)
    serializer = ActivityFormSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=ActivityFormSerializer, responses={200: ActivityFormSerializer()})
@api_view(['PUT'])
def activity_form_update(request, pk):
    try:
        activity = Activity.objects.get(pk=pk)
    except Activity.DoesNotExist:
        return Response({'error': 'Activity does not exist.'}, status=404)

    data = JSONParser().parse(request)
    serializer = ActivityFormSerializer(activity, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
def activity_delete(request, pk):
    try:
        activity = Activity.objects.get(pk=pk)
    except Activity.DoesNotExist:
        return Response({'error': 'Activity does not exist.'}, status=404)
    activity.delete()
    return Response(status=204)


# POST
@swagger_auto_schema(method='GET', responses={200: PostsSerializer(many=True)})
@api_view(['GET'])
def posts_get_all(request):
    try:
        posts = Post.objects.all()
    except Post.DoesNotExist:
        return Response({'error': 'Post does not exist.'}, status=404)

    serializer = PostsSerializer(posts, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: PostsSerializer(many=True)})
@api_view(['GET'])
def posts_get_by_user(request, user_id):
    try:
        posts = Post.objects.get(user_id=user_id)
    except Post.DoesNotExist:
        return Response({'error': 'Post does not exist.'}, status=404)

    serializer = PostsSerializer(posts, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: PostsSerializer()})
@api_view(['GET'])
def posts_get_by_id(request, pk):
    try:
        posts = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return Response({'error': 'Post does not exist.'}, status=404)

    serializer = PostsSerializer(posts)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=WritePostSerializer, responses={200: WritePostSerializer()})
@api_view(['POST'])
def post_form_create(request):
    data = JSONParser().parse(request)
    serializer = WritePostSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=PostsSerializer, responses={200: PostsSerializer()})
@api_view(['PUT'])
@permission_required('gram.update_post', raise_exception=True)
def post_update(request,pk):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response({'error': 'Post does not exist.'}, status=404)

        data = JSONParser().parse(request)
        serializer = PostsSerializer(post, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


@api_view(['DELETE'])
def post_delete(request, pk):
    try:
        post = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return Response({'error': 'Post does not exist.'}, status=404)
    post.delete()
    return Response(status=204)


# LIKE
@swagger_auto_schema(method='GET', responses={200: LikedByUserSerializer(many=True)})
@api_view(['GET'])
def like_form_get(request, user_id):
    try:
        like = LikedByUser.objects.all().filter(user_id=user_id)
    except LikedByUser.DoesNotExist:
        return Response({'error': 'Like does not exist.'}, status=404)

    serializer = LikedByUserSerializer(like, many=True)
    return Response(serializer.data, status=200)


@swagger_auto_schema(method='POST', request_body=LikedByUserSerializer, responses={200: LikedByUserSerializer()})
@api_view(['POST'])
@permission_required('gram.add_like', raise_exception=True)
def like_form_create(request):
    data = JSONParser().parse(request)
    serializer = LikedByUserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
@permission_required('gram.like_delete', raise_exception=True)
def like_delete(request, postId, userId):
    try:
        like = LikedByUser.objects.get(post_id=postId, user_id=userId)
    except LikedByUser.DoesNotExist:
        return Response({'error': 'Like does not exist.'}, status=404)
    like.delete()
    return Response(status=204)


# COMMENT
@swagger_auto_schema(method='GET', responses={200: CommentsSerializer(many=True)})
@api_view(['GET'])
def comment_form_get(request, post_id):
    try:
        comment = Comment.objects.all().filter(posts_id=post_id)
    except Comment.DoesNotExist:
        return Response({'error': 'Comment does not exist.'}, status=404)

    serializer = CommentsSerializer(comment, many=True)
    return Response(serializer.data, status=200)


@swagger_auto_schema(method='POST', request_body=CommentsSerializer, responses={200: CommentsSerializer()})
@api_view(['POST'])
@permission_required('gram.add_comment', raise_exception=True)
def comment_form_create(request):
    data = JSONParser().parse(request)
    serializer = CommentsSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
def comment_delete(request, pk):
    try:
        comment = Comment.objects.get(pk=pk)
    except Comment.DoesNotExist:
        return Response({'error': 'Comment does not exist.'}, status=404)
    comment.delete()
    return Response(status=204)


# PROFILE
@swagger_auto_schema(method='GET', responses={200: ProfileListSerializer(many=True)})
@api_view(['GET'])
def profile_list(request):
    users = Profile.objects.all()
    serializer = ProfileListSerializer(users, many=True)
    return Response(serializer.data, status=200)


@swagger_auto_schema(method='GET', responses={200: ProfileSerializer()})
@api_view(['GET'])
def profile_get(request, pk):
    users = Profile.objects.get(pk=pk)
    serializer = ProfileSerializer(users)
    return Response(serializer.data, status=200)


@swagger_auto_schema(method='POST', request_body=ProfileFormSerializer, responses={200: ProfileFormSerializer()})
@api_view(['POST'])
def profile_form_create(request):
    data = JSONParser().parse(request)
    serializer = ProfileFormSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=ProfileUpdateSerializer, responses={200: ProfileUpdateSerializer()})
@api_view(['PUT'])
def profile_form_update(request, pk):
    try:
        profile = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response({'error': 'Profile does not exist.'}, status=404)

    data = JSONParser().parse(request)
    serializer = ProfileUpdateSerializer(profile, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
def profile_delete(request, pk):
    try:
        profile = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response({'error': 'Profile does not exist.'}, status=404)
    profile.delete()
    return Response(status=204)


# FRIENDSHIP
@swagger_auto_schema(method='GET', responses={200})
@api_view(['GET'])
def friendships_get(request):
    friends = Friend.objects.friends(user=request.user)
    serialized_qs = serializers.serialize('json', friends, fields=('id', 'username'))
    return Response(serialized_qs, status=200)


@swagger_auto_schema(method='GET', responses={200})
@api_view(['GET'])
def friendships_get_unread_requests(request):
    friends = Friend.objects.unread_requests(user=request.user)
    serialized_qs = serializers.serialize('json', friends)
    return Response(serialized_qs, status=200)


@swagger_auto_schema(method='GET', responses={200})
@api_view(['GET'])
def friendships_get_requests(request):
    friends = Friend.objects.requests(request.user)
    serialized_qs = serializers.serialize('json', friends, fields=('id', 'username'))
    return Response(serialized_qs, status=200)


@swagger_auto_schema(method='GET', responses={200})
@api_view(['GET'])
def friendships_count_unrejected_requests(request):
    count = Friend.objects.unrejected_request_count(request.user)
    return Response(count, status=200)


@swagger_auto_schema(method='POST', responses={200})
@api_view(['POST'])
def friendship_request(request, username):
    other_user = Profile.objects.get(username=username)
    try:
        Friend.objects.add_friend(
            request.user,
            other_user,
            message="Hi! I would like to be your friend"
        )
    except AlreadyExistsError:
        return Response({'error': 'Friend request already exist.'}, status=400)

    else:
        return Response(status=201)


@swagger_auto_schema(method='POST', responses={200})
@api_view(['POST'])
def friendship_accept(request, pk):
    try:
        friend_request = FriendshipRequest.objects.get(to_user=pk)
        friend_request.accept()

    except FriendshipRequest.DoesNotExist:
        return Response({'error': 'No request is here to accept'}, status=400)

    else:
        return Response(status=200)


@swagger_auto_schema(method='POST', responses={200})
@api_view(['POST'])
@permission_required('gram.reject_friendship', raise_exception=True)
def friendship_reject(request, pk):
    try:
        friend_request = FriendshipRequest.objects.get(to_user=pk)
        friend_request.reject()
    except FriendshipRequest.DoesNotExist:
        return Response({'error': 'No request is here to reject'}, status=400)

    else:
        return Response(status=200)


@api_view(['DELETE'])
def friendship_delete(request, pk):
    try:
        other_user = Profile.objects.get(pk=pk)
        friend_remove = Friend.objects.remove_friend(request.user, other_user)

    except Friend.DoesNotExist:
        return Response({'error': 'Friend does not exist.'}, status=400)
    else:
        return Response(friend_remove, status=204)


# BLOCK
@swagger_auto_schema(method='POST', responses={200})
@api_view(['POST'])
def block_add(request, username):
    other_user = Profile.objects.get(username=username)
    try:
        BlockManager.objects.add_block(
            request.user,
            other_user
        )
    except AlreadyExistsError:
        return Response({'error': 'Is already blocked'}, status=400)

    else:
        return Response(status=201)


@swagger_auto_schema(method='GET', responses={200})
@api_view(['GET'])
def blocked_get(request):
    blocked = BlockManager.objects.blocked
    serialized_qs = serializers.serialize('json', blocked, fields=('id', 'username'))
    return Response(serialized_qs, status=200)


@api_view(['DELETE'])
def blocked_delete(request, pk):
    try:
        other_user = Profile.objects.get(pk=pk)
        BlockManager.objects.remove_block(
            request.user,
            other_user)

    except Friend.DoesNotExist:
        return Response({'error': 'Friend does not exist.'}, status=400)
    else:
        return Response(status=204)


# MEDIA
class FileUploadView(views.APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, format=None):
        file = request.FILES['file']
        file_input = {
            'original_file_name': file.name,
            'content_type': file.content_type,
            'size': file.size,
        }
        serializer = MediaSerializer(data=file_input)
        if serializer.is_valid():
            serializer.save()
            default_storage.save('media/' + str(serializer.data['id']), ContentFile(file.read()))
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


def media_download(request, pk):
    media = Media.objects.get(pk=pk)
    data = default_storage.open('media/' + str(pk)).read()
    content_type = media.content_type
    response = HttpResponse(data, content_type=content_type)
    original_file_name = media.original_file_name
    response['Content-Disposition'] = 'inline; filename=' + original_file_name
    return response


@swagger_auto_schema(method='GET', responses={200: MediaSerializer()})
@api_view(['GET'])
def media_get(request, pk):
    try:
        media = Media.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response({'error': 'Profile does not exist.'}, status=404)

    serializer = MediaSerializer(media)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=EmailSerializer, responses={200: EmailSerializer()})
@api_view(['POST'])
# @permission_required('gram.add_comment', raise_exception=True)
def send_mail_request(request):
    data = JSONParser().parse(request)
    serializer = EmailSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        mail = serializer.initial_data

        send_mail(
            mail['subject'],
            mail['body'],
            'FHJoanneum_IMA@ifb.co.at',
            [mail['recipient']],
            fail_silently=False,
        )

        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
