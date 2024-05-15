from .abstract_entity import AbstractEntity

class Professor(AbstractEntity):
    def __init__(self, id, nome,):
        super().__init__() 
        self.id = id
        self.nome = nome
    
    def table_name(self):
        return 'professor'
    
    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
        }