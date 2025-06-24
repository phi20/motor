from django.db import models


class Brand(models.Model):
    name = models.CharField(max_length=100, unique=True)  # Brand name

    def __str__(self):
        return self.name


class Series(models.Model):
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name="series_set")
    name = models.CharField(max_length=100)

    class Meta:
        unique_together = ("brand", "name")

    def __str__(self):
        return f"{self.brand.name} - {self.name}"


class ReducerType(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    series = models.ForeignKey(Series, on_delete=models.CASCADE)
    reducer_type = models.ForeignKey(ReducerType, on_delete=models.SET_NULL, null=True)

    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)

    model_number = models.CharField(max_length=100)

    rated_torque = models.FloatField()
    rated_speed = models.IntegerField()
    rated_voltage = models.FloatField()
    rated_power = models.FloatField()

    stator_diameter = models.FloatField()
    stator_thickness = models.FloatField()

    gear_ratio = models.FloatField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    image = models.ImageField(upload_to='product_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.model_number})"
