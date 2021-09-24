import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetosPageRoutingModule } from './retos-routing.module';

import { RetosPage } from './retos.page';
import { AppMaterialModule } from 'src/app/app-material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetosPageRoutingModule,
    AppMaterialModule
  ],
  declarations: [RetosPage]
})
export class RetosPageModule {}
