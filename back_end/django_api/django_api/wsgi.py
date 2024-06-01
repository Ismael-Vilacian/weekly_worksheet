"""
WSGI config for django_api project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

from entities.disponibilidade import Disponibilidade
from entities.professor import Professor
from entities.horario import Horario
from entities.disciplina import Disciplina
from django.db import transaction
from entities.dia_da_semana import DiaDaSemana 

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_api.settings")

application = get_wsgi_application()

@transaction.atomic
def initialize_database():

    if not DiaDaSemana.objects.exists():

        dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
        for dia in dias:
            DiaDaSemana.objects.create(nome=dia)
    if not Horario.objects.exists():
        Horario.objects.create(descricao='Primeiro horário', inicio='18:55', fim='19:45')
        Horario.objects.create(descricao='Segundo horário', inicio='19:45', fim='20:35')
        Horario.objects.create(descricao='Terceiro horário', inicio='20:35', fim='21:35')
        Horario.objects.create(descricao='Quarto horário', inicio='21:35', fim='22:25')

    if not Professor.objects.exists():
        teacher1 = Professor.objects.create(nome='THIAGO AUGUSTO NARIKAWA')
        Disponibilidade.objects.create(professor=teacher1, diaSemana=DiaDaSemana.objects.get(pk=1), horario=Horario.objects.get(pk=1))
        Disponibilidade.objects.create(professor=teacher1, diaSemana=DiaDaSemana.objects.get(pk=1), horario=Horario.objects.get(pk=2))

        teacher2 = Professor.objects.create(nome='ERICK GOMES PIRES')
        Disponibilidade.objects.create(professor=teacher2, diaSemana=DiaDaSemana.objects.get(pk=1), horario=Horario.objects.get(pk=3))
        Disponibilidade.objects.create(professor=teacher2, diaSemana=DiaDaSemana.objects.get(pk=1), horario=Horario.objects.get(pk=4))
        Disponibilidade.objects.create(professor=teacher2, diaSemana=DiaDaSemana.objects.get(pk=2), horario=Horario.objects.get(pk=1))
        Disponibilidade.objects.create(professor=teacher2, diaSemana=DiaDaSemana.objects.get(pk=2), horario=Horario.objects.get(pk=2))

        teacher3 = Professor.objects.create(nome='FABRICIO BONFIM RODRIGUES DE OLIVEIRA')
        Disponibilidade.objects.create(professor=teacher3, diaSemana=DiaDaSemana.objects.get(pk=2), horario=Horario.objects.get(pk=3))
        Disponibilidade.objects.create(professor=teacher3, diaSemana=DiaDaSemana.objects.get(pk=2), horario=Horario.objects.get(pk=4))

        teacher4 = Professor.objects.create(nome='JEAN CARLOS SILVA DORNELAS')
        Disponibilidade.objects.create(professor=teacher4, diaSemana=DiaDaSemana.objects.get(pk=3), horario=Horario.objects.get(pk=1))
        Disponibilidade.objects.create(professor=teacher4, diaSemana=DiaDaSemana.objects.get(pk=3), horario=Horario.objects.get(pk=2))
        Disponibilidade.objects.create(professor=teacher4, diaSemana=DiaDaSemana.objects.get(pk=3), horario=Horario.objects.get(pk=3))
        Disponibilidade.objects.create(professor=teacher4, diaSemana=DiaDaSemana.objects.get(pk=3), horario=Horario.objects.get(pk=4))
        Disponibilidade.objects.create(professor=teacher4, diaSemana=DiaDaSemana.objects.get(pk=4), horario=Horario.objects.get(pk=1))
        Disponibilidade.objects.create(professor=teacher4, diaSemana=DiaDaSemana.objects.get(pk=4), horario=Horario.objects.get(pk=2))

        teacher5 = Professor.objects.create(nome='RODRIGO DELLA CORTE')
        Disponibilidade.objects.create(professor=teacher5, diaSemana=DiaDaSemana.objects.get(pk=5), horario=Horario.objects.get(pk=1))
        Disponibilidade.objects.create(professor=teacher5, diaSemana=DiaDaSemana.objects.get(pk=5), horario=Horario.objects.get(pk=2))

    if not Disciplina.objects.exists():
         # 1ª SEQUÊNCIA SUGERIDA
        Disciplina.objects.create(nome='Introdução à Engenharia', carga_horaria=40)
        Disciplina.objects.create(nome='Pré-Cálculo', carga_horaria=120)
        Disciplina.objects.create(nome='Geometria Analítica', carga_horaria=80)
        Disciplina.objects.create(nome='Sociedade e Organizações', carga_horaria=40)
        Disciplina.objects.create(nome='Química Geral Tecnológica', carga_horaria=80)
        Disciplina.objects.create(nome='Comunicação e Expressão', carga_horaria=40)

        # 2ª SEQUÊNCIA SUGERIDA
        Disciplina.objects.create(nome='Álgebra Linear para Engenharia', carga_horaria=60)
        Disciplina.objects.create(nome='Cálculo I', carga_horaria=120)
        Disciplina.objects.create(nome='Física', carga_horaria=80)
        Disciplina.objects.create(nome='Ciências Ambientais', carga_horaria=40)
        Disciplina.objects.create(nome='Materiais para Engenharia', carga_horaria=60)
        Disciplina.objects.create(nome='Gestão de Negócios e Economia', carga_horaria=40)
        Disciplina.objects.create(nome='Metodologia Científica', carga_horaria=40)

        # 3ª SEQUÊNCIA SUGERIDA
        Disciplina.objects.create(nome='Mecânica Geral', carga_horaria=80)
        Disciplina.objects.create(nome='Cálculo II', carga_horaria=120)
        Disciplina.objects.create(nome='Ondas', carga_horaria=40)
        Disciplina.objects.create(nome='Noções de Desenho Técnico em CAD', carga_horaria=80)
        Disciplina.objects.create(nome='Algoritmos e Linguagens de Programação', carga_horaria=80)
        Disciplina.objects.create(nome='Eletricidade e Magnetismo', carga_horaria=80)

        # 4ª SEQUÊNCIA SUGERIDA
        Disciplina.objects.create(nome='Probabilidade e Estatística', carga_horaria=80)
        Disciplina.objects.create(nome='Circuitos Elétricos I', carga_horaria=80)
        Disciplina.objects.create(nome='Gestão de Projetos', carga_horaria=80)
        Disciplina.objects.create(nome='Cálculo Numérico', carga_horaria=60)
        Disciplina.objects.create(nome='Equações Diferenciais', carga_horaria=80)
        Disciplina.objects.create(nome='Segurança do Trabalho e Legislação', carga_horaria=60)

        # 5ª SEQUÊNCIA SUGERIDA
        Disciplina.objects.create(nome='Circuitos Elétricos II', carga_horaria=60)
        Disciplina.objects.create(nome='Estrutura de Dados I', carga_horaria=80)
        Disciplina.objects.create(nome='Eletrônica Digital I', carga_horaria=80)
        Disciplina.objects.create(nome='Técnicas de Programação', carga_horaria=80)
        Disciplina.objects.create(nome='Sistemas Lineares', carga_horaria=60)
        Disciplina.objects.create(nome='Eletromagnetismo para Computação', carga_horaria=40)
        Disciplina.objects.create(nome='Tópicos Especiais em Engenharia da Computação', carga_horaria=60)

        # 6ª SEQUÊNCIA SUGERIDA
        Disciplina.objects.create(nome='Eletrônica Analógica I', carga_horaria=60)
        Disciplina.objects.create(nome='Processamento de Sinais', carga_horaria=80)
        Disciplina.objects.create(nome='Arquitetura de Computadores', carga_horaria=80)
        Disciplina.objects.create(nome='Estrutura de Dados II', carga_horaria=80)
        Disciplina.objects.create(nome='Redes de Computadores I', carga_horaria=40)
        Disciplina.objects.create(nome='Linguagens Formais e Autômatos', carga_horaria=60)
        Disciplina.objects.create(nome='Banco de Dados', carga_horaria=80)

        # 7ª SEQUÊNCIA SUGERIDA
        Disciplina.objects.create(nome='Controle I', carga_horaria=60)
        Disciplina.objects.create(nome='Desenvolvimento de Sistemas para Internet', carga_horaria=80)
        Disciplina.objects.create(nome='Eletrônica Digital II', carga_horaria=80)
        Disciplina.objects.create(nome='Eletrônica Analógica II', carga_horaria=60)
        Disciplina.objects.create(nome='Instrumentação Industrial e Acionamentos Elétricos', carga_horaria=60)
        Disciplina.objects.create(nome='Laboratório de Circuitos Elétricos e Eletrônica Analógica', carga_horaria=40)
        Disciplina.objects.create(nome='Filtros Digitais', carga_horaria=40)
        Disciplina.objects.create(nome='Redes de Computadores II', carga_horaria=40)

        # 8ª SEQUÊNCIA SUGERIDA
        Disciplina.objects.create(nome='Sistemas Operacionais', carga_horaria=80)
        Disciplina.objects.create(nome='Linguagem de Montagem', carga_horaria=40)
        Disciplina.objects.create(nome='Compiladores', carga_horaria=80)
        Disciplina.objects.create(nome='Controle II', carga_horaria=80)
        Disciplina.objects.create(nome='Automação Industrial', carga_horaria=40)
        Disciplina.objects.create(nome='Engenharia de Software', carga_horaria=60)
        Disciplina.objects.create(nome='Infraestrutura de Telecomunicações', carga_horaria=40)

        # 9ª SEQUÊNCIA SUGERIDA
        Disciplina.objects.create(nome='Trabalho de Conclusão de Curso I', carga_horaria=40)
        Disciplina.objects.create(nome='Microcontroladores', carga_horaria=60)
        Disciplina.objects.create(nome='Processamento Digital de Imagens', carga_horaria=40)
        Disciplina.objects.create(nome='Inteligência Artificial', carga_horaria=80)
        Disciplina.objects.create(nome='Construção de Software Comercial', carga_horaria=80)
        Disciplina.objects.create(nome='Automação Industrial e Controle', carga_horaria=60)
        Disciplina.objects.create(nome='Computação Gráfica', carga_horaria=40)

        # 10ª SEQUÊNCIA SUGERIDA
        Disciplina.objects.create(nome='Sistemas Distribuídos', carga_horaria=60)
        Disciplina.objects.create(nome='Redes sem Fio', carga_horaria=40)
        Disciplina.objects.create(nome='Trabalho de Conclusão de Curso II', carga_horaria=40)
        Disciplina.objects.create(nome='Robótica', carga_horaria=60)
        Disciplina.objects.create(nome='Sistemas Embarcados', carga_horaria=60)
        Disciplina.objects.create(nome='Tópicos Contemporâneos em Engenharia da Computação', carga_horaria=40)

initialize_database()