# from django.shortcuts import render
# from rest_framework.response import Response
# from .serializers import UserSerializer
# from rest_framework.views import APIView
# from rest_framework import status

from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from rest_framework.permissions import AllowAny
from rest_framework import generics
from rest_framework.views import APIView

# Create your views here.
class RegisterUserAPI(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    # def post(self, request):
    #     serializer = UserSerializer(data = request.data)
    #     if serializer.is_valid():
    #         user = serializer.save()
    #         return Response(serializer.data, status = status.HTTP_201_CREATED)
    #     else:
    #         return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)