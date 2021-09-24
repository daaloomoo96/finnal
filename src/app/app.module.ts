import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { FormsModule } from '@angular/forms';
import { InicioPage } from './paginas/inicio/inicio.page';
import { HttpClientModule } from '@angular/common/http'; 
import { AppMaterialModule } from './app-material.module';
import { BasedatosModule } from './basedatos/basedatos.module';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppMaterialModule,
    BasedatosModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },InicioPage,AppMaterialModule],
  bootstrap: [AppComponent],
  exports:[FormsModule]
})
export class AppModule {}
