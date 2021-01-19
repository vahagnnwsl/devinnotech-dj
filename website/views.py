from django.shortcuts import render
from .forms import OrderForm, ContactForm
from django.views.decorators.http import require_http_methods
from .helpers import create_response


@require_http_methods(["GET"])
def index(request):
    return render(request, 'website/pages/index.html', {'form': OrderForm, 'contactForm': ContactForm})


@require_http_methods(["POST"])
def order(request):
    return create_response(OrderForm(request.POST), request, 'website/mails/order.html')


@require_http_methods(["POST"])
def contact(request):
    return create_response(ContactForm(request.POST), request, 'website/mails/contact.html')
