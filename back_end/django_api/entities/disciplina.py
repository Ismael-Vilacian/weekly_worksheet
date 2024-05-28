from django.db import models

class Disciplina(models.Model):
    nome = models.CharField(max_length=200)
    carga_horaria = models.IntegerField()