from django import forms
from .models import Coach


class CoachForm(forms.ModelForm):
    class Meta:
        model = Coach
        fields = '__all__'
