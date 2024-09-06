# Entorno de trabajo
Para este proyecto primeramente ejecutamos:
mkdir nombreProyecto

- ahora creamos el entorno virtual con
python3 -m venv env

- inicializamos el entorno virtual con
source env/bin/activate

- para desactivar el entorno virtual podemos usar
deactivate

- ahora instalamos django con
pip install django

- luego creamos el proyecto (recordar colocar el punto al final del comando)
django-admin startproject nameProject .

- para iniciar a trabajar debemos crear una aplicacion para esto utilizamos el siguiente comando
python manage.py startapp nameApp

- Se debe configurarlo en la carpeta del proyecto django-settings.py como esta en el ejemplo 

INSTALLED_APPS = [
    ////////,
    'nameApp',
]

- ejecutaremos el comando migrate para que se enlace el proyecto a la aplicacion
python manage.py migrate

- ahora podremos iniciar el servicio sin ningun problema con
python manage.py runserver

# Django Rest Framework
https://www.django-rest-framework.org/

- Permite crear api y crud casi instantaneamente

- Instalacion
pip install djangorestframework

- Se debe configurarlo en la carpeta del proyecto django-settings.py como esta en el ejemplo 

INSTALLED_APPS = [
    ////////,
    'rest_framework',
]

# Modulo para conectar el backend con frontend
- Este modulo permite la comunicación entre backends
- documentación
https://pypi.org/project/django-cors-headers/

- instalacion del modulo de coneccion
pip install django-cors-headers

- Se debe configurarlo en la carpeta del proyecto django-settings.py como esta en el ejemplo 

INSTALLED_APPS = [
    ////////,
    'corsheaders',
]

- agregarlos antes de esa linea para no tener ningun error

MIDDLEWARE = [
    ...,
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    ...,
]

- Para poder configurar los parametros de conexion deberemos agregar al final de django-settings.py la siguiente linea:
CORS_ALLOWED_ORIGINS = []

# Tabla en la BD
- ingresamos a la aplicación y modificamos models.py para configurar las tablas de la DB

- para crear el codigo que generara las tablas debemos ejecutar el comando
python manage.py makemigrations
- este proceso creara una carpeta migrations que tendra toda la configuracion de nuestra BD

- ahora para crear las tablas que por defecto se crearan en db.sqlite3 deberemos ejecutar:
python manage.py migrate nameApp

# Extra - Crear super usuario en django
- para crear un super usuario para acceder a la plataforma de administracion de django deberemos ejecutar el siguiente comando:
python manage.py createsuperuser

# Agregar la tabla al panel de administración
- para agregar la tabla al panel de administración deberemos modificar dentro la aplicación el archivo admin.py como el siguiente ejemplo

from .models import className

admin.site.register(className)

# Django Rest Framework
- Lo primero que necesitamos para conectar crear la api es definir cuales son los datos que se enviaran al frontend, para esto primero deberemos de crear el archivo
serializer.py

- dentro este archivo podremos configurar que campos del modelo serán serializados(transformados en JSON) a través de la siguiente estructura

from rest_framework import serializers
from .models import Task # Importamos el modelo Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task # Indicamos que modelo se va a serial
        fields = '__all__' # Indicamos que todos los campos del modelo se van a serializar
        # fields = ['id', 'title', 'description', 'done'] # Indicamos que campos se van a serializar de esta forma podemos estructurar la informacion que se va a serializar de la base de datos

- ahora necesitaremos crear un vista para esto ingresarmos dentro la aplicación al archivo views.py lo que permitira manejar el CRUD en base al siguiente ejemplo

from rest_framework import viewsets
from .serializer import TaskSerializer
from .models import Task

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all() # Indicamos que objetos se van a mostrar en la vista de la API
    serializer_class = TaskSerializer # Indicamos que serializador se va a utilizar para la vista

- dentro la aplicacion tendremos que crear el archivo
urls.py

- este archivo se deberá configurar para que obtenga todas las rutas de la vista como el siguiente ejemplo

