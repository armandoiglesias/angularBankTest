import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';
import { BankingService } from 'src/app/service/banking.service';
import { SharedDataService } from 'src/app/service/share-data.service';

@Component({
  selector: 'app-add-funds',
  templateUrl: './add-funds.component.html',
  styleUrls: ['./add-funds.component.css']
})
export class AddFundsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddFundsComponent>,
      @Inject(MAT_DIALOG_DATA) public data,
      private bservice: BankingService,
      private ss:SharedDataService
  ) { }

  ngOnInit(): void {

    this.ss.currentMessage.subscribe( usr =>{
      let customerId = usr.id;
      this.bservice.getCustomer(customerId).subscribe( cc =>{
        this.availableAmount = this.data.movementTypeId ==1 ?  Number.MAX_VALUE : cc["availableAmount"]; 
      }) ;
      
      this.form = new FormGroup({
        amount : new FormControl('', [ Validators.max(this.availableAmount), Validators.required, Validators.min(1) ]),
      })
    });

    
  }

  form:FormGroup;

  amount: number =0;
  availableAmount: number =0;
  

  onNoClick(): void {
    this.dialogRef.close();
  }

  addFund(){
    let movementType = this.data.movementTypeId;
    let response = this.bservice.addFunds( this.bservice.currentCustomer.id, this.amount,  movementType );
    // if(response.result == true){
    //   this.dialogRef.close(true);
    // }else{
    //   // Error al transferir
    // }
    
  }

}
