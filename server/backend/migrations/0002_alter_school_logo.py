# Generated by Django 5.1.2 on 2024-11-03 04:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='school',
            name='logo',
            field=models.ImageField(upload_to='static/'),
        ),
    ]
