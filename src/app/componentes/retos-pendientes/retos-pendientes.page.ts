import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { RetoCompartido } from 'src/app/esquemas/usuario.esquema';

import { ServicioService } from 'src/app/servicios/servicio.service';

@Component({
  selector: 'app-retos-pendientes',
  templateUrl: './retos-pendientes.page.html',
  styleUrls: ['./retos-pendientes.page.scss'],
})
export class RetosPendientesPage {

  constructor(private s: ServicioService) { }

  async aceptarReto(reto: RetoCompartido) {
    await this.s.sf.aceptarReto(reto);

    this.s.sf.usuario.retos.pendientes.length == 0?this.s.modalController.dismiss():"nada";
  }

  rechazarReto(reto: RetoCompartido) {
    this.s.sf.rechazarReto(reto);
  }


  /*--------------- Tabla */
  ordenarTabla(sort: Sort) {

    this.s.sf.usuario.retos.pendientes = this.s.sf.usuario.retos.pendientes.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.s.sf.usuario.retos.pendientes = this.s.sf.usuario.retos.pendientes.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return this.compare(a.id, b.id, isAsc);
        case 'creador': return this.compare(a.idCreador, b.idCreador, isAsc);
        case 'ahorro': return this.compare(a.ahorroNecesario, b.ahorroNecesario, isAsc);
        default: return 0;
      }
    });

  }
  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }




}
