from django import forms

from .helpers import get_site_types_for_form_select


class OrderForm(forms.Form):
    name = forms.CharField(label='Ваше имя', max_length=100,
                           widget=forms.TextInput(attrs={'class': "form-input", 'placeholder': 'Ваше имя'}),
                           required=True)
    phone = forms.CharField(label='+7(__) __-____', max_length=100,
                            widget=forms.TextInput(attrs={'class': "form-input", 'placeholder': '+7(__) __-____'}),
                            required=True)
    email = forms.EmailField(label='Эл. почта', max_length=100,
                             widget=forms.EmailInput(attrs={'class': "form-input", 'placeholder': 'Эл. почта'}),
                             required=True)

    site_type = forms.ChoiceField(
        choices=get_site_types_for_form_select(),
        widget=forms.Select(attrs={'class': "form-input"}),
        required=True
    )


class ContactForm(forms.Form):
    name = forms.CharField(label='Ваше имя', max_length=100, required=True)
    email = forms.EmailField(label='Эл. почта', max_length=100, required=True)
    question = forms.CharField(label='Вопрос', widget=forms.Textarea, required=True)


