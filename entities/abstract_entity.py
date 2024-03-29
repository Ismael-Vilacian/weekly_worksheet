from database_controller import database

class AbstractEntity:
    
    def __init__(self, entity_name, base_structure):
        self.database_controller = database()
        self.entity_name = entity_name
        self.base_structure = base_structure

    def create_table(self):
        try:
            self.create_table(self.base_structure, self.entity_name)
        except Exception as e:
            print(f'Erro ao criar a tabela cursos: {e}')

    def add_item(self):
        try:
            self.database_controller.add_item(f"'{self.descricao}'", 'descricao', 'Curso')
        except Exception as e:
            print(f'Erro ao adicionar item na tabela cursos: {e}')

    def remove_item(self):
        try:
            self.database_controller.remove_item(f'id = {self.id}', 'Curso')
        except Exception as e:
            print(f'Erro ao remover item na tabela cursos: {e}')

    def update_item(self):
        try:
            self.database_controller.update_item(f'descricao = {self.descricao}', f'id = {self.id}', 'Curso')
        except Exception as e:
            print(f'Erro ao atualizar item na tabela cursos: {e}')
