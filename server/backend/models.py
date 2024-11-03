from django.db import models

class Amenity(models.Model):
    name = models.CharField(max_length=255, primary_key=True)

    def __str__(self):
        return self.name

class School(models.Model):
    name = models.CharField(max_length=255, primary_key=True)
    logo = models.ImageField(upload_to='logos/')
    primary_color = models.CharField(max_length=7)  # Store as hex code, e.g., "#004F9F"
    text_color = models.CharField(max_length=7)     # Store as hex code, e.g., "#FFFFFF"

    def __str__(self):
        return self.name

class Space(models.Model):
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='spaces')
    name = models.CharField(max_length=255)  # Removed primary_key=True
    amenities = models.ManyToManyField(Amenity, related_name='spaces')
    current_count = models.IntegerField(default=1)
    max_capacity = models.IntegerField(default=1)
    week_history = models.JSONField(default=dict)  # Dictionary with timestamps and counts

    class Meta:
        unique_together = ('school', 'name')  # Ensure uniqueness of name per school

    def __str__(self):
        return f"{self.name} - {self.school.name}"
