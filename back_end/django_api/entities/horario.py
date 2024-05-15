from .abstract_entity import AbstractEntity

class Horario(AbstractEntity):
    def __init__(self, id, nome, inicio, fim):
        super().__init__() 
        self.id = id
        self.nome = nome
        self.inicio = inicio
        self.fim = fim
    
    def table_name(self):
        return 'diaDaSemana'
    
    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'inicio': self.inicio,
            'fim': self.fim
        }