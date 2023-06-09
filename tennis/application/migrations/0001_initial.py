# Generated by Django 4.1.7 on 2023-03-11 09:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TennisPlayer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tp_first_name', models.CharField(max_length=100)),
                ('tp_last_name', models.CharField(max_length=100)),
                ('tp_rank', models.IntegerField()),
                ('tp_date_of_birth', models.DateField()),
                ('tp_country', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Tournament',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('t_name', models.CharField(max_length=100)),
                ('t_country', models.CharField(max_length=100)),
                ('t_start_date', models.DateField()),
                ('t_end_date', models.DateField()),
                ('t_type', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Coach',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('c_first_name', models.CharField(max_length=100)),
                ('c_last_name', models.CharField(max_length=100)),
                ('c_date_of_birth', models.DateField()),
                ('c_years_of_experience', models.IntegerField()),
                ('c_email', models.CharField(max_length=100)),
                ('player', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='application.tennisplayer')),
            ],
        ),
    ]
