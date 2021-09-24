import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BasedatosModule } from "../../../basedatos/basedatos.module";

import { IniciarSesionPageRoutingModule } from './iniciar-sesion-routing.module';

import { IniciarSesionPage } from './iniciar-sesion.page';

import { AppMaterialModule } from 'src/app/app-material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppMaterialModule,
    IniciarSesionPageRoutingModule,
    BasedatosModule
  ],
  declarations: [IniciarSesionPage]
})
export class IniciarSesionPageModule {}