from django.urls import path, include # Importamos la funcion path para poder definir las URL de la API y la funcion include para poder incluir las URL de la API en las URL del proyecto
from rest_framework import routers # Importamos el enrutador de la API que es el que nos permite registrar las vistas en la API
from tasks import views # Importamos las vistas de la aplicacion tasks

#versionado de api es api/v1 este puede cambiarse de nombre
routers = routers.DefaultRouter()
routers.register(r'tasks', views.TaskViewSet, 'tasks') # Indicamos que vista se va a registrar en la API y le damos un nombre a la vista para poder acceder a ella desde la URL de la API

urlpatterns = [
    path('api/v1/', include(routers.urls)) # Indicamos que las URL de la API se van a registrar en la URL api/v1,
]

# Configuracion de URL del proyecto
- Debemos ingresar al proyecto y dentro del archivo urls.py modificar de la siguiente manera

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('tasks/', include('tasks.urls')), # Incluimos las URL de la aplicacion tasks en las URL del proyecto. El primera parametro es la URL que se va a utilizar para acceder a las URL de la aplicacion tasks y el segundo parametro es la URL de la aplicacion tasks
]

# probar la api
- debemos solicitar con peticion Get a la siguiente url
http://localhost:8000/tasks/api/v1/tasks

# Extra Documentacion de APi
- Tambien podremos documentar los metodos definidos en la API a través del modulo core api para esto deberemos ejecutar el siguiente comando
pip install coreapi

- para configurarlo, debemos modificar el archivo settings.py donde debemos agregarlo de la siguiente manera

INSTALLED_APPS = [
    ////////,
    'coreapi',
    'nameApp',
]

- ahora dentro del archivo de urls.py de la aplicación agregaremos la siguiente dirección
path('docs/', include_docs_urls(title='Tasks API'))

- posteriormente debemos configurar el archivo settings.py donde debemos agregarlo al final de la siguiente manera

REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
}

- en casos de error instalar
pip install setuptools

- para ver los resultados ingresamos a
http://127.0.0.1:8000/tasks/docs/

## FRONTEND

# Instalacion del Frontend
- para iniciar un proyecto ejecutamos
npm create vite

-> nombre del proyecto
-> tecnologia
-> lenguaje

- completados los pasos tendremos el proyecto para comenzar a trabajar
- ingresar al proyecto y ejecutamos el siguiente comando
npm install

- terminado debemos ejecutar
npm run dev

- instalaremos el modulo para tener multiples paginas en el frontend
npm i react-router-dom

- instalaremos el modulo para generar mensajes con cada acción
npm i react-hot-toast

-instalaremos el modulo para poder hacer peticiones en el navegador
npm i axios

- instalaremos el modulo para validar el input generado en el frontend
npm i react-hook-form

# Limpiando el espacio de trabajo

- debemos ingresar a los archivos App.jsx , App.css y index.css y borrar el contenido

# Estructurando la web
- dentro el proyecto debemos ingresar a la carpeta "src" y seguir los siguientes pasos:

- 1º debemos crear una carpeta llamada "pages" para almacenar las paginas
- 2º debemos crear una carpeta llamada "components" que almacenaran fraciones de interfaz
- 3º debemos crear una carpeta llamada "api" para definir que funciones podran realizar solicitudes al backend

// con rfc en vscode podemos agregar estructura de react automaticamente

# Conexion con la API del backend con el Frontend
- dentro la carpeta api creamos un archivo llamado "tasks.api.js" , este archivo nos permitira realizar la conexión la API, como vemos en el ejemplo

import axios from 'axios';

export const getAllTasks =( ) => {
    return axios.get('http://localhost:8000/tasks/api/v1/tasks/')
}

- ahora tendremos que dirigirnos al archivo settings.py del proyecto del backend y modificar el siguiente paramentro

CORS_ALLOWED_ORIGINS = ["http://127.0.0.1:5173"]

- Este paso permitira autorizar la conexion del backend con el frontend

# Extra Formulario
- Para validar datos de un formulario mas a detalle podemos usar las librerias de yup y zod

- al momento de enviar los datos a la API, recordar que deben tener los mismos campos para evitar errors de envio

