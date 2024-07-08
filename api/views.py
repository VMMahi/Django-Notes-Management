from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

#View to create a new note
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer#Calling the Noteserilaizer to serialize the data received here
    permission_classes = [IsAuthenticated]#You can reach the route to create a note only when you are authenticated, so isAuthencticated is used

    #Function to get all the notes created by this user only
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author = user)
    
    #Create a new note for the authenticated user, before that this function validates the data for the notes.
    def perform_create(self, serializer):#you're passing in the serializer i.e Noteserializer as an argument here
        if serializer.is_valid():#if all fields are valid then add note for that auhtor, with additional fields author
            serializer.save(author = self.request.user)
        else:
            print(serializer.errors)

#Delte a note from the user account
class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer#get the Noteserializer
    permission_classes = [IsAuthenticated]#only for authenticated users

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author = user) #Delete a note only from that user account
    
    



        


# Create your views here.
#when you're passing something as an argument to a class, then that is the class from which you're current class inherits from
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()#You're going to get all the objects(users) from the database to check and confirm that you are not returning a redundant copy of an already existing user.
    serializer_class = UserSerializer# This class tell the view to accept what kind of data, here it is the username and password.
    permission_classes = [AllowAny]# who can call this View to create user.