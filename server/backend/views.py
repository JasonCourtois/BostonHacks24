from django.http import JsonResponse
from django.http import JsonResponse, Http404
from rest_framework.decorators import api_view
from .models import School, Space
from .serializers import SpaceSerializer

def test_endpoint(rquest):
    return JsonResponse({"message": "Hello From Backend!"})

@api_view(['GET'])
def get_space_data(request, schoolname, spacename):
    try:
        school = School.objects.get(name=schoolname)
        space = Space.objects.get(school=school, name=spacename)
    except School.DoesNotExist:
        raise Http404("School not found")
    except Space.DoesNotExist:
        raise Http404("Space not found")

    serializer = SpaceSerializer(space)
    return JsonResponse(serializer.data)

def update_count(request, schoolname, spacename, action):
    school = School.objects.get(name=schoolname)
    space = Space.objects.get(school = school, name = spacename)

    if action == 'increment':
        if space.current_count < space.max_capacity:
            space.current_count += 1
            space.save()
            return JsonResponse({'status': 'success', 'current_count': space.current_count})
        else:
            return JsonResponse({'status': 'error', 'message': 'Max capacity reached'}, status=400)
    
    if action == 'decrement':
        if space.current_count > 0:
            space.current_count -= 1
            space.save()
            return JsonResponse({'status': 'success', 'current_count': space.current_count})
        else:
            return JsonResponse({'status': 'error', 'message': 'Max capacity reached'}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid action'}, status=400)



@api_view(['GET'])
def get_school_data(request, schoolname):
    try:
        school = School.objects.get(name=schoolname)
    except School.DoesNotExist:
        raise Http404("School not found")
    
    # Prepare the response data
    response_data = {
        'name': school.name,
        'primary_color': school.primary_color,
        'text_color': school.text_color,
        'logo_url': school.logo.url, #Return path here to logo in my static folder
    }

    return JsonResponse(response_data)


@api_view(['GET'])
def get_all_schools(request):
    schools = School.objects.values_list('name', flat=True)  # Retrieve only the names
    return JsonResponse(list(schools), safe=False)

@api_view(['GET'])
def get_spaces_by_school(request, schoolname):
    try:
        school = School.objects.get(name=schoolname)
        spaces = school.spaces.values_list('name', flat=True)  # Retrieve only the names
    except School.DoesNotExist:
        raise Http404("School not found")

    return JsonResponse(list(spaces), safe=False)