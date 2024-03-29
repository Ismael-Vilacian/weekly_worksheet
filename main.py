from database_controller import database

database_controller = database()

database_controller.create_table('id INTEGER PRIMARY KEY, nome TEXT NOT NULL, idade INTEGER', 'clientes')

database_controller.add_item("'John Doe', 30", 'nome, idade', 'clientes')