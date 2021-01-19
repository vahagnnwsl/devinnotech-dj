import json
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from django.http import HttpResponse
from datetime import datetime


def get_site_types_for_form_select():
    json_data = open('website/config.json', encoding="utf8")
    json_data = json.load(json_data)['siteType']
    site_type = list()

    for i, key in enumerate(json_data):
        site_type.append((key, json_data[key]['title']))
    return site_type


def create_response(form, request, view_path):
    if form.is_valid():

        data = dict(
            ip=request.META.get('REMOTE_ADDR'),
            date=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        )

        for i in form.cleaned_data:
            data[i] = form.cleaned_data[i]

        html_message = render_to_string(view_path, {'data': data})

        send_mail(
            'Форма Свяжитесь с нами!',
            'Here is the message.',
            settings.EMAIL_HOST_USER,
            [settings.EMAIL_HOST_USER, 'vladimir.ghukas@gmail.com'],
            html_message=html_message
        )
        return HttpResponse({}, content_type='application/json')

    else:

        return HttpResponse({}, content_type='application/json', status=411)
