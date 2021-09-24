import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { AppMaterialModule } from 'src/app/app-material.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    AppMaterialModule
  ],
  declarations: [InicioPage],
  exports:[InicioPage]
})
export class InicioPageModule {}
