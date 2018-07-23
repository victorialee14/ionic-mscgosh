import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';

import 'chartjs-plugin-streaming';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  //display current date
  public date: string = new Date().toDateString();

  datasets: any[] = [{
    type: 'line',
    data: [Math.random()*100],
    label: 'Series A',
    lineTension: 0,
    borderDash: [8, 4]
  }, {
    type: 'line',
    data: [Math.random()*100],
    label: 'Series B'
  }];
  options: any = {
    scales: {
      xAxes: [{
        type: 'realtime'}],
      plugins: {
      streaming: {
        duration: 20000,    // data in the past 20000 ms will be displayed
                refresh: 1000,      // onRefresh callback will be called every 1000 ms
                delay: 1000,        // delay of 1000 ms, so upcoming values are known before plotting a line
                frameRate: 30,      // chart is drawn 30 times every second
                pause: false,       // chart is not paused

                // a callback to update datasets
                onRefresh: function(chart) {
                    chart.data.datasets[0].data.push({
                        x: Date.now(),
                        y: Math.random() * 100
                    });
                }
            }
        }
    }
}
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
public doughnutChartLabels:string[] = ['Critical', 'Elevated', 'Moderate'];
public doughnutChartData:number[] = [350, 450, 100];
public doughnutChartType:string = 'doughnut';

public lineChartData:Array<any> = [
  {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
  {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
  {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
];
public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
public lineChartOptions:any = {
  responsive: true
};
public lineChartColors:Array<any> = [
  // { // grey
  //   backgroundColor: 'rgba(148,159,177,0.2)',
  //   borderColor: 'rgba(148,159,177,1)',
  //   pointBackgroundColor: 'rgba(148,159,177,1)',
  //   pointBorderColor: '#fff',
  //   pointHoverBackgroundColor: '#fff',
  //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  // },
  { // dark grey
    backgroundColor: 'rgba(77,83,96,0.2)',
    borderColor: '#ff4d4d',
    pointBackgroundColor: '#ff6666',
    pointBorderColor: '#ffb3b3',
    pointHoverBackgroundColor: '#ffb3b3',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  },
  { // dark grey
    backgroundColor: 'rgba(77,83,96,0.2)',
    borderColor: 'rgba(77,83,96,1)',
    pointBackgroundColor: 'rgba(77,83,96,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  },
  { // grey
    backgroundColor: 'rgba(148,159,177,0.2)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }
];
public lineChartLegend:boolean = true;
public lineChartType:string = 'line';

public random():void {
  let _lineChartData:Array<any> = new Array(this.lineChartData.length);
  for (let i = 0; i < this.lineChartData.length; i++) {
    _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
    for (let j = 0; j < this.lineChartData[i].data.length; j++) {
      _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
    }
  }
  this.lineChartData = _lineChartData;
}

}

