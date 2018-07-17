import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';

import 'chartjs-plugin-streaming';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public date: string = new Date().toDateString();

  datasets: any[] = [{
    data: [3,5,9,10],
    label: 'Dataset 1'
  }, {
    data: [2,6,32,1],
    label: 'Dataset 2'
  }];
  options: any = {
    scales: {
      xAxes: [{
        type: 'realtime'
      }]
    }
  };
 
    constructor(public navCtrl: NavController) {
 
    }
 
    public barChartOptions:any = {
  scaleShowVerticalLines: false,
  responsive: true
};
public barChartLabels:string[] = ['2012', '2013', '2014', '2015', '2016', '2017', '2018'];
public barChartType:string = 'bar';
public barChartLegend:boolean = true;

public barChartData:any[] = [
  {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
  {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
];

// events
public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
}

public randomize():void {
  // Only Change 3 values
  let data = [
    Math.round(Math.random() * 100),
    59,
    80,
    (Math.random() * 100),
    56,
    (Math.random() * 100),
    40];
  let clone = JSON.parse(JSON.stringify(this.barChartData));
  clone[0].data = data;
  this.barChartData = clone;
}

// Doughnut
public doughnutChartLabels:string[] = ['Data 1', 'Data 2', 'Data 3'];
public doughnutChartData:number[] = [350, 450, 100];
public doughnutChartType:string = 'doughnut';
}