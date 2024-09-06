from rest_framework import viewsets
from .serializer import TaskSerializer
from .models import Task

# Create your views here.
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all() # Indicamos que objetos se van a mostrar en la vista de la API
    serializer_class = TaskSerializer # Indicamos que serializador se va a utilizar para la vista
