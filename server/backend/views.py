from django.http import JsonResponse

def test_endpoint(rquest):
    return JsonResponse({"message": "Hello From Backend!"})