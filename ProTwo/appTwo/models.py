from django.db import models

# Create your models here.


class Users(models.Model):
    first_name = models.CharField(max_length=264)
    last_name = models.CharField(max_length=264)
    e_mail = models.CharField(max_length=264)

    def __str__(self): #string representation
        return self.first_name+" "+self.last_name+" ("+self.e_mail+")"


class Topic(models.Model): #inherit van class models.Model
    top_name = models.CharField(max_length=264,unique=True)

    def __str__(self):
        return self.top_name
