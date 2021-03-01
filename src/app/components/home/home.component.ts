import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/service/share-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentCustomer:any = null;

  constructor( private ss:SharedDataService, public router: Router ) { }

  ngOnInit(): void {
    this.ss.currentMessage.subscribe( user =>{
      this.currentCustomer = user;
    } );

    if(!this.currentCustomer ){
      this.router.navigate([""]);
    }
    
  }

}
