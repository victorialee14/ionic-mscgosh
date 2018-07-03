import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Streaming } from 'chartjs-plugin-streaming';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  datasets: any[] = [{
    label: 'Dataset 1',
    lineTension: 0,
    borderDash: [8, 4]
  }, {
   label: 'Dataset 2'
  }];
  options: any = {
    scales: {
      xAxes: [{
        type: 'realtime'
      }]
    },
    plugins: {
      streaming: {
        onRefresh: function(chart: any) {
          chart.data.datasets.forEach(function(dataset: any) {
            dataset.data.push({
              x: Date.now(),
              y: Math.random()
            });
          });
        },
        delay: 2000
   }
 }
}

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
