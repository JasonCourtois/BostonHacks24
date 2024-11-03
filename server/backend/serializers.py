from rest_framework import serializers
from .models import School, Space, Amenity

class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = ['name']

class SpaceSerializer(serializers.ModelSerializer):
    amenities = AmenitySerializer(many=True, read_only=True)

    class Meta:
        model = Space
        fields = ['name', 'current_count', 'max_capacity', 'week_history', 'amenities']

class SchoolSerializer(serializers.ModelSerializer):
    spaces = SpaceSerializer(many=True, read_only=True)

    class Meta:
        model = School
        fields = ['name', 'logo', 'primary_color', 'text_color']
