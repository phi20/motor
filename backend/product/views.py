from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Brand, Series, ReducerType, Product
from .serializers import BrandSerializer, SeriesSerializer, ReducerTypeSerializer, ProductSerializer


class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer


class SeriesViewSet(viewsets.ModelViewSet):
    queryset = Series.objects.all()
    serializer_class = SeriesSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['brand']


class ReducerTypeViewSet(viewsets.ModelViewSet):
    queryset = ReducerType.objects.all()
    serializer_class = ReducerTypeSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related('brand', 'series', 'reducer_type').all().order_by('id')
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = {
        'brand': ['exact'],
        'series': ['exact'],
        'reducer_type': ['exact'],
        'name': ['icontains'],
        'rated_torque': ['gte', 'lte'],
        'rated_speed': ['gte', 'lte'],
        'rated_voltage': ['gte', 'lte'],
        'rated_power': ['gte', 'lte'],
        'stator_diameter': ['gte', 'lte'],
        'stator_thickness': ['gte', 'lte'],
        'gear_ratio': ['gte', 'lte'],
        'price': ['gte', 'lte'],
    }
    ordering_fields = ['id', 'rated_torque', 'rated_speed', 'rated_voltage', 'rated_power', 
                      'stator_diameter', 'stator_thickness', 'gear_ratio', 'price']
    search_fields = ['name', 'model_number', 'description']
