from django.contrib import admin
from .models import Brand, Series, ReducerType, Product

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name']

@admin.register(Series)
class SeriesAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'brand']
    search_fields = ['name']
    list_filter = ['brand']

@admin.register(ReducerType)
class ReducerTypeAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name']

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'model_number', 'brand', 'series', 'reducer_type', 'price']
    search_fields = ['name', 'model_number']
    list_filter = ['brand', 'series', 'reducer_type']
