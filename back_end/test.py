from database_controller import database

sql_add_curso = '''
INSERT INTO curso (nome, carga_horaria) VALUES ('Engenharia de Software', 360);
'''

sql_add_disciplina = '''
INSERT INTO disciplina (nome, carga_horaria) VALUES ('Estrututura de dados', 40);
'''

sql_add_grade_horario = '''
INSERT INTO gradeHorario (descricao) VALUES ('Primeiro horario');
'''

sql_add_horario = '''
INSERT INTO horario (inicio, fim, gradeHorarioId) VALUES ('18:55', '19:55', 1);
'''

sql_add_curso_disciplina = '''
INSERT INTO cursoDisciplina (cursoId, disciplinaId) VALUES (1, 1);
'''

sql_add_professor = '''
INSERT INTO professor (nome) VALUES ('Rodrigo de Souza Ataides');
'''

sql_add_aula = '''
INSERT INTO aula (disciplinaId, professorId, horarioId, diaSemana) VALUES (1, 1, 1, 'Segunda');
'''

sql_add_disponibilidade = '''
INSERT INTO disponibilidade (professorId, diaSemana, diaSemana, horarioId) VALUES (1, 1, 'Segunda', 1);
'''

database_controller = database()
try:
    # database_controller.custom_script(sql_add_curso)
    # database_controller.custom_script(sql_add_disciplina)
    # database_controller.custom_script(sql_add_grade_horario)
    # database_controller.custom_script(sql_add_horario)
    # database_controller.custom_script(sql_add_curso_disciplina)
    # database_controller.custom_script(sql_add_professor)
    # database_controller.custom_script(sql_add_aula)
    # database_controller.custom_script(sql_add_disponibilidade)
    print(database_controller.get_data('curso'))
    print(database_controller.get_data('disciplina'))
    print(database_controller.get_data('gradeHorario'))
    print(database_controller.get_data('horario'))
    print(database_controller.get_data('cursoDisciplina'))
    print(database_controller.get_data('professor'))
    print(database_controller.get_data('aula'))
    print(database_controller.get_data('disponibilidade'))
    
except Exception as e:
    print(e)