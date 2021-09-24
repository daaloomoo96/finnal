import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IniciarSesionPage } from './iniciar-sesion.page';

const routes: Routes = [
  {
    path: '',
    component: IniciarSesionPage
  },
  {
    path: 'base',
    loadChildren: () => import('../../base/base.module').then( m => m.BasePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IniciarSesionPageRoutingModule {}
