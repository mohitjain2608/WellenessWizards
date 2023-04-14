import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartOptions, GraphModel, PieChartModel } from 'src/assets/models/graphModel';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @Input('pieChartData') pieChartData : PieChartModel={series:[],labels:[]};

  pieChartOptions: PieChartOptions
  constructor() {
    this.pieChartOptions = {
      series: [],
      chart: {
        width:900,
        height: 300,
        type: "donut"
      },
      labels: ["QuantStudio™ 5 Dx System","QuantStudio™ 7 Dx System"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 100
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
    if(changes && changes['pieChartData'].currentValue){
        this.pieChartOptions.series=changes['pieChartData'].currentValue.series;
        };
        
  }

}


