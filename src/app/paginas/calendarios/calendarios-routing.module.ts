import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendariosPage } from './calendarios.page';

const routes: Routes = [
  {
    path: '',
    component: CalendariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendariosPageRoutingModule {}
