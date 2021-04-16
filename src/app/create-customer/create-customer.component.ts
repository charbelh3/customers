import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../Models/Customer';
import { CustomersService } from '../Services/customers.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private customerService: CustomersService, private pipe: DatePipe,
    private router: Router) { }
  action: string = '';
  name: string = '';
  gender: string = '';
  dateOfBirth: string;
  phoneNumber: string;

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      this.action = params['action'];

      if (this.action == "Edit") {
        let customerID = params['customerID'];

        this.customerService.GetCustomerById(customerID).subscribe(
          (data: any) => {
            if (data != null) {
              this.name = data.name;
              this.gender = data.gender;
              this.dateOfBirth = data.dateOfBirth;
              this.phoneNumber = data.phoneNumber;
            }
          })
      }
    });
  }

  CreateOrEditCustomer() {
    if (this.name == '' || this.phoneNumber == '' || this.dateOfBirth == null || this.gender == '')
      return;


    this.dateOfBirth = this.pipe.transform(this.dateOfBirth, 'MM/dd/yyyy');
    let customer = new Customer(this.name, this.phoneNumber, this.dateOfBirth, this.gender);

    if (this.action == "Create") {

      this.customerService.CreateNewCustomer(customer).subscribe(
        () => {
          this.router.navigate(['/all-customers']);
        })
    }

    else if (this.action == "Edit") {

      customer.id = this.activatedRoute.snapshot.queryParams.customerID;
      this.customerService.EditExistingCustomer(customer).subscribe(
        () => {
          this.router.navigate(['/all-customers']);
        })
    }
  }

}
