import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Movement } from 'src/app/interfaces/movement';
import { MovementType } from 'src/app/interfaces/movementType';
import { BankingService } from 'src/app/service/banking.service';
import { SharedDataService } from 'src/app/service/share-data.service';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit {

  constructor( private bservice:BankingService, private ss:SharedDataService ) { }
  data : Movement[] = [];

  displayedColumns = ['id', 'fecha', 'descripcion', 'monto'];
  dataSource = new MatTableDataSource<Movement>(this.data);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {

    this.ss.currentMessage.subscribe( user =>{
      this.bservice.getCustomer( user.id ).subscribe( data =>{
        this.data.push(...data["movement"]); 
      } );
      
    } )

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  changeItem($event){
    //console.log($event);
    let data =this.data;
    switch($event.value){
      case "income":
        data = data.filter( x => x.type.id == 1  );
        this.dataSource.data = data;
        break;
      case "debit": 
        data = data.filter( x => x.type.id == 2  );
        this.dataSource.data = data;
        // console.log(data);
        break;
      default:
        this.dataSource.data = data;
        break;
    }
  }

}