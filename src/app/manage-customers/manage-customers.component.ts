import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../Services/customers.service';
import { Customer } from '../Models/Customer';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.css']
})
export class ManageCustomersComponent implements OnInit {

  constructor(private customerService: CustomersService) { }
  customers: Customer[];

  ngOnInit(): void {
    this.getCustomersList();
  }

  deleteCustomer(id) {
    this.customerService.DeleteCustomer(id).subscribe(
      () => { this.getCustomersList(); }
    );

  }

  getCustomersList() {
    this.customerService.GetAllCustomers().subscribe(
      (data) => {
        this.customers = data;
      }
    );
  }

}
