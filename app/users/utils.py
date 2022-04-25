from django.core.exceptions import ValidationError
from django.conf import settings as djSettings
from django.core import exceptions as django_exceptions
from rest_framework import serializers
from distutils.log import error
import requests

error_code = "google_recaptcha_error"
error_message = "Invalid ReCAPTCHA, please try again"


def validate_g_recaptcha_response(data):
    try:
        if "google_recaptcha_error" not in data:
            raise ValidationError(code=error_code, message=error_message)
        recaptcha_response = data['google_recaptcha_error']
        print(djSettings)
        req_data = {
            'secret': djSettings.GOOGLE_RECAPTCHA_SECRET,
            'response': recaptcha_response
        }

        r = requests.post(
            'https://www.google.com/recaptcha/api/siteverify',
            data=req_data
        )
        result = r.json()
        if (result['success']):
            return data
        raise ValidationError(code=error_code, message=error_message)
    except django_exceptions.ValidationError as e:
        raise serializers.ValidationError({
            "google_recaptcha_error": e.message
        })
