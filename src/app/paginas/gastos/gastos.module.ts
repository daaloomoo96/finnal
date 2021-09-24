import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GastosPageRoutingModule } from './gastos-routing.module';

import { GastosPage } from './gastos.page';
import { AppMaterialModule } from 'src/app/app-material.module';
import { InicioPage } from '../inicio/inicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GastosPageRoutingModule,
    AppMaterialModule
  ],
  declarations: [GastosPage],
  providers:[InicioPage]
})
export class GastosPageModule {}
