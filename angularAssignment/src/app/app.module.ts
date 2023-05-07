import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { NgChartsModule } from 'ng2-charts'
import { HttpClientModule } from '@angular/common/http';
import { ChartComponent } from './chart/chart.component';
import { TableComponent } from './table/table.component'

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
