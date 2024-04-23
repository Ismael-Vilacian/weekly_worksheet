from rest_framework.response import Response
from rest_framework.decorators import api_view
from entities.curso import Curso
from database_controller import database
import json

@api_view(["GET"])
def hello_world(request):
    return Response({"message": "Hello, world!"})

@api_view(["GET"])
def teste(request):
    database_controller = database()
    response = database_controller.get_data('curso')
    cursos = []
    for curso in response:
        cursos.append(Curso(curso[0], curso[1], curso[2]).to_dict())
    print(json.dumps(cursos))
    return Response(json.dumps(cursos))

@api_view(["GET"])
def get_disciplines(request):
    database_controller = database()
    response = database_controller.get_data('disciplina')
    
    disciplines = []
    for discipline in response:
        disciplines.append(Curso(discipline[0], discipline[1], discipline[2]).to_dict())
    
    return Response(json.dumps(disciplines))