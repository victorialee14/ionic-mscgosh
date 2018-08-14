import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ViewChild } from '@angular/core';
import firebase from 'firebase';

import 'chartjs-plugin-streaming';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild('lineCanvas') lineCanvas;
  private lineChart: any;
  items;
  xArray: any[] = [];
  yArray: any[] = [];

  @ViewChild('barCanvas') barCanvas;
  private barChart: any;

  @ViewChild('doughnutCanvas') doughnutCanvas;
  private doughnutChart: any;
  items2;
  xArray2: any[] = [];
  yArray2: any[] = [];

  constructor(public navCtrl: NavController, private db: AngularFireDatabase) {
      //selects data from chart node
      this.items = firebase.database().ref('chart/data').orderByKey();
      this.items.on('value', (snapshot) => {
        //empty array and repopulate when adding new data
        this.xArray.splice(0, this.xArray.length);
        this.yArray.splice(0, this.yArray.length);
        //adds data to array
        snapshot.forEach((childSnapshot) => {
          this.xArray.push(childSnapshot.key);
          this.yArray.push(childSnapshot.val());
        });
        this.basicLineChart(this.xArray, this.yArray);
        this.basicBarChart(this.xArray, this.yArray);
      });

      /*this.items2 = firebase.database().ref('chart/threatleveldata').orderByKey();
      this.items2.on('value', (snapshot) => {
        //empty array and repopulate when adding new data
        this.xArray2.splice(0, this.xArray2.length);
        this.yArray2.splice(0, this.yArray2.length);
        //add data to array
        snapshot.forEach((childSnapshot) => {
          this.xArray2.push(childSnapshot.key);
          this.yArray2.push(childSnapshot.val());
        });
        this.basicDoughnutChart(this.xArray2, this.yArray2);
      });*/
    }

    //key is xArray, value is yArray
    basicLineChart(key, value) {
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: key,
          datasets: [{
          label: "Threat Events",
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(72,138,255,0.4)',
          borderColor: 'rgba(72,138,255,1)',
          borderCapStye: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(72,138,255,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 8,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(72,138,255,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 10,
          data: value,
          spanGaps: false,
        }]
      },
      options: {
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Year'
            }
          }],
        }
      }
    });
    }

    basicBarChart(key, value) {
      this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: key,
          datasets: [{
          label: "Threat Events",
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(72,138,255,0.4)',
          borderColor: 'rgba(72,138,255,1)',
          /*borderCapStye: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(72,138,255,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 8,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(72,138,255,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 10,*/
          data: value,
          /*spanGaps: false,*/
        }]
      },
      options: {
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Year'
            }
          }],
        }
      }
    });
    }

    /*basicDoughnutChart(key, value) {
      this.barChart = new Chart(this.doughnutCanvas.nativeElement, {
        type: 'doughnut',
        data: {
          labels: key,
          datasets: [{
          label: "Threat Events",*/
         /* fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(72,138,255,0.4)',
          borderColor: 'rgba(72,138,255,1)',*/
          /*borderCapStye: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(72,138,255,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 8,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(72,138,255,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 10,*/
          //data: value,
          /*spanGaps: false,*/
     /*   }]
      },
      options: {
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Year'
            }
          }],
        }
      }
    });
    }*/

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
        duration: 20000, 
                refresh: 1000,   
                delay: 1000,   
                pause: false, 
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
public doughnutChartData:number[] = [55, 65, 30];
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
  { // grey
    backgroundColor: 'rgba(148,159,177,0.2)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
   },
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