from django.db import models
from django.contrib.auth.models import User


class Article(models.Model):
    CATEGORY_CHOICES = [
        ('jamisyet', 'Jámiyet'),
        ('siyasat', 'Siyasat'),
        ('ekonomika', 'Ekonomika'),
        ('sport', 'Sport'),
        ('madeniyat', 'Mádeniyat'),
        ('siyahat', 'Siyahat'),
    ]

    title = models.CharField(max_length=300)
    content = models.TextField()
    image = models.ImageField(upload_to='articles/', blank=True, null=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='jamisyet')
    created_at = models.DateTimeField(auto_now_add=True)
    views = models.PositiveIntegerField(default=0)
    likes = models.ManyToManyField(User, related_name='liked_articles', blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    @property
    def like_count(self):
        return self.likes.count()

    @property
    def read_time(self):
        word_count = len(self.content.split())
        minutes = max(1, round(word_count / 200))
        return minutes
