from django.urls import path, include
# Importamos la funcion path para poder definir las URL de la API y la funcion include para poder incluir las URL de la API en las URL del proyecto
from rest_framework import routers
# Importamos el enrutador de la API que es el que nos permite registrar las vistas en la API
from rest_framework.documentation import include_docs_urls
# Importamos la funcion include_docs_urls para poder incluir la documentacion de la API en las URL del proyecto
from tasks import views
# Importamos las vistas de la aplicacion tasks


#versionado de api es api/v1 este puede cambiarse de nombre
routers = routers.DefaultRouter()
routers.register(r'tasks', views.TaskViewSet, 'tasks') # Indicamos que vista se va a registrar en la API y le damos un nombre a la vista para poder acceder a ella desde la URL de la API

urlpatterns = [
    path('api/v1/', include(routers.urls)),
    # Indicamos que las URL de la API se van a registrar en la URL api/v1,
    path('docs/', include_docs_urls(title='Tasks API'))
    # Dentro definimos la URL de la documentacion de la API en donde el primer parametro es la URL que se va a utilizar para acceder a la documentacion de la API y el segundo parametro es el titulo de la documentacion de la API este segundo parametro es opcional y se utiliza para darle un titulo a la documentacion de la API
]
