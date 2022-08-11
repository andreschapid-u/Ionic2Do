import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { Dialogs } from '@ionic-native/dialogs/ngx';


export const firebaseConfig = {
  apiKey: "AIzaSyCQTs3s_qqtbKgRG_40vAY_pF-dSVIcp6o",
  authDomain: "ionic2do-ef8a0.firebaseapp.com",
  databaseURL: "https://ionic2do-ef8a0-default-rtdb.firebaseio.com",
  projectId: "ionic2do-ef8a0",
  storageBucket: "ionic2do-ef8a0.appspot.com",
  messagingSenderId: "373328709553",
  appId: "1:373328709553:web:23dd29c5d655d873a49f90",
  measurementId: "G-JH34HSW3D3"
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
  ],
  providers: [Dialogs,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
