import { formatDate } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { ServicioService } from 'src/app/servicios/servicio.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage {
  eventSource;
  viewTitle: string;
  mostrar: boolean;
  calendar = {
    mode: 'month',
    currentDate: new Date(),
    locale: 'es-Es'
  };



  ngOnInit(): void {

    this.mostrarGastos();
    this.myCal.loadEvents();

  }

  ngOnDestroy(): void {
    this.eventSource = [];


  }
  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  fecha = new Date();
  mes: number;
  ano: number;
  cual: string;

  constructor(private s: ServicioService) {
    this.mostrar = false;
    this.mes = this.fecha.getMonth() + 1;
    this.ano = this.fecha.getFullYear();


  }


  next(evento: Date) {
    this.myCal.slideNext();
    /*  this.mes = evento.getMonth();
     this.ano = evento.getFullYear(); */
    /* this.mes++; */
    /*   this.mostrarGastos(); */
  }

  back(evento: Date) {
    this.myCal.slidePrev();
    /* this.mes = evento.getMonth();
    this.ano = evento.getFullYear(); */
    /*  this.mes--; */
    /*   this.mostrarGastos(); */
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  deslizar(evento: Date) {

    this.mes = evento.getMonth();
    this.ano = evento.getFullYear();
    setTimeout(() => {

      this.mostrarGastos();
      this.myCal.loadEvents();
    }, 300);

    /* alert(this.mes); */
  }


  mostrarGastos() {

    let events = [];

    switch (this.cual) {
      case "gastos":
        this.s.sf.usuario.gastos.forEach(g => {

          if (g.ano <= this.ano) {


            switch (g.tipo) {

              case "Mensual":
                events.push({
                  title: g.id + " - " + g.precio + "€ - " + g.tipo,
                  startTime: new Date(this.ano, this.mes, g.dia),
                  endTime: new Date(this.ano, this.mes, g.dia),
                  allDay: false
                });
                break;

              case "Trimestral":
                if (this.mes + 1 == g.meses[0] || this.mes + 1 == g.meses[1] || this.mes + 1 == g.meses[2]) {
                  events.push({
                    title: g.id + " - " + g.precio + "€ - " + g.tipo,
                    startTime: new Date(this.ano, this.mes, g.dia),
                    endTime: new Date(this.ano, this.mes, g.dia),
                    allDay: false
                  });
                }
                break;
              case "Anual":
                if (this.mes + 1 == g.mes) {
                  events.push({
                    title: g.id + " - " + g.precio + "€ - " + g.tipo,
                    startTime: new Date(this.ano, this.mes, g.dia),
                    endTime: new Date(this.ano, this.mes, g.dia),
                    allDay: false
                  });
                }
                break;
            }
          }
        });
        break;

      case "retos":

        this.s.sf.usuario.retos.propios.forEach(r => {
          let anoR = new Date(r.fecha).getFullYear(), mesR = new Date(r.fecha).getMonth(), diaR = new Date(r.fecha).getDate();
          if (anoR == this.ano && mesR == this.mes) {
            events.push({
              title: r.id + " - Ahorro necesario:" + r.ahorroNecesario + "€ - Ahorro mensual: " + r.aporte + "€",
              startTime: new Date(this.ano, this.mes, new Date(r.fecha).getDate()),
              endTime: new Date(this.ano, this.mes, new Date(r.fecha).getDate()),
              allDay: false
            });
          }
        });
        this.s.sf.usuario.retos.aceptados.forEach(r => {
          let anoR = new Date(r.fecha).getFullYear(), mesR = new Date(r.fecha).getMonth(), diaR = new Date(r.fecha).getDate();
          if (anoR == this.ano && mesR == this.mes) {
            events.push({
              title: r.id + " - Ahorro necesario:" + r.ahorroNecesario + "€ - Ahorro mensual: " + r.aporte + "€",
              startTime: new Date(this.ano, this.mes, new Date(r.fecha).getDate()),
              endTime: new Date(this.ano, this.mes, new Date(r.fecha).getDate()),
              allDay: false
            });
          }
        });
        break;
    }

    this.eventSource = events;
    this.mostrar = true;
  }
}
