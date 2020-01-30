from datetime import datetime
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import PositiveIntegerField
from django.utils import timezone


class Activity(models.Model):
    id = models.PositiveIntegerField (primary_key=True)
    name = models.TextField()
    description = models.TextField()
    shortcut = models.CharField(max_length=3)
    greenscore = PositiveIntegerField()

    class Meta:
        verbose_name_plural = "Activities"

    def __str__(self):
        return self.name


class Media(models.Model):
    original_file_name = models.TextField()
    content_type = models.TextField()
    size = models.PositiveIntegerField()


class Profile(AbstractUser):
    first_name = models.TextField()
    last_name = models.TextField()
    username = models.TextField(unique=True)
    password = models.TextField()
    bio = models.TextField(blank=True)
    date_of_birth = models.DateField(null=True)
    greenscore = models.PositiveIntegerField(default=0, editable=True)
    pictures = models.ManyToManyField('Media', blank=True)

    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username


class Post(models.Model):
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    content = models.TextField()
    pictures = models.ManyToManyField('Media', blank=True)
    likes = models.PositiveIntegerField(default=0)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now, blank=True)


class Comment(models.Model):
    content = models.TextField()
    posts_id = models.ForeignKey(Post, on_delete=models.CASCADE)
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now, blank=True)


class LikedByUser(models.Model):
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE)
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    liked = models.BooleanField()


class Email(models.Model):
    subject = models.TextField()
    recipient = models.TextField()
    body = models.TextField()

    def __str__(self):
        return self.subject + ' | ' + self.recipient
