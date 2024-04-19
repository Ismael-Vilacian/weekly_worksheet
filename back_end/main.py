
from database_controller import database

#Tabela curso
cursos = '''CREATE TABLE IF NOT EXISTS curso (
  id INTEGER PRIMARY KEY,
  nome VARCHAR,
  carga_horaria INTEGER
);'''

#Tabela disciplina

disciplinas = '''
    CREATE TABLE IF NOT EXISTS disciplina (
  id INTEGER PRIMARY KEY,
  nome VARCHAR,
  carga_horaria INTEGER
);
'''

#Tabela gradeHorario
grade_horario = '''
CREATE TABLE IF NOT EXISTS gradeHorario (
  id INTEGER PRIMARY KEY,
  descricao VARCHAR
);
'''

#Tabela horario
horario = '''
CREATE TABLE IF NOT EXISTS horario (
  id INTEGER PRIMARY KEY,
  inicio TIME,
  fim TIME,
  gradeHorarioId INTEGER REFERENCES gradeHorario(id),
  UNIQUE (inicio, fim, gradeHorarioId)
);
'''

#Tabela cursoDisciplina
curso_disciplina = '''
CREATE TABLE IF NOT EXISTS cursoDisciplina (
  id INTEGER PRIMARY KEY,
  cursoId INTEGER REFERENCES curso(id),
  disciplinaId INTEGER REFERENCES disciplina(id),
  UNIQUE (cursoId, disciplinaId)
);
'''

#Tabela professor
professor = '''
CREATE TABLE IF NOT EXISTS professor (
  id INTEGER PRIMARY KEY,
  nome VARCHAR
);
'''

#Tabela aula
aula = '''
CREATE TABLE IF NOT EXISTS aula (
  id INTEGER PRIMARY KEY,
  disciplinaId INTEGER REFERENCES cursoDisciplina(id),
  professorId INTEGER REFERENCES professor(id),
  horarioId INTEGER REFERENCES horario(id),
  diaSemana VARCHAR,
  UNIQUE (disciplinaId, professorId, horarioId, diaSemana)
);
'''

#Tabela disponibilidade
disponibilidade = '''
CREATE TABLE IF NOT EXISTS disponibilidade (
  id INTEGER PRIMARY KEY,
  professorId INTEGER REFERENCES professor(id),
  diaSemana VARCHAR,
  horarioId INTEGER REFERENCES horario(id),
  UNIQUE (professorId, diaSemana, horarioId)
);
'''
database_controller = database()

database_controller.custom_script(cursos)
database_controller.custom_script(disciplinas)
database_controller.custom_script(grade_horario)
database_controller.custom_script(horario)
database_controller.custom_script(curso_disciplina)
database_controller.custom_script(professor)
database_controller.custom_script(aula)
database_controller.custom_script(disponibilidade)