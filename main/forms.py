from django import forms
from django.contrib.auth.models import User
from .models import Article


class ArticleForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = ['title', 'content', 'category', 'image']
        widgets = {
            'title': forms.TextInput(attrs={
                'placeholder': 'Maqala sarlavhasini kiriting...',
                'class': 'admin-input'
            }),
            'content': forms.Textarea(attrs={
                'placeholder': 'Maqala mazmunini kiriting...',
                'class': 'admin-textarea',
                'rows': 10
            }),
            'category': forms.Select(attrs={'class': 'admin-select'}),
            'image': forms.FileInput(attrs={'class': 'admin-file'}),
        }
        labels = {
            'title': 'Basi',
            'content': 'Mazmuni',
            'category': 'Kategoriya',
            'image': 'Foto',
        }
