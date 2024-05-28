from django.db import models

class Horario(models.Model):
    descricao = models.CharField(max_length=200)
    inicio = models.TimeField()
    fim = models.TimeField()