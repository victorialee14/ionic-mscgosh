import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import 'chartjs-plugin-streaming';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  datasets: any[] = [{
    data: []
  }, {
    data: []
  }];
  options: any = {
    scales: {
      xAxes: [{
        type: 'realtime'
      }]
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
