import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentResponse, PaymentResultResponse, PaypalToken } from 'src/app/models/model';
import { convertVNDToUSD } from 'src/app/shared/utils/MoneyUtils';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }),
    params: {},
  };
  constructor(private httpClient: HttpClient) { }

  createToken() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('AaB1UDWcH5cCEVqZiwms5FX4kzAhUpBvi9NFTF3WLAEa-UpodwzS945RW2TfsMcdP10cmjPW71Nz1XWP:EIoQsyiL1FQUa01om6p5-SmLzJouOFTdVyk2j6mAOs-Ju72odIcgohMH5Ca256md80ij6ijLmyw-QA4G')
    });
    const data = 'grant_type=client_credentials';
    return this.httpClient.post<PaypalToken>('https://api.sandbox.paypal.com/v1/oauth2/token', data, { headers });
  }

  createPayment(access_token: string, token_type: string, price: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token_type} ${access_token}`,
      'Paypal-Request-Id': (Math.random() + 1).toString(36).substring(7)
    });

    const data = {
      "intent": "CAPTURE",
      "purchase_units": [
        {
          "reference_id": "d9f80740-38f0-11e8-b467-0ed5f89f718b",
          "amount": {
            "currency_code": "USD",
            "value": convertVNDToUSD(price),
          }
        }
      ],
      "payment_source": {
        "paypal": {
          "experience_context": {
            "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED",
            "payment_method_selected": "PAYPAL",
            "brand_name": "SPRING HOTEL",
            "locale": "en-US",
            "landing_page": "LOGIN",
            // "shipping_preference": "SET_PROVIDED_ADDRESS",
            "user_action": "PAY_NOW",
            "return_url": "http://localhost:4200/checkout/payment/status",
            "cancel_url": "http://localhost:4200/checkout/payment/status"
          }
        }
      }
    };
    return this.httpClient.post<PaymentResponse>('https://api-m.sandbox.paypal.com/v2/checkout/orders', data, { headers });
  }

  getPaymentStatus(access_token: string, payment_id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    });
    return this.httpClient.get<PaymentResultResponse>('https://api-m.sandbox.paypal.com/v2/checkout/orders/' + payment_id, { headers });
  }

  completeOrder(access_token: string, order_id: string, intent: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    });
    return this.httpClient.post('https://api-m.sandbox.paypal.com/v2/checkout/orders/' + order_id + '/' + intent, { headers });
  }


}
