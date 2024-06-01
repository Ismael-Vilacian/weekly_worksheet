from django.db import models

class DiaDaSemana(models.Model):
    nome = models.CharField(max_length=200)

    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
        }