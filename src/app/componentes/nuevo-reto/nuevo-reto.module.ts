import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoRetoPageRoutingModule } from './nuevo-reto-routing.module';

import { NuevoRetoPage } from './nuevo-reto.page';
import { AppMaterialModule } from 'src/app/app-material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoRetoPageRoutingModule,
    AppMaterialModule
  ],
  declarations: [NuevoRetoPage]
})
export class NuevoRetoPageModule {}
