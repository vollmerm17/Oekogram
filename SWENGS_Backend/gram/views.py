from django.contrib.auth.decorators import permission_required
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.http import HttpResponse
from drf_yasg.utils import swagger_auto_schema
from rest_framework import views
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework.response import Response
from friendship.models import Friend, Block, FriendshipRequest

from gram.models import Activity, Posts, Comments, Media, Profile
from gram.serializers import MediaSerializer, ActivityOptionSerializer, ProfileListSerializer, ProfileFormSerializer, \
    ActivityFormSerializer, PostsSerializer, CommentsSerializer


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
@permission_required('gram.add_activity', raise_exception=True)
def activity_form_create(request):
    data = JSONParser().parse(request)
    serializer = ActivityFormSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=ActivityFormSerializer, responses={200: ActivityFormSerializer()})
@api_view(['PUT'])
@permission_required('gram.change_activity', raise_exception=True)
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
@permission_required('gram.delete_activity', raise_exception=True)
def activity_delete(request, pk):
    try:
        activity = Activity.objects.get(pk=pk)
    except Activity.DoesNotExist:
        return Response({'error': 'Activity does not exist.'}, status=404)
    activity.delete()
    return Response(status=204)


@swagger_auto_schema(method='GET', responses={200: PostsSerializer(many=True)})
@api_view(['GET'])
def posts_get_all(request):
    try:
        posts = Posts.objects.all()
    except Posts.DoesNotExist:
        return Response({'error': 'Post does not exist.'}, status=404)

    serializer = PostsSerializer(posts, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: PostsSerializer(many=True)})
@api_view(['GET'])
def posts_get_by_user(request, user_id):
    try:
        posts = Posts.objects.get(user_id=user_id)
    except Posts.DoesNotExist:
        return Response({'error': 'Post does not exist.'}, status=404)

    serializer = PostsSerializer(posts, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=PostsSerializer, responses={200: PostsSerializer()})
@api_view(['POST'])
@permission_required('gram.add_post', raise_exception=True)
def post_form_create(request):
    data = JSONParser().parse(request)
    serializer = PostsSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
@permission_required('gram.delete_post', raise_exception=True)
def post_delete(request, pk):
    try:
        post = Posts.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response({'error': 'Post does not exist.'}, status=404)
    post.delete()
    return Response(status=204)


@swagger_auto_schema(method='GET', responses={200: CommentsSerializer()})
@api_view(['GET'])
def comment_form_get(request, post_id):
    try:
        comment = Comments.objects.get(post_id=post_id)
    except Activity.DoesNotExist:
        return Response({'error': 'Comment does not exist.'}, status=404)

    serializer = CommentsSerializer(comment)
    return Response(serializer.data)


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
@permission_required('gram.delete_comment', raise_exception=True)
def comment_delete(request, pk):
    try:
        comment = Comments.objects.get(pk=pk)
    except Comments.DoesNotExist:
        return Response({'error': 'Comment does not exist.'}, status=404)
    comment.delete()
    return Response(status=204)


@swagger_auto_schema(method='GET', responses={200: ProfileListSerializer(many=True)})
@api_view(['GET'])
@permission_required('gram.view_user', raise_exception=True)
def profile_list(request):
    users = Profile.objects.all()
    serializer = ProfileListSerializer(users, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: ProfileFormSerializer()})
@api_view(['GET'])
@permission_required('gram.view_profile', raise_exception=True)
def profile_form_get(request, pk):
    try:
        profile = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response({'error': 'Profile does not exist.'}, status=404)

    serializer = ProfileFormSerializer(profile)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=ProfileFormSerializer, responses={200: ProfileFormSerializer()})
@api_view(['POST'])
@permission_required('gram.add_profile', raise_exception=True)
def profile_form_create(request):
    data = JSONParser().parse(request)
    serializer = ProfileFormSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=ProfileFormSerializer, responses={200: ProfileFormSerializer()})
@api_view(['PUT'])
@permission_required('gram.change_profile', raise_exception=True)
def profile_form_update(request, pk):
    try:
        profile = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response({'error': 'Profile does not exist.'}, status=404)

    data = JSONParser().parse(request)
    serializer = ProfileFormSerializer(profile, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
@permission_required('gram.delete_profile', raise_exception=True)
def profile_delete(request, pk):
    try:
        profile = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response({'error': 'Profile does not exist.'}, status=404)
    profile.delete()
    return Response(status=204)


@swagger_auto_schema(method='GET', responses={200})
@api_view(['GET'])
@permission_required('gram.view_friendship', raise_exception=True)
def friendships_get(request):
    friends = Friend.objects.friends(request.user)
    return Response(friends, status=200)


@swagger_auto_schema(method='GET', responses={200})
@api_view(['GET'])
@permission_required('gram.view_friendship', raise_exception=True)
def friendships_get_unread_requests(request):
    friends = Friend.objects.unread_requests(user=request.user)
    return Response(friends)


@swagger_auto_schema(method='GET', responses={200})
@api_view(['GET'])
@permission_required('gram.view_friendship', raise_exception=True)
def friendships_get_unread_requests(request):
    friends = Friend.objects.unread_requests(user=request.user)
    return Response(friends)


@swagger_auto_schema(method='GET', responses={200})
@api_view(['GET'])
@permission_required('gram.view_friendship', raise_exception=True)
def friendships_get_unrejected_requests(request):
    friends = Friend.objects.unrejected_requests(request.user)
    return Response(friends)


@swagger_auto_schema(method='GET', responses={200})
@api_view(['GET'])
@permission_required('gram.view_friendship', raise_exception=True)
def friendships_count_unrejected_requests(request):
    friends = Friend.objects.unrejected_requests_count(request.user)
    return Response(friends, status=201)


@swagger_auto_schema(method='POST', responses={200})
@api_view(['POST'])
@permission_required('gram.request_friendship', raise_exception=True)
def friendship_request(request, pk):
    other_user = Profile.objects.get(pk=pk)
    data = Friend.objects.add_friend(
        request.user,
        other_user,
        message="Hi! I would like to be your friend"
    )
    return Response(data, status=201)


@swagger_auto_schema(method='PUT', responses={200})
@api_view(['PUT'])
@permission_required('gram.accept_friendship', raise_exception=True)
def friendship_accept(request, pk):
    friend_request = FriendshipRequest.objects.get(to_user=pk)
    friend_request.accept()
    return Response(status=200)


@api_view(['DELETE'])
@permission_required('gram.delete_friendship', raise_exception=True)
def friendship_delete(request, pk):
    other_user = Profile.objects.get(pk=pk)
    friend_remove = Friend.objects.remove_friend(request.user, other_user)
    return Response(friend_remove, status=204)


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

# Eig. auch noch für Bild bei comments
@swagger_auto_schema(method='GET', responses={200: MediaSerializer()})
@api_view(['GET'])
def media_get(request, pk):
    try:
        media = Media.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response({'error': 'Profile does not exist.'}, status=404)

    serializer = MediaSerializer(media)
    return Response(serializer.data)




