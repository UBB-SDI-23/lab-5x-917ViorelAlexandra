# Generated by Django 4.1.7 on 2023-05-03 11:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('application', '0008_alter_coach_options_alter_tennisplayer_options_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('u_first_name', models.CharField(max_length=100)),
                ('u_last_name', models.CharField(max_length=100)),
                ('u_date_of_birth', models.DateField()),
                ('u_bio', models.CharField(max_length=500)),
                ('u_location', models.CharField(max_length=100)),
                ('activation_code', models.CharField(max_length=36)),
                ('activation_expiry_date', models.DateTimeField()),
                ('active', models.BooleanField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL, to_field='username')),
            ],
        ),
    ]
