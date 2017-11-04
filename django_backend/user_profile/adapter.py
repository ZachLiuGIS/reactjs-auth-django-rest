from django.contrib.sites.shortcuts import get_current_site
from allauth.account.adapter import DefaultAccountAdapter


class MyAccountAdapter(DefaultAccountAdapter):

    def get_email_confirmation_url(self, request, emailconfirmation):
        current_site = get_current_site(request)
        return '{}/account/confirm-email/{}/'.format(current_site, emailconfirmation.key)
