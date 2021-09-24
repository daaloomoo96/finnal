import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'crear-cuenta',
    loadChildren: () => import('./paginas/login/crear-cuenta/crear-cuenta.module').then(m => m.CrearCuentaPageModule)
  },
  {
    path: 'iniciar-sesion',
    loadChildren: () => import('./paginas/login/iniciar-sesion/iniciar-sesion.module').then(m => m.IniciarSesionPageModule)
  },
  {
    path: 'base',
    loadChildren: () => import('./paginas/base/base.module').then(m => m.BasePageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./paginas/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'calendarios',
    loadChildren: () => import('./paginas/calendarios/calendarios.module').then( m => m.CalendariosPageModule)
  },
  {
    path: 'gastos',
    loadChildren: () => import('./paginas/gastos/gastos.module').then( m => m.GastosPageModule)
  },
  {
    path: 'nuevo-gasto',
    loadChildren: () => import('./componentes/nuevo-gasto/nuevo-gasto.module').then( m => m.NuevoGastoPageModule)
  },
  {
    path: 'calendario',
    loadChildren: () => import('./componentes/calendario/calendario.module').then( m => m.CalendarioPageModule)
  },
  {
    path: 'retos',
    loadChildren: () => import('./paginas/retos/retos.module').then( m => m.RetosPageModule)
  },
  {
    path: 'nuevo-reto',
    loadChildren: () => import('./componentes/nuevo-reto/nuevo-reto.module').then( m => m.NuevoRetoPageModule)
  },
  {
    path: 'retos-pendientes',
    loadChildren: () => import('./componentes/retos-pendientes/retos-pendientes.module').then( m => m.RetosPendientesPageModule)
  },
  {
    path: 'reto-estado',
    loadChildren: () => import('./componentes/reto-estado/reto-estado.module').then( m => m.RetoEstadoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
