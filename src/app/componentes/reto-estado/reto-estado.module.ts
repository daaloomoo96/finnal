import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetoEstadoPageRoutingModule } from './reto-estado-routing.module';

import { RetoEstadoPage } from './reto-estado.page';

import { AppMaterialModule } from "../../app-material.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetoEstadoPageRoutingModule,
    AppMaterialModule
  ],
  declarations: [RetoEstadoPage]
})
export class RetoEstadoPageModule {}
