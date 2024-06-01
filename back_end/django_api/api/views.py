import json
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
from rest_framework import serializers
from django.shortcuts import get_object_or_404

class DisciplinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disciplina
        fields = '__all__'

class CursoSerializer(serializers.ModelSerializer):
    disciplinas = DisciplinaSerializer(many=True)

    class Meta:
        model = Curso
        fields = '__all__'

@api_view(["GET"])
def hello_world(request):
    return Response({"message": "Hello, world!"})

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
    serializer = CursoSerializer(courses, many=True)
    return Response(serializer.data)

@api_view(["DELETE"])
def delete_course(request, id):
    curso = Curso.objects.get(id= id)
    CursoDisciplina.objects.filter(curso=curso).delete()
    curso.delete()
    return Response({"message": "Curso deletado com sucesso."})

@api_view(["POST"])
def set_course(request):
    course = Curso.objects.create(nome=request.data['nome'], carga_horaria=request.data['carga_horaria'])
    for disciplina in request.data['disciplinas']:
        disciplina_id = disciplina['id']
        CursoDisciplina.objects.create(curso=course, disciplina=Disciplina.objects.get(pk=disciplina_id))
    return Response()

@api_view(["POST"])
def set_time(request):
    time = Horario.objects.create(descricao=request.data['descricao'], inicio=request.data['inicio'], fim=request.data['fim'])
    return Response()

@api_view(["POST"])
def set_teacher(request):
    teacher = Professor.objects.create(nome=request.data['nome'])
    for disponibilidade in request.data['disponibilidade']:
        Disponibilidade.objects.create(professor=teacher, diaSemana=DiaDaSemana.objects.get(pk=disponibilidade['diaSemana']['id']), horario=Horario.objects.get(pk=disponibilidade['horario']['id']))
    return Response()

@api_view(["GET"])
def get_work_board(request):
    turmas = Turma.objects.all()
    turmas_aulas = []

    for turma in turmas:
        aulas = Aula.objects.filter(turma=turma).values('id', 'disciplina__disciplina__nome', 'professor__nome', 'horario__descricao', 'diaSemana__nome')
        turmas_aulas.append({
            "turma": {
                "id": turma.id,
                "descricao": turma.descricao,
                "aulas": list(aulas)
            }
        })

    return Response(turmas_aulas)

@api_view(["DELETE"])
def delete_work_board(request, id):
    turma = Turma.objects.get(id= id)
    Aula.objects.filter(turma=turma).delete()
    turma.delete()
    return Response({"message": "Quadro de trabalho semanal deletado com sucesso."})

@api_view(["POST"])
def create_work_board(request):
    # Inicializando um dicionário para armazenar os dados
    data = {}

    # Obtendo o curso do request
    curso = Curso.objects.get(id=request.data['curso']['id'])

    # Armazenando o curso no dicionário
    data['curso'] = curso

    # Inicializando uma lista para armazenar as disciplinas
    data['disciplinas'] = []

    # Para cada disciplina no request, obtenha o objeto CursoDisciplina e adicione à lista
    for disciplina in request.data['disciplinas']:
        curso_disciplina = CursoDisciplina.objects.get(curso=curso, disciplina__id=disciplina['id'])
        data['disciplinas'].append(curso_disciplina)

    # Regra 1: Verifique se existem professores disponíveis
    if not Professor.objects.exists():
        return Response({"error": "Não há professores disponíveis."}, status=400)

    # Regra 2: Verifique se a carga horária total das disciplinas ultrapassa o limite máximo de 480 horas por semana
    carga_horaria_total = sum(disciplina.disciplina.carga_horaria for disciplina in data['disciplinas'])
    if carga_horaria_total > 480:
        return Response({"error": "A carga horária total ultrapassa o limite máximo de 480 horas por semana."}, status=400)

    aulas = []

    # Ordenando as disciplinas pela carga horária em ordem decrescente
    disciplinas_ordenadas = sorted(data['disciplinas'], key=lambda d: d.disciplina.carga_horaria, reverse=True)

    for disciplina in disciplinas_ordenadas:
        # Regra 6: Calcule a quantidade de horários necessários para a disciplina com base na sua carga horária
        horarios_necessarios = disciplina.disciplina.carga_horaria // 20

        professor_atribuido = None

        # Ordenando os professores pela disponibilidade em ordem decrescente
        professores_ordenados = sorted(Professor.objects.all(), key=lambda p: p.disponibilidades.count(), reverse=True)

        for _ in range(horarios_necessarios):
            # Regra 3: Encontre um professor que esteja disponível e que não esteja ministrando aulas em um determinado dia e horário
            for professor in professores_ordenados if not professor_atribuido else [professor_atribuido]:
                for disponibilidade in professor.disponibilidades.all():
                    # Verifique se já existe uma aula programada para o mesmo horário
                    if not any(aula.diaSemana == disponibilidade.diaSemana and aula.horario == disponibilidade.horario for aula in aulas):
                        # Verifique se o professor já está ministrando uma aula no mesmo dia e horário
                        if not Aula.objects.filter(professor=professor, diaSemana=disponibilidade.diaSemana, horario=disponibilidade.horario).exists():
                            # Regra 4: Crie uma aula com a disciplina, o professor, o dia da semana e o horário
                            aula = Aula(disciplina=disciplina, professor=professor, diaSemana=disponibilidade.diaSemana, horario=disponibilidade.horario)
                            aulas.append(aula)
                            professor_atribuido = professor
                            break
                else:
                    continue
                break
            else:
                return Response({"error": f"Não há professores disponíveis para a disciplina {disciplina.disciplina.nome}."}, status=400)

    # Crie uma turma com a descrição fornecida no request
    turma = Turma.objects.create(descricao=request.data['turma'])

    # Para cada aula na lista de aulas, defina a turma e salve a aula
    for aula in aulas:
        aula.turma = turma
        aula.save()

    return Response({"message": "Quadro de trabalho semanal criado com sucesso."}, status=200)