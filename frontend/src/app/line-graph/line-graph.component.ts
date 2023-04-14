import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartOptions, GraphModel } from 'src/assets/models/graphModel';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent implements OnInit {
  @Input('graphData') graphData : GraphModel[] = []

  chartOptions :ChartOptions
  constructor() { 
    this.chartOptions = {
      series:[],
      xaxis: {
        categories: [
        ]
      },
      chart: {
        width:1050,
        height: 450,
        type: "line",
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false,
        formatter:(val)=>{
          console.log(val);
          val = Number(val);
          return val.toExponential()
        }
      },
      stroke: {
        curve: "straight"
      },
      title: {
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },

    }
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
    if(changes && changes['graphData'].currentValue){
      this.chartOptions.series =[]
      changes['graphData'].currentValue.map((element:GraphModel)=>{
        this.chartOptions.series?.push({name: element.label,data: element.yAxis})
       
      });   

      this.chartOptions.xaxis = { type: "numeric",
        
      }
    }
  }

}
