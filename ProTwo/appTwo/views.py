from django.shortcuts import render
from django.http import HttpResponse
from .models import Users
from . import forms

# Create your views here.
def index(request):
    return HttpResponse("<em>My Second Project</em>")

def help(request):
    helpdict = {'help_insert':'HELP PAGE'}
    return render(request,'appTwo/help.html',context=helpdict)

def connect4(request):
    return render(request,'appTwo/connect.html',{})

# def users(request):
#     return HttpResponse("<em>Dit is de userpagina</em>")

def users(request):
    user_list = Users.objects.order_by('last_name')
    user_dict = {"users_records":user_list}
    return render(request,'appTwo/users.html',user_dict)

def add_users(request):
    form = forms.NewUserForm()

    if request.method == 'POST':
        form = forms.NewUserForm(request.POST)
        if form.is_valid():
            print("validation succesfull!")
            form.save(commit=True)
            return users(request)

    return render(request,'appTwo/newuser.html',{'form':form})
