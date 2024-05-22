from rest_framework.response import Response
from rest_framework.decorators import api_view
from entities.diaDaSemana import DiaDaSemana
from entities.horario import Horario
from entities.disciplina import Disciplina
from entities.curso import Curso
from database_controller import database
import json

@api_view(["GET"])
def hello_world(request):
    return Response({"message": "Hello, world!"})

@api_view(["GET"])
def get_disciplines(request):
    database_controller = database()
    response = database_controller.get_data('disciplina')
    
    disciplines = []
    for discipline in response:
        disciplines.append(Disciplina(discipline[0], discipline[1], discipline[2]).to_dict())
    
    return Response(json.dumps(disciplines))

@api_view(["GET"])
def get_disciplines_by_courseid(request, id):
    database_controller = database()
    response = database_controller.get_data('cursoDisciplina', f"cursoId = {id}")
    
    disciplines_ids = []
    for resp in response:
        disciplines_ids.append(resp[2])

    disciplines_bd = database_controller.get_data('disciplina', f"id in ({', '.join(map(str, disciplines_ids))})")
    disciplines = []
    for discipline in disciplines_bd:
        disciplines.append(Disciplina(discipline[0], discipline[1], discipline[2]).to_dict())

    return Response(json.dumps(disciplines))

@api_view(["GET"])
def get_data_availability(request):
    database_controller = database()
    responseDayOfWeek = database_controller.get_data('diaDaSemana')
    responseTime = database_controller.get_data('horario')

    daysOfWeeks = []
    for dayOfWeek in responseDayOfWeek:
        daysOfWeeks.append(DiaDaSemana(dayOfWeek[0], dayOfWeek[1]).to_dict())

    times = []
    for time in responseTime:
        times.append(Horario(time[0], time[1], time[2], time[3]).to_dict())

    return Response(json.dumps({"daysOfWeeks": daysOfWeeks, "times": times}))

@api_view(["POST"])
def set_disciplines(request):
    disciplina = request.data
 
    database_controller = database()
    database_controller.set_data('disciplina', f"'{disciplina['descricao']}', {disciplina['carga_horaria']}", "(nome, carga_horaria)")
    
    return Response()


@api_view(["GET"])
def get_course(request):
    database_controller = database()
    response = database_controller.get_data('curso')
    
    couses = []
    for course in response:
        couses.append(Curso(course[0], course[1], course[2]).to_dict())
    
    return Response(json.dumps(couses))

@api_view(["POST"])
def set_course(request):
    course = request.data
 
    database_controller = database()
    course_id = database_controller.set_data('curso', f"'{course['descricao']}', {course['carga_horaria']}", "(nome, carga_horaria)")
    for disciplina in course['disciplinas']:
        database_controller.set_data('cursoDisciplina', f"'{course_id}', {disciplina['id']}", "(cursoId, disciplinaId)")

    return Response()

@api_view(["POST"])
def set_time(request):
    time = request.data
    
    database_controller = database()
    database_controller.set_data('horario', f"'{time['descricao']}', '{time['hora_inicio']}', '{time['hora_fim']}'", "(descricao, inicio, fim)")
    
    return Response()

@api_view(["POST"])
def set_teacher(request):
    teacher = request.data
    
    database_controller = database()
    teacher_id = database_controller.set_data('professor', f"'{teacher['nome']}'", "(nome)")
    
    for disponibilidade in teacher['disponibilidade']:
        database_controller.set_data('disponibilidade', f"'{teacher_id}', {disponibilidade['diaSemana']['id']}, {disponibilidade['horario']['id']}", "(professorId, diaSemanaId, horarioId)")
    
    return Response()