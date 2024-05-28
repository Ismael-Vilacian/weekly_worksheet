from django.db import models

class Turma(models.Model):
    descricao = models.CharField(max_length=255)