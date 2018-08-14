import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ChartsModule } from 'ng2-charts';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FIREBASE_INFO } from './firebase.info';

/*var firebaseConf = {
    apiKey: "AIzaSyCCFZOdqqvShmIWeWXwnjCa3xniqmR7ES4",
    authDomain: "msc-gosh.firebaseapp.com",
    databaseURL: "https://msc-gosh.firebaseio.com",
    projectId: "msc-gosh",
    storageBucket: "msc-gosh.appspot.com",
    messagingSenderId: "178497536702"
}*/

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    SettingsPage,
    TabsPage
  ],
  imports: [
  BrowserModule,
  IonicModule.forRoot(MyApp),
  ChartsModule,
  AngularFireAuthModule,
  AngularFireModule.initializeApp(FIREBASE_INFO),
  AngularFireDatabaseModule
],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    SettingsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
