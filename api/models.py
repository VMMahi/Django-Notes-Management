from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)#auto populates the date and time
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")#links user to the notes related to only that user collection.(One to Many relationship)

    def __str__(self):
        return self.title
    