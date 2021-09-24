import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetoEstadoPage } from './reto-estado.page';

const routes: Routes = [
  {
    path: '',
    component: RetoEstadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetoEstadoPageRoutingModule {}
