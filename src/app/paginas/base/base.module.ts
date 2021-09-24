import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BasePageRoutingModule } from './base-routing.module';

import { BasePage } from './base.page';
import { AppMaterialModule } from 'src/app/app-material.module';
import { InicioPage } from '../inicio/inicio.page';
import { CalendariosPage } from '../calendarios/calendarios.page';
import { GastosPage } from '../gastos/gastos.page';
import { RetosPage } from '../retos/retos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppMaterialModule,
    BasePageRoutingModule
  ],
  declarations: [BasePage,InicioPage,CalendariosPage,GastosPage,RetosPage],
  providers:[GastosPage]
})
export class BasePageModule {}
