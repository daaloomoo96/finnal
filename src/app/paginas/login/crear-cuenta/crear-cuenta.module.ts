import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearCuentaPageRoutingModule } from './crear-cuenta-routing.module';

import { CrearCuentaPage } from './crear-cuenta.page';
import { AppMaterialModule } from 'src/app/app-material.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AppMaterialModule,
    CrearCuentaPageRoutingModule
  ],
  declarations: [CrearCuentaPage]
})
export class CrearCuentaPageModule {}
