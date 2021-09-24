import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetosPendientesPageRoutingModule } from './retos-pendientes-routing.module';

import { RetosPendientesPage } from './retos-pendientes.page';
import { AppMaterialModule } from 'src/app/app-material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetosPendientesPageRoutingModule,
    AppMaterialModule
  ],
  declarations: [RetosPendientesPage]
})
export class RetosPendientesPageModule {}
