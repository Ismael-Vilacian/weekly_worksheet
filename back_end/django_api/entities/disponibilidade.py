from django.db import models
from entities.dia_da_semana import DiaDaSemana
from entities.horario import Horario
from entities.professor import Professor

class Disponibilidade(models.Model):
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE, related_name='disponibilidades')
    diaSemana = models.ForeignKey(DiaDaSemana, on_delete=models.CASCADE)
    horario = models.ForeignKey(Horario, on_delete=models.CASCADE)