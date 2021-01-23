from django.db import models
import uuid
from django.contrib.auth.models import User


class Picture(models.Model):
    """
    Class contains the data about uploaded picture belonging to particular user.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    image = models.ImageField(upload_to="media/images")
    caption = models.CharField(max_length=500)
    date = models.DateField(auto_now=False, auto_now_add=True)
    is_profile = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="pictures")

    def __str__(self):
        return f"{self.date} --- {self.caption}"
