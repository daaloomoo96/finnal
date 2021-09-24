import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetosPendientesPage } from './retos-pendientes.page';

const routes: Routes = [
  {
    path: '',
    component: RetosPendientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetosPendientesPageRoutingModule {}
