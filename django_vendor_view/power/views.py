
from functools import wraps
from django.shortcuts import render, redirect
from django.http import JsonResponse,HttpResponse,HttpResponseRedirect
import requests
from django.views.decorators.csrf import csrf_exempt
import requests

def login(request):
    return render(request, "login.html")

def login_only(function):
  @wraps(function)
  def wrap(request, *args, **kwargs):
        
        if 'token' in request.session.keys():
             return function(request, *args, **kwargs)
        else:
            return HttpResponseRedirect('/')

  return wrap
@csrf_exempt
def login_api(request):
    url = "http://0.0.0.0:8001/signin"

    res = requests.post(url,headers={'Content-type':'application/json'},json=request.POST)
    try:
        data = res.json()
        if 'error' in data.keys():
            return HttpResponse("Login Error!!")
        
        request.session['token'] = data['token']
        request.session['username'] = data['username']
        # request.SESSION['api-token'] = 
    except Exception as e:
        return HttpResponse(str(e))
    return HttpResponse("1")

@login_only
def logout(request):
  request.session.pop('token')
  request.session.pop('username')
  return render(request, "login.html")
@csrf_exempt
def send_request(request):
  url = "http://0.0.0.0:8001/signup"
  data = request.POST

  upload = [ (key,data.get(key)) for key in data if key != "csrfmiddlewaretoken" ]
  
  sender = dict(upload)
  res = requests.post(url,headers={'Content-type':'application/json'},json=sender)
  try:
    rec_data = res.json()
    if 'error' in rec_data.keys():
      return HttpResponse(rec_data['error'])

    # request.SESSION['api-token'] = 
  except Exception as e:
    return HttpResponse(str(e))
  return HttpResponse("VALUE INSERTED")

def tables_call(request,sql):
  url = "http://0.0.0.0:8001/get/table?sql=%s" % (sql)
  res = requests.get(url,headers={'Content-type': 'application/json'})
  try:
    data = res.json()

    return JsonResponse({"data":data},safe=True)
    # request.SESSION['api-token'] = 
  except Exception as e:
    return JsonResponse({"data":str(e)},safe=True)

@login_only
def dashboard(request):
    return render(request, "index.html")


@login_only
def licences(request):
    return render(request, "liciense.html")



@login_only
def api_request(request):
    return render(request, "api-request.html")

def account_search(request):
    return render(request, "Documents/energy.html")
def payment_page(request):
    return render(request, "Documents/Payment Details.html")

@csrf_exempt
def findAccount(request):

    url = "http://0.0.0.0:8001/cashcollect/customer/find?account_number=%s" % (request.POST['account_number'])
    rec = requests.request('GET',url,headers={'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBheXN0YWNrMTIiLCJpYXQiOjE2MTE5MDg1NzZ9.phA-rqQxhpAWa5Dyd-tdMRA95scruPfHsYnAq8OG0XU'})
    data = rec.json()
  
    if type(data) != type({}):
        request.session['customer'] = data[0]
        try:
          request.session['customer']['billedamount'] = float(data[0]['billedamount']) * float(data[0]['tariff'])
          print(float(data[0]['tariff']))
        except Exception as e:
          request.session['customer']['billedamount'] = 0
        try:
          request.session['customer']['vat'] = request.session['customer']['billedamount'] * 0.075
        except Exception as e:
          request.session['customer']['vat'] = 0
        request.session['customer']['total'] = request.session['customer']['billedamount'] + request.session['customer']['vat'] + float(request.session['customer']['credit'])
        return HttpResponse("VALUE INSERTED")
    #   else:
    #     return HttpResponse('<p color="red">Error!!!</p>')
    # else:
    return HttpResponse(data['message'])
    
@csrf_exempt
def paystack_payment(request,trans_ref):

    url = "https://api.paystack.co/transaction/verify/%s" % (trans_ref)
    rec = requests.request('GET',url,headers={'Authorization':'Bearer sk_test_8f98d60218f31cff548db6406ea3511a71e362fa'})
    data = rec.json()
    if 'data' in data.keys():
      if data['data']['status'] == 'success':
        datas = {
          "transaction_ref": trans_ref,
          "bill_type": 'postpaid',
          "channel": 'web',
          "payment_mode": data['data']['channel'],
          "amount": data['data']['amount'] / 100,
          "account_number": request.session['customer']['acc_no'],
        }
    headers = {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBheXN0YWNrMTIiLCJpYXQiOjE2MTE5MDg1NzZ9.phA-rqQxhpAWa5Dyd-tdMRA95scruPfHsYnAq8OG0XU"}
    print(data)
    try:
      r = requests.post('http://0.0.0.0:8001/cashcollect/post/collection',data=datas, headers=headers)
      print(r)
      if r.status_code == 200:
        load = r.json()
        return render(request,'Documents/success1.html',{'trans_ref':load['transactionRef']})
    except Exception as e:
      print(e)
    #   else:
    #     return HttpResponse('<p color="red">Error!!!</p>')
    # else:
    return HttpResponse('<p color="red">Error!!!</p>')

@login_only
def pages_register(request):
    return render(request, "pages-register.html")



@login_only
def transaction(request):
    return render(request, "transaction.html")


@login_only
def vendor_form(request):
    return render(request, "vendor-form.html")



@login_only
def vendor_tables(request):
    return render(request, "vendor-tables.html")

def test_payment(request):
  return render(request, "test_payment.html")


def test_paystack(request):
  return render(request, "paystack.component.html")


def test_request(request):
  # print(request.GET)
  if 'data' in request.GET:
    data = {
      "transaction_ref": request.GET['reference'],
      "bill_type": request.GET['bill_type'],
      "channel": request.GET['channel'],
      "payment_mode": request.GET['payment_mode'],
      "amount": float(request.GET['amount']),
      "account_number": request.GET['account_number'],
    }
    headers = {"Authorization": "Bearer " + request.GET['authorization']}
    print(data)
    try:
      r = requests.post('http://0.0.0.0:8001/cashcollect/post/collection',data=data, headers=headers)
      print(r)
      if r.status_code == 200:
        
        # successful, redirect
        return redirect('/test_payment/?status=OK')
        # return render(request, "paystack.component.html")
      else:
        print("Not 200");
        pass
        # return render(request, "paystack.component.html")
        # return redirect('/test_payment/')
        return redirect('/test_payment/?status=ERROR')
    except Exception as e:
      print("Error");
      print(e);
      pass
  return redirect('/test_payment/?status=ERROR')
