from django.db import models
from entities.curso_disciplina import CursoDisciplina
from entities.professor import Professor
from entities.horario import Horario
from entities.dia_da_semana import DiaDaSemana
from entities.turma import Turma

class Aula(models.Model):
    disciplina = models.ForeignKey(CursoDisciplina, on_delete=models.CASCADE)
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE)
    horario = models.ForeignKey(Horario, on_delete=models.CASCADE)
    diaSemana = models.ForeignKey(DiaDaSemana, on_delete=models.CASCADE)
    turma = models.ForeignKey(Turma, on_delete=models.CASCADE)