import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardItemComponent } from './components/dashboard-item/dashboard-item.component';
import { ButtonComponent } from './components/button/button.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { SelectComponent } from './components/select/select.component';
import { HeaderComponent } from './components/header/header.component';
import { DetailItemComponent } from './components/detail-item/detail-item.component';


import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { NgChartsModule } from 'ng2-charts';
import { OverviewComponent } from './components/overview/overview.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTableModule} from '@angular/material/table';
import { CategoryItemComponent } from './components/category-item/category-item.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardItemComponent,
    ButtonComponent,
    AddItemComponent,
    SelectComponent,
    HeaderComponent,
    DetailItemComponent,
    OverviewComponent,
    CategoriesComponent,
    CategoryItemComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxScannerQrcodeModule,
    NgChartsModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
