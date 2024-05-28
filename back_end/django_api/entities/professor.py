from django.db import models
from entities.dia_da_semana import DiaDaSemana

class Professor(models.Model):
    nome = models.CharField(max_length=200)
    disponibilidade = models.ManyToManyField(DiaDaSemana, through='Disponibilidade')