import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { ManageCustomersComponent } from './manage-customers/manage-customers.component';

const routes: Routes = [
  { path: "", redirectTo: "all-customers", pathMatch: "full" },
  { path: "all-customers", component: ManageCustomersComponent },
  { path: "customer", component: CreateCustomerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
