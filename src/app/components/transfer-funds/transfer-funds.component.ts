import { Component, Inject, OnInit } from '@angular/core';
import { BankingService } from 'src/app/service/banking.service';
import { Customer } from 'src/app/interfaces/customer';
import { SharedDataService } from 'src/app/service/share-data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transfer-funds',
  templateUrl: './transfer-funds.component.html',
  styleUrls: ['./transfer-funds.component.css']
})
export class TransferFundsComponent implements OnInit {

  accountType : String = "";
  availableAmount : Number = 0;

  dest : Customer[];

  currentCustomer:Customer;

  constructor(private bService : BankingService, private ss:SharedDataService, public dialogRef: MatDialogRef<TransferFundsComponent>,
    @Inject(MAT_DIALOG_DATA) public data ) { }

    form:FormGroup;

  ngOnInit(): void {


    this.ss.currentMessage.subscribe( user => {
      this.currentCustomer = user;

      let customerId = this.currentCustomer.id;
      this.dest= this.bService.getCustomers(customerId)  ;

      this.bService.getCustomer(customerId).subscribe( customer =>{
        this.availableAmount = customer["availableAmount"];
        this.accountType = customer["accountType"]["name"];
      } );


      this.form = new FormGroup({
        amount: new FormControl('', [ Validators.required, Validators.min(1), Validators.max(  this.availableAmount.valueOf()) ]) 
      })
      
    })


    
  }

  close(){
    this.dialogRef.close();
  }

}
