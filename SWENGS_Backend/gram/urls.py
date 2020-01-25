from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework_jwt.views import obtain_jwt_token

from . import views
from .views import FileUploadView

schema_view = get_schema_view(
    openapi.Info(
        title='API',
        default_version='v1'
    ),
)

urlpatterns = [
    url(r'^api-token-auth/', obtain_jwt_token),
    #url(r'^friendship/', include('friendship.urls')),
    path('admin/', admin.site.urls),

    # ACTIVITY
    path('activity/options', views.activity_option_list),
    path('activity/<int:pk>/get', views.activity_form_get),
    path('activity/create', views.activity_form_create),
    path('activity/<int:pk>/update', views.activity_form_update),
    path('activity/<int:pk>/delete', views.activity_delete),

    # POST
    path('post/get', views.posts_get_all),
    path('post/<int:user_id>/get', views.posts_get_by_user),
    path('posts/<int:pk>/get', views.posts_get_by_id),
    path('post/create', views.post_form_create),
    path('post/<int:pk>/update', views.post_update),
    path('post/<int:pk>/delete', views.post_delete),

    # COMMENT
    path('comment/<int:post_id>/get', views.comment_form_get),
    path('comment/create', views.comment_form_create),
    path('comment/<int:pk>/delete', views.comment_delete),

    # PROFILE
    path('profile/list', views.profile_list),
    path('profile/<int:pk>/get', views.profile_get),
    path('profile/create', views.profile_form_create),
    path('profile/<int:pk>/update', views.profile_form_update),
    path('profile/<int:pk>/delete', views.profile_delete),

    # FOLLOW
    path('followers/get', views.followers_get),
    path('follows/get', views.follows_get),
    path('followers/<int:pk>/get', views.followers_of_user_get),
    path('follows/<int:pk>/get', views.follows_of_user_get),
    path('follow/<int:pk>/delete', views.follow_delete),
    path('follow/<int:pk>/add', views.follow_add),

    # BLOCKED
    path('blocked/get', views.blocked_get),
    path('blocking/get', views.blocking_get),
    path('blocked/<int:pk>/delete', views.blocked_delete),
    path('blocked/<int:pk>/add', views.block_add),

    # E-MAIL
    path('email/send', views.send_mail_request),

    # LIKE
    path('like/<int:user_id>/get', views.like_form_get),
    path('like/create', views.like_form_create),
    path('like/<int:userId>/<int:postId>/delete', views.like_delete),


    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    url(r'^media$', FileUploadView.as_view()),
    path('media/<int:pk>', views.media_download),
    path('media/<int:pk>/get', views.media_get),
]
