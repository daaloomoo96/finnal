import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoRetoPage } from './nuevo-reto.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoRetoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoRetoPageRoutingModule {}
