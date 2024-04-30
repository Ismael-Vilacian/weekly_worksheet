


from database_controller import database

#Tabela curso
cursos = '''CREATE TABLE IF NOT EXISTS curso (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR,
  carga_horaria INTEGER
);'''

#Tabela disciplina

disciplinas = '''
CREATE TABLE IF NOT EXISTS disciplina (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR,
  carga_horaria INTEGER
);
'''

#Tabela gradeHorario
grade_horario = '''
CREATE TABLE IF NOT EXISTS gradeHorario (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  descricao VARCHAR
);
'''

#Tabela horario
horario = '''
CREATE TABLE IF NOT EXISTS horario (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  descricao VARCHAR,
  inicio TIME,
  fim TIME,
  UNIQUE (inicio, fim)
);
'''

#Tabela cursoDisciplina
curso_disciplina = '''
CREATE TABLE IF NOT EXISTS cursoDisciplina (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cursoId INTEGER REFERENCES curso(id),
  disciplinaId INTEGER REFERENCES disciplina(id),
  UNIQUE (cursoId, disciplinaId)
);
'''

#Tabela professor
professor = '''
CREATE TABLE IF NOT EXISTS professor (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR
);
'''

#Tabela aula
aula = '''
CREATE TABLE IF NOT EXISTS aula (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
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
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  professorId INTEGER REFERENCES professor(id),
  diaSemana VARCHAR,
  horarioId INTEGER REFERENCES horario(id),
  UNIQUE (professorId, diaSemana, horarioId)
);
'''

#Tabela dia da semana
diaDaSemana = '''
CREATE TABLE IF NOT EXISTS diaDaSemana (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR
);
'''

#Populando tabela dia da semana
diaDaSemana_populate = [
'''INSERT INTO diaDaSemana (nome) VALUES ('Segunda-feira');''',
'''INSERT INTO diaDaSemana (nome) VALUES ('Terça-feira');''',
'''INSERT INTO diaDaSemana (nome) VALUES ('Quarta-feira');''',
'''INSERT INTO diaDaSemana (nome) VALUES ('Quinta-feira');''',
'''INSERT INTO diaDaSemana (nome) VALUES ('Sexta-feira');''',
'''INSERT INTO diaDaSemana (nome) VALUES ('Sábado');''',
'''INSERT INTO diaDaSemana (nome) VALUES ('Domingo');'''
]

database_controller = database()

database_controller.custom_script(cursos)
database_controller.custom_script(disciplinas)
database_controller.custom_script(grade_horario)
database_controller.custom_script(horario)
database_controller.custom_script(curso_disciplina)
database_controller.custom_script(professor)
database_controller.custom_script(aula)
database_controller.custom_script(disponibilidade)
database_controller.custom_script(diaDaSemana)

for data in range(0, len(diaDaSemana_populate)):
  database_controller.custom_script(diaDaSemana_populate[data])