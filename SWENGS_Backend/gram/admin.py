from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from .models import *
from .forms import *


class ProfileAdmin(UserAdmin):
    add_form = ProfileCreationForm
    form = ProfileChangeForm
    model = Profile
    list_display = ['email', 'username', ]


class PostsAdmin(admin.ModelAdmin): pass


class CommentsAdmin(admin.ModelAdmin): pass


class ActivityAdmin(admin.ModelAdmin): pass

class LikedByUserAdmin(admin.ModelAdmin): pass

class MediaAdmin(admin.ModelAdmin): pass


admin.site.register(Profile, ProfileAdmin)
admin.site.register(Post, PostsAdmin)
admin.site.register(Comment, CommentsAdmin)
admin.site.register(Activity, ActivityAdmin)
admin.site.register(LikedByUser, LikedByUserAdmin)
admin.site.register(Media, MediaAdmin)
