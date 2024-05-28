from django.db import models
from entities.disciplina import Disciplina

class Curso(models.Model):
    nome = models.CharField(max_length=200)
    carga_horaria = models.IntegerField()
    disciplinas = models.ManyToManyField(Disciplina, through='CursoDisciplina')