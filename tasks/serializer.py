from rest_framework import serializers
from .models import Task # Importamos el modelo Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task # Indicamos que modelo se va a serial
        fields = '__all__' # Indicamos que todos los campos del modelo se van a serializar
        # fields = ['id', 'title', 'description', 'done'] # Indicamos que campos se van a serializar de esta forma podemos estructurar la informacion que se va a serializar de la base de datos