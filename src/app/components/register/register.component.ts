import { Component, OnInit } from '@angular/core';
import { BankingService } from 'src/app/service/banking.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RutValidator } from 'ng2-rut';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide:boolean = true;
  fb:FormGroup;
  message: any;

  constructor( private bservice:BankingService,
    public router: Router,
    rutValidator: RutValidator, private _snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.fb = new FormGroup({
      fullName : new FormControl('', [ Validators.required ]),
      rut : new FormControl('', [ Validators.required ] ),
      email : new FormControl('', [ Validators.required, Validators.email ]),
      pwd : new FormControl('', [ Validators.required ]),
    });
  }

  addCustomer(){
    this.bservice.addCustomer({
      Email : this.fb.get("email").value , 
      FullName : this.fb.get("fullName").value,
      Pwd : this.fb.get("pwd").value,
      Rut : this.fb.get("rut").value,
      id : 0 
    }).subscribe( result => {
      if(result["result"]){
        this.resetForm();
        this._snackBar.open( result["message"] );
      }else{
        const snackBar =  this._snackBar.open( result["message"], "Ir a Login" ); 
        snackBar.onAction().subscribe( ()=> {
          //
          this.router.navigate(['login']);
        } );
       
      }
    });
   
  }
  resetForm(){
    this.fb.reset();
  }

}
