from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from gram.models import Profile


class ProfileCreationForm(UserCreationForm):

    class Meta:
        model = Profile
        fields = ('username', 'email')


class ProfileChangeForm(UserChangeForm):

    class Meta:
        model = Profile
        fields = ('username', 'email')
