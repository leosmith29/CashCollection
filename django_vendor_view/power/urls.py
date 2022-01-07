from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('', views.login, name='signin'),
    path('login/api', views.login_api, name='login_api'),
    path('send_request', views.send_request, name='post_data'),
    path('logout', views.logout, name='logout'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('api_request/', views.api_request, name='api_request'),
    path('get_table/<str:sql>', views.tables_call, name='get_table'),
    path('pages_register/', views.pages_register, name='pages_register'),
    path('transaction/', views.transaction, name='transaction'),
    path('vendor_form/', views.vendor_form, name='vendor_form'),
    path('vendor_tables/', views.vendor_tables, name='vendor_tables'),
    path('test_payment/', views.test_payment, name='test_payment'),
    path('smartPay/', views.account_search, name='smart_pay_search'),
    path('account/', views.findAccount, name='account_search'),
    path('paystack/<int:trans_ref>/', views.paystack_payment, name='paystack'),
    path('payment/', views.payment_page, name='payments'),
    path('test_paystack/', views.test_paystack, name='test_paystack'),
    path('test_request/', views.test_request, name='test_request'),
    path('licences/', views.licences, name='licences'),
]

