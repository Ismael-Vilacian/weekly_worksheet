from database_controller import database
from .abstract_entity import AbstractEntity

class Curso(AbstractEntity):
    def __init__(self, id, descricao, carga_horaria):
        super().__init__() 
        self.id = id
        self.descricao = descricao
        self.database_controller = database()
        self.carga_horaria = carga_horaria

        if self.table_exists() is False:
            self.create_table()
    
    def table_name(self):
        return 'Curso'
    
    def to_dict(self):
        return {
            'id': self.id,
            'descricao': self.descricao,
            'carga_horaria': self.carga_horaria
        }