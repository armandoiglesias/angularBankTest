import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BankingService } from 'src/app/service/banking.service';
import { SharedDataService } from 'src/app/service/share-data.service';
import { AddFundsComponent } from '../add-funds/add-funds.component';
import { TransferFundsComponent } from '../transfer-funds/transfer-funds.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  AccountTypeName: String = "...";
  AvailableAmount : Number = 0;
  AccountNumber:String ="...";

  currentCostumer: any;
  

  constructor(public dialog: MatDialog, private bService : BankingService, private ss: SharedDataService) { }

  loadData(){
    let customerId: Number = this.currentCostumer.id;

    this.bService.getCustomer(customerId).subscribe( customerAccount =>{
      this.AccountNumber = customerAccount["accountNumber"];
      this.AvailableAmount = customerAccount["availableAmount"];
      this.AccountTypeName = customerAccount["accountType.name"];
    } )

    // let customerAccount = this.bService.getCustomer(customerId);
    // this.AccountNumber = customerAccount.accountNumber;
    // this.AvailableAmount = customerAccount.availableAmount;
    // this.AccountTypeName = customerAccount.accountType.name;
  }

  ngOnInit(): void {

    this.ss.currentMessage.subscribe( user =>{
      this.currentCostumer = user;
      console.log(user);
      this.loadData();
    } );
    
  }

  openAddFundDialog(movementTypeId = 1): void {
    const dialogRef = this.dialog.open( AddFundsComponent , {
      width: '450px', 
      data: {"movementTypeId" : movementTypeId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('result', result);
      if(result == null || result == undefined){
        // cancelar
      }else{
        this.loadData();
      }
      //this.animal = result;
    });
  }

  openTransferFundDialog(): void {
    const dialogRef = this.dialog.open( TransferFundsComponent , {
      width: '450px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('result', result);
      if(result == null || result == undefined){
        // cancelar
      }else{

      }
      //this.animal = result;
    });
  }

}
