from django.urls import path
from base.views.product_views import *

urlpatterns = [
    path('', getProducts, name='products'),
    path('<str:pk>/', getProduct, name='product'),
    path('post/create/', createProduct, name='create-product'),
    path('update/<str:pk>/', updateProduct, name='update_product'),
    path('delete/<str:pk>/', deleteProduct, name='product-delete'),
    path('user/list/', listUserProducts, name='user-products'),
]