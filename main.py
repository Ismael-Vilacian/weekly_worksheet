from database_controller import database

database_controller = database()

database_controller.createTable('id INTEGER PRIMARY KEY, nome TEXT NOT NULL, idade INTEGER', 'clientes')

database_controller.addItem("'John Doe', 30", 'nome, idade', 'clientes')