import os
# Configure settings for project
# Need to run this before calling models from application!
os.environ.setdefault('DJANGO_SETTINGS_MODULE','ProTwo.settings')

import django
# Import settings
django.setup()

import random
from appTwo.models import Users
from faker import Faker

fakegen = Faker()
# topics = ['Search','Social','Marketplace','News','Games']

# def add_topic():
#     t = Topic.objects.get_or_create(top_name=random.choice(topics))[0]
#     t.save()
#     return t



def populate(N=5):
    '''
    Create N Entries of Dates Accessed
    '''

    for entry in range(N):

        # # Get Topic for Entry
        # top = add_topic()

        # Create Fake Data for entry
        fake_first_name = fakegen.first_name()
        fake_last_name = fakegen.last_name()
        fake_email = fakegen.email()

        # Create new user Entry
        new_user = Users.objects.get_or_create(first_name=fake_first_name,last_name=fake_last_name,e_mail=fake_email)[0]


if __name__ == '__main__':
    print("Populating the databases...Please Wait")
    populate(20)
    print('Populating Complete')
