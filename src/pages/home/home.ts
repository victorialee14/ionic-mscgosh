import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import 'chartjs-plugin-streaming';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  datasets: any[] = [{
    data: [3,5,9,10]
  }, {
    data: [2,6,32,1]
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

}
