import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankingService } from './service/banking.service';
import { SharedDataService } from './service/share-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bank-test';

  islogged: boolean = false;
  user:String = "";

  constructor(  private ss : SharedDataService, private router: Router, ){

  }
  ngOnInit(): void {

    this.ss.currentMessage.subscribe( user => {
      this.islogged = user.id == 0  ? false: true;
      this.user = user.FullName ?? "";
    });

  }

  logout(){
    this.islogged = false;
    this.router.navigate([""]);
  }
}
