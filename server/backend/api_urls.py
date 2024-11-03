from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path('test/', views.test_endpoint, name='test_endpoint'),
    path('schools/<str:schoolname>/spaces/<str:spacename>/', get_space_data, name='get_space_data'),
    path('schools/<str:schoolname>/spaces/<str:spacename>/<str:action>', views.update_count, name='update_count'),

    path('schools/<str:schoolname>/spaces/', get_spaces_by_school, name='get_spaces_by_school'),
    path('schools/<str:schoolname>/', get_school_data, name='get_school_data'),
    path('schools/', get_all_schools, name='get_all_schools'),
]
