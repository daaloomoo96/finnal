import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CalendarioPageRoutingModule } from './calendario-routing.module';
import { CalendarioPage } from './calendario.page';



import { NgCalendarModule  } from 'ionic2-calendar';
 
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs,LOCALE_ID);







@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarioPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [CalendarioPage],
  providers: [{ provide: LOCALE_ID, useValue: 'es-Es' }]
})
export class CalendarioPageModule {}
