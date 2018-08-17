import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Streaming } from 'chartjs-plugin-streaming';

import { TabsPage } from '../pages/tabs/tabs';

import * as tf from '@tensorflow/tfjs';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  rootPage:any = TabsPage;

  linearModel: tf.Sequential;
  prediction: any;

  ngOnInit() {
    this.train();
  }


  async train(): Promise<any> {
     // Define a model for linear regression.
  this.linearModel = tf.sequential();
  this.linearModel.add(tf.layers.dense({units: 1, inputShape: [1]}));

  // Prepare the model for training: Specify the loss and the optimizer.
  this.linearModel.compile({loss: 'meanSquaredError', optimizer: 'sgd'});


  // Training data, completely random stuff
  const xs = tf.tensor1d([3.2, 4.4, 5.5]);
  const ys = tf.tensor1d([1.6, 2.7, 3.5]);


  // Train
  await this.linearModel.fit(xs, ys)

  console.log('model trained!')
}

  predict(val: number) {
  const output = this.linearModel.predict(tf.tensor2d([val], [1, 1])) as any;
  this.prediction = Array.from(output.dataSync())[0]
}

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
