from django.apps import AppConfig


class UserProfileConfig(AppConfig):
    name = 'user_profile'

    def ready(self):
        from .signals import save_profile