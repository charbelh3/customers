import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../Models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) {
  }

  domain = 'https://charbel-customer-api.herokuapp.com';

  GetAllCustomers() {
    let url = this.domain + '/customers';
    return this.http.get<Customer[]>(url)
  }


  GetCustomerById(id) {
    let url = this.domain + '/customer';

    let params = new HttpParams().set("id", id.toString());
    return this.http.get(url, { params: params })
  }


  CreateNewCustomer(customer: Customer) {
    let url = this.domain + '/add-customer';
    let body = customer;

    return this.http.post(url, body);
  }

  EditExistingCustomer(customer: Customer) {
    let url = this.domain + '/update-customer';
    let body = customer;
    return this.http.put(url, body);
  }

  DeleteCustomer(id) {
    let url = this.domain + '/delete-customer';
    let params = new HttpParams().set("id", id.toString());

    return this.http.delete(url, { params: params });
  }

}
