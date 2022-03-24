from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import exceptions
import os.path
import json
from loadImage.serializers import imageSerializer
from loadImage.models import imageModel

# Create your views here.
class loadImage(APIView):
    def responseCustom(self, msg, response, status):
        data ={
            "msg": msg,
            "pay_load": response,
            "status": status,
        }
        res= json.dumps(data)
        responseSuccess = json.loads(res)
        return responseSuccess

    def post(self, request):
        if 'url_img' not in request.data:
            raise exceptions.ParseError("No se ha seleccionado un archivo")

        archivo = request.data['url_img']
        name, formato = os.path.splitext(archivo.name)
        request.data['name_img'] = name
        request.data['format_img'] = formato
        serializer = imageSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(self.responseCustom("Successful", serializer.data, status = status.HTTP_201_CREATED))
        return Response(self.responseCustom("Error", serializer.errors, status = status.HTTP_400_BAD_REQUEST))

    def get(self, request, format=None):
        queryset = imageModel.objects.all()
        serializer = imageSerializer(queryset , many = True, context = {'request':request})
        response= self.responseCustom("Successful", serializer.data, status = status.HTTP_200_OK)
        return Response(response)

class imageDetail(APIView):
    def responseCustom(self, msg, response, status):
        data ={
            "msg": msg,
            "pay_load": response,
            "status": status,
        }
        res= json.dumps(data)
        responseSuccess = json.loads(res)
        return responseSuccess

    def get_object(self, pk):
        try:
            return imageModel.objects.get(pk = pk)
        except imageModel.DoesNotExist:
            return 0

    def get(self, request, pk, format=None):
        idResponse = self.get_object(pk)
        if idResponse != 0:
            idResponse = imageSerializer(idResponse)
            response= self.responseCustom("Successful", idResponse.data, status = status.HTTP_200_OK)
            return Response(response)
        response= self.responseCustom("No hay archivos", status  =status.HTTP_200_OK)
        return Response(response)

    def put(self, request, pk, format = None):
        idResponse = self.get_object(pk)
        archivo = request.data['url_img']
        name, formato = os.path.splitext(archivo.name)
        request.data['name_img'] = name
        request.data['format_img'] = formato
        serializer = imageSerializer(idResponse, data = request.data)
        if serializer.is_valid():
            serializer.save()
            datas = serializer.data
            response = self.responseCustom("Archivo editado", datas, status = status.HTTP_201_CREATED)
            return Response(response)
        response = self.responseCustom("No se pudo editar el archivo", serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        return Response(response)

    def delete(self, request, pk, format=None):
        idResponse = self.get_object(pk)
        if idResponse != 0:
            idResponse.url_img.delete(save = True)
            idResponse.delete()
            return Response("Archivo eliminado", status = status.HTTP_200_OK)
        response = self.responseCustom("No se pudo eliminar el archivo", status = status.HTTP_400_BAD_REQUEST)
        return Response(response)