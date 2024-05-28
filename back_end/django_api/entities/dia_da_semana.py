from django.db import models

class DiaDaSemana(models.Model):
    nome = models.CharField(max_length=200)