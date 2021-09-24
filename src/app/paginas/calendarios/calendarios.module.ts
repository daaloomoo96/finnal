import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendariosPageRoutingModule } from './calendarios-routing.module';

import { CalendariosPage } from './calendarios.page';





import { NgCalendarModule  } from 'ionic2-calendar';
import { CalendarioPageModule } from '../../componentes/calendario/calendario.module';
 
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/es';
registerLocaleData(localeDe);



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendariosPageRoutingModule,
    NgCalendarModule,
    CalendarioPageModule
  ],
  declarations: [CalendariosPage],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-ES' }
  ]
})
export class CalendariosPageModule {}
