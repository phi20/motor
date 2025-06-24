from rest_framework import serializers
from .models import Brand, Series, ReducerType, Product


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'


class SeriesSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(read_only=True)
    brand_id = serializers.PrimaryKeyRelatedField(queryset=Brand.objects.all(), source='brand', write_only=True)

    class Meta:
        model = Series
        fields = ['id', 'name', 'brand', 'brand_id']


class ReducerTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReducerType
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(read_only=True)
    brand_id = serializers.PrimaryKeyRelatedField(queryset=Brand.objects.all(), source='brand', write_only=True)

    series = SeriesSerializer(read_only=True)
    series_id = serializers.PrimaryKeyRelatedField(queryset=Series.objects.all(), source='series', write_only=True)

    reducer_type = ReducerTypeSerializer(read_only=True)
    reducer_type_id = serializers.PrimaryKeyRelatedField(queryset=ReducerType.objects.all(), source='reducer_type', write_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'model_number',
            'rated_torque', 'rated_speed', 'rated_voltage', 'rated_power',
            'stator_diameter', 'stator_thickness', 'gear_ratio',
            'price', 'image', 'created_at',
            'brand', 'brand_id', 'series', 'series_id', 'reducer_type', 'reducer_type_id'
        ]
