from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import PositiveIntegerField


class Activity(models.Model):
    name = models.TextField()
    description = models.TextField()
    shortcut = models.CharField(max_length=3)
    greenscrore = PositiveIntegerField()

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
    bio = models.TextField()
    date_of_birth = models.DateField(null=True)
    greenscore = models.PositiveIntegerField(default=0)
    pictures = models.ManyToManyField('Media', blank=True)

    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username


class Posts(models.Model):
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    content = models.TextField()
    pictures = models.ManyToManyField('Media', blank=True)
    likes = models.PositiveIntegerField()
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)


class Comments(models.Model):
    content = models.TextField()
    posts_id = models.ForeignKey(Posts, on_delete=models.CASCADE)
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE)




