from entities.turma import Turma
from entities.aula import Aula
from entities.disciplina import Disciplina
from entities.curso import Curso 
from entities.curso_disciplina import CursoDisciplina
from entities.dia_da_semana import DiaDaSemana 
from entities.horario import Horario
from entities.professor import Professor
from entities.disponibilidade import Disponibilidade
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.forms.models import model_to_dict

@api_view(["GET"])
def get_disciplines(request):
    disciplines = Disciplina.objects.all()
    return Response([model_to_dict(d) for d in disciplines])

@api_view(["GET"])
def get_disciplines_by_courseid(request, id):
    curso = Curso.objects.get(pk=id)
    disciplines = curso.disciplinas.all()
    return Response([model_to_dict(d) for d in disciplines])

@api_view(["GET"])
def get_data_availability(request):
    daysOfWeeks = DiaDaSemana.objects.all()
    times = Horario.objects.all()
    return Response({"daysOfWeeks": [model_to_dict(d) for d in daysOfWeeks], "times": [model_to_dict(t) for t in times]})

@api_view(["POST"])
def set_disciplines(request):
    disciplina = Disciplina.objects.create(nome=request.data['nome'], carga_horaria=request.data['carga_horaria'])
    return Response(model_to_dict(disciplina))

@api_view(["GET"])
def get_course(request):
    courses = Curso.objects.all()
    return Response([model_to_dict(c) for c in courses])

@api_view(["POST"])
def set_course(request):
    course = Curso.objects.create(nome=request.data['nome'], carga_horaria=request.data['carga_horaria'])
    for disciplina in request.data['disciplinas']:
        disciplina_id = disciplina['id']
        CursoDisciplina.objects.create(curso=course, disciplina=Disciplina.objects.get(pk=disciplina_id))
    return Response(model_to_dict(course))

@api_view(["POST"])
def set_time(request):
    time = Horario.objects.create(descricao=request.data['descricao'], inicio=request.data['inicio'], fim=request.data['fim'])
    return Response(model_to_dict(time))

@api_view(["POST"])
def set_teacher(request):
    teacher = Professor.objects.create(nome=request.data['nome'])
    for disponibilidade in request.data['disponibilidade']:
        Disponibilidade.objects.create(professor=teacher, diaSemana=DiaDaSemana.objects.get(pk=disponibilidade['diaSemana']['id']), horario=Horario.objects.get(pk=disponibilidade['horario']['id']))
    return Response(model_to_dict(teacher))

@api_view(["POST"])
def creat_work_board(request):
    data = {}
    data['turma'] = request.data['turma']
    curso = request.data['curso']
    print(curso)
    data['curso'] = Curso.objects.get(id=curso['id'])

    data['disciplinas'] = []
    for disciplina in request.data['disciplinas']:
        data['disciplinas'].append(Disciplina.objects.get(id=disciplina['id']))

    # Obtenha todos os professores
    professores = Professor.objects.all()

    # Para cada disciplina
    for disciplina in data['disciplinas']:
        # Obtenha todos os professores que podem ensinar a disciplina
        professores_disciplina = professores.filter(cursoDisciplina__disciplinaId=disciplina.id)

        # Para cada professor
        for professor in professores_disciplina:
            # Verifique se o professor está disponível no horário da aula
            aulas = Aula.objects.filter(disciplinaId=disciplina.id)
            for aula in aulas:
                disponibilidade = Disponibilidade.objects.filter(professorId=professor.id, horarioId=aula.horarioId)

                # Se o professor estiver disponível
                if disponibilidade:
                    # Atribua a disciplina ao professor
                    Aula.objects.create(disciplinaId=disciplina.id, professorId=professor.id, horarioId=aula.horarioId, diaSemana=aula.diaSemana, turmaId=data['turma']['id'])

                    # Remova o horário da lista de disponibilidade do professor
                    disponibilidade.delete()

                    # Saia do loop
                    break
            else:
                continue
            break
        else:
            # Se não houver professores disponíveis para uma disciplina, retorne um erro
            return Response({"error": "Não há professores disponíveis para a disciplina {}".format(disciplina.descricao)}, status=400)

    # Se todas as disciplinas forem atribuídas com sucesso, crie a turma
    Turma.objects.create(descricao=data['turma']['descricao'])

    return Response()