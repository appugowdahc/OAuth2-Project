"""
URL configuration for oauth2 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from authentication.urls import urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include(urlpatterns)),
    # path('auth/', include('authentication.urls')),  # For your protected endpoints
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('accounts/', include('allauth.urls')),  # Add this
    path('auth/', include('dj_rest_auth.urls')),  # API endpoints
    path('auth/registration/', include('dj_rest_auth.registration.urls')),  
    
]
