from django.contrib.auth.models import User #You're going to use the User model from authenctication to provide jwt for the user and thus the authentication
from rest_framework import serializers
from .models import Note

# to give the user data as json content to the database
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model  = User
        fields = ["id", "username", "password"]#The fields to be seriliazed when you're accepting a new user and return a user.
        extra_kwargs = {"password": {"write_only": True}}# So does it doesn't return the password when returning the user data, can only register password.

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
#What's happening in this function, is that, the validated_data coming from the serilizer
    # coming from class Meta is passed as argument to the creaate function, then here
    # you're setting the user with the credentials by splitting the validated_data as a dictionary
    # then after the new user has been created, it is returned.

#To serialize the notes content into json to give it to the database    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Note
        fields = ["id", "title", "content","created_at", "author"]
        extra_kwargs = {"author": {'read_only':True}}

        