from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json

# Importacion de modelos agregados
from primerComponente.models import PrimerTabla

# Importacion de serializadores
from primerComponente.serializers import PrimerTablaSerializer

# Create your views here.
class PrimerTablaList(APIView):
    def responseCustom(self, msg, response, status):
        datas = {
            'msg': msg,
            'pay_load': response,
            'status': status
        }
        res = json.dumps(datas)
        responseSuccess = json.loads(res)
        return responseSuccess

    def get(self, request, format = None):
        queryset = PrimerTabla.objects.all()
        serializer = PrimerTablaSerializer(queryset, many = True, context = {'request': request})
        res = self.responseCustom("Successful", serializer.data, status = status.HTTP_200_OK)
        # return Response(serializer.data)
        return Response(res)

    def post(self, request, format = None):
        serializer = PrimerTablaSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            datas = serializer.data
            res = self.responseCustom("Successful", serializer.data, status = status.HTTP_200_OK)
            # return Response(datas, status = status.HTTP_201_CREATED)
            return Response(res)
        res = self.responseCustom("Error", serializer.data, status = status.HTTP_400_BAD_REQUEST)
        # return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        return Response(res)

class PrimerTablaDetail(APIView):
    def get_object(self, pk):
        try:
            return PrimerTabla.objects.get(pk = pk)
        except PrimerTabla.DoesNotExist:
            return "No Existe"

    def get(self, request, pk, format = None):
        idResponse = self.get_object(pk)
        if idResponse != "No Existe":
            idResponse = PrimerTablaSerializer(idResponse)
            return Response(idResponse.data, status = status.HTTP_200_OK)
        return Response("No hay datos", status = status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk, format = None):
        idResponse = self.get_object(pk)
        serializer = PrimerTablaSerializer(idResponse, data = request.data)
        if serializer.is_valid():
            serializer.save()
            datas = serializer.data
            return Response(datas, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format = None):
        idResponse = self.get_object(pk)
        if idResponse != "No Existe":
            idResponse.delete()
            return Response("Eliminado Correctamente", status = status.HTTP_200_OK)
        return Response("No se pudo eliminar", status = status.HTTP_400_BAD_REQUEST)