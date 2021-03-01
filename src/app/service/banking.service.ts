import { Injectable } from '@angular/core';
import { CustomerAccount } from '../interfaces/customerAccount';
import { AccountType } from './../interfaces/accountType';
import { Customer } from './../interfaces/customer';
import { MovementType } from './../interfaces/movementType';
import { SharedDataService } from './share-data.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  environment } from "../../environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankingService {

  currentCustomer: Customer;

  private customers: Customer[] = [];
  private accounts: AccountType[] = [];
  private movementType: MovementType[] = [];
  private customerAccounts: CustomerAccount[] = []

  URL_SERVICE : String = environment.URL_SERVICE;

  constructor(private ss: SharedDataService, private http: HttpClient, ) {

  }

  getAccounts() {
    return this.accounts;
  }

  getCustomers(userId: Number) {
    return this.customers.filter(x => x.id != userId);
  }

  getMovementTypes(): MovementType[] {
    return this.movementType;
  }

  getCustomerByRut( customer:  Customer ){
    return new Promise<boolean>( (resolve,reject)=>{
      this.http.post( `${ this.URL_SERVICE  }/customerByRut`, {
        rut : customer.Rut
      } ).subscribe( response =>{
        if( response ){
          resolve(true);
        }
      }, error => {
        reject();
      } )
    } );
  }

  getCustomer(customerId: Number) {

    return this.http.post(`${ this.URL_SERVICE  }/customerAccount`,{
      customerId
    });
  }

  addFunds(customerId: Number, amount: number,  movementTypeId : number = 1) {

    this.getCustomer(customerId).subscribe( customer => {
      //let customer = this.getCustomer(customerId);

      let _amount = movementTypeId == 1 ? amount : (amount* -1)
  
      // customer.availableAmount = customer.availableAmount +  _amount;    ;
  
      // customer.movement.push({
      //   amount: amount,
      //   createdAt: new Date(),
      //   type: {
      //     id: movementTypeId,
      //     description: ""
      //   },
      //   id: parseInt((Math.random() * 1000000).toString()) ,
      //   description:  movementTypeId == 1 ? "ABONO A CUENTA" : "RETIRO A CUENTA"
      // });
  
      // let index = this.customerAccounts.findIndex(x => x.customer.id == customerId);
      // //this.customerAccounts[index] = customer;
  
      // return {
      //   customer, result: true
      // };
    });

  }

  addMovement(cust) {

  }

  addCustomer(customer:Customer)  {

    return this.http.post(`${ this.URL_SERVICE  }/customer`, {
      ...customer
    });


  }

  login( customer : Customer){

    return this.http.post( `${ this.URL_SERVICE  }/login`, {
      ...customer
    });
    
  }

  changeUser(user){
    this.ss.changeMessage(user);
  }

}
