from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Event(models.Model):
    id          = models.AutoField(primary_key=True)
    title       = models.CharField(max_length=200)
    description = models.TextField()
    location    = models.CharField(max_length=200)
    start_time  = models.DateTimeField()
    end_time    = models.DateTimeField()
    capacity    = models.IntegerField()
    created_at  = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Ticket(models.Model):
    id                = models.AutoField(primary_key=True)
    event             = models.ForeignKey(
                            'evms.Event',          
                            on_delete=models.CASCADE,
                            related_name='tickets'
                        )
    user              = models.ForeignKey(User, on_delete=models.CASCADE)
    quantity          = models.PositiveIntegerField()
    booking_time      = models.DateTimeField(auto_now_add=True)
    confirmation_code = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return f"{self.user.username} – {self.event.title} ({self.quantity} seat(s))"