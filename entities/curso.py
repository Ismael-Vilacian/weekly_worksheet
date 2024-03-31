from database_controller import database
from abstract_entity import AbstractEntity

class Curso(AbstractEntity):
    def __init__(self, id, descricao):
        super().__init__() 
        self.id = id
        self.descricao = descricao
        self.database_controller = database()
    
    def table_name(self):
        return 'Curso'
    

# Exemplo de uso:
# Curso.create_table()