from rest_framework.response import Response
from rest_framework.decorators import api_view
from database_controller import database


@api_view(["GET"])
def hello_world(request):
    return Response({"message": "Hello, world!"})

@api_view(["GET"])
def teste(request):
    database_controller = database()
    response = database_controller.get_data('curso')
    print(response)
    return Response(response)