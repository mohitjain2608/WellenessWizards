import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LineGraphComponent } from './line-graph/line-graph.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { PieChartComponent } from './pie-chart/pie-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    LineGraphComponent,
    PieChartComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgApexchartsModule,
    NgMultiSelectDropDownModule,
    FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
