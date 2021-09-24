import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoGastoPageRoutingModule } from './nuevo-gasto-routing.module';

import { NuevoGastoPage } from './nuevo-gasto.page';
import { AppMaterialModule } from 'src/app/app-material.module';
import { InicioPage } from 'src/app/paginas/inicio/inicio.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoGastoPageRoutingModule,
    AppMaterialModule
  ],
  declarations: [NuevoGastoPage],
  providers:[InicioPage]
})
export class NuevoGastoPageModule {}
