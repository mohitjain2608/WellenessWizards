import {  ApexResponsive, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexGrid, ApexStroke, ApexTitleSubtitle, ApexNonAxisChartSeries } from "ng-apexcharts";

export interface GraphModel{
    label: string;
    xAxis:number;
    yAxis: number[]; 
    dye: string;
}

export interface PieChartModel{
    series: ApexNonAxisChartSeries;
    labels: any;


}

export interface ChartOptions{
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    grid: ApexGrid;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
  };

export interface DropdownOptions{
    itemId:number; 
    itemText:string
}