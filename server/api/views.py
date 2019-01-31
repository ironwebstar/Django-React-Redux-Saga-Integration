from rest_framework import generics
from rest_framework.views import APIView
from core.models import Client
from .serializers import ClientSerializer


class ListClientView(generics.ListAPIView):
  """
  Provides a get method handler.
  """
  queryset = Client.objects.all()
  serializer_class = ClientSerializer


class ClientCreateView(generics.ListCreateAPIView):
  queryset = Client.objects.all()
  serializer_class = ClientSerializer

  def perform_create(self, serializer):
    serializer.save()


class ClientDetail(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = ClientSerializer

  def get_queryset(self):
    return Client.objects.all()
