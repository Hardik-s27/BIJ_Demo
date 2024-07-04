from django.contrib import admin
from .models import UserProfile

class ProfileModalAdmin(admin.ModelAdmin):
    list_display = ['contact_info','password']

admin.site.register(UserProfile,ProfileModalAdmin)

