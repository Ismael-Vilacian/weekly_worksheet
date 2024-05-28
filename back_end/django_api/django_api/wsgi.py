"""
WSGI config for django_api project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_api.settings")

application = get_wsgi_application()

from django.db import transaction
from entities.dia_da_semana import DiaDaSemana  # Importe seu modelo DiaDaSemana

@transaction.atomic
def initialize_database():

    if not DiaDaSemana.objects.exists():

        dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
        for dia in dias:
            DiaDaSemana.objects.create(nome=dia)

# Chame a função quando o servidor iniciar
initialize_database()