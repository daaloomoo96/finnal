import { Component } from '@angular/core';
import { CalendarioPage } from 'src/app/componentes/calendario/calendario.page';
import { ServicioService } from 'src/app/servicios/servicio.service';

@Component({
  selector: 'app-calendarios',
  templateUrl: './calendarios.page.html',
  styleUrls: ['./calendarios.page.scss'],
})
export class CalendariosPage {

  constructor(private s: ServicioService) { }

  calendarioPagos() {

    this.s.mostrarModal(CalendarioPage,{"cual":"gastos"});
  }
  calendarioRetos() {
    this.s.mostrarModal(CalendarioPage,{"cual":"retos"});
  }
}
