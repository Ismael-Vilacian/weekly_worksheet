from database_controller import database

sql_add = '''
INSERT INTO curso (nome, carga_horaria) VALUES ('Engenharia de Software', 360);
'''

database_controller = database()
database_controller.custom_script(sql_add)