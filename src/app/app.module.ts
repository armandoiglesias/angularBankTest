import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AccountComponent } from './components/account/account.component';

import { MatCardModule , MatCardContent } from "@angular/material/card";
import { MatTableModule  } from "@angular/material/table";
import { MatPaginatorModule  } from "@angular/material/paginator";
import { MatTooltipModule  } from "@angular/material/tooltip";
import { MatButtonToggleModule  } from "@angular/material/button-toggle";
import { MatSliderModule  } from "@angular/material/slider";
import { MatFormFieldModule  } from "@angular/material/form-field";
import { MatDialogModule  } from "@angular/material/dialog";
import { MatSelectModule  } from "@angular/material/select";
import { MatInputModule  } from "@angular/material/input";
import { MatMenuModule  } from "@angular/material/menu";
import { MatIconModule  } from "@angular/material/icon";
import { MatDividerModule  } from "@angular/material/divider";
import { MatGridListModule  } from "@angular/material/grid-list";
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS  } from "@angular/material/snack-bar";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { MovementsComponent } from './components/movements/movements.component';
import { AddFundsComponent } from './components/add-funds/add-funds.component';
import { TransferFundsComponent } from './components/transfer-funds/transfer-funds.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { Ng2Rut } from 'ng2-rut';
import { HomeComponent } from './components/home/home.component';
import { SharedDataService } from './service/share-data.service';


@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    MovementsComponent,
    AddFundsComponent,
    TransferFundsComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent, TransferFundsComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    AppRoutingModule, Ng2Rut,
    MatSliderModule, MatFormFieldModule, MatDialogModule,MatSelectModule,MatInputModule, MatMenuModule,
    NoopAnimationsModule, MatCardModule, MatTableModule, MatTooltipModule, MatPaginatorModule, MatButtonToggleModule,
    MatIconModule, MatDividerModule, MatGridListModule, MatSnackBarModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 7000}},
    SharedDataService
  ],
  bootstrap: [AppComponent, AddFundsComponent, TransferFundsComponent]
})
export class AppModule { }
