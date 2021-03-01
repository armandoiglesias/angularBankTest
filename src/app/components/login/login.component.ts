import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BankingService } from 'src/app/service/banking.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;

  constructor(
    // private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bservice : BankingService,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username : new FormControl('', [ Validators.required ]),
      password : new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
        //await this.authService.login(username, password);
        this.bservice.login({
          Email : "", 
          FullName : "",
          Pwd : password,
          Rut : username, 
          id : 0
        }).subscribe( response =>{
          if( response["result"]  ){
            // login Valido
            this.bservice.changeUser(response["user"]);
            setTimeout(() => {
              this.router.navigate(["home"]);
            }, 2000);
           
          }else{
            this.loginInvalid = true;
          }
        });


        
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }


  }

}
