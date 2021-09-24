import { Component } from '@angular/core';
import { NuevoRetoPage } from 'src/app/componentes/nuevo-reto/nuevo-reto.page';
import { RetoEstadoPage } from 'src/app/componentes/reto-estado/reto-estado.page';
import { RetosPendientesPage } from 'src/app/componentes/retos-pendientes/retos-pendientes.page';
import { RetoCompartido, RetoPropio } from 'src/app/esquemas/usuario.esquema';
import { ServicioService } from 'src/app/servicios/servicio.service';

@Component({
  selector: 'app-retos',
  templateUrl: './retos.page.html',
  styleUrls: ['./retos.page.scss'],
})
export class RetosPage {

  constructor(private s: ServicioService) { }

  anadirReto() {
    this.s.mostrarModal(NuevoRetoPage);
  }




  estadoDelRetoP(idC: string, idR: string, idRC: string) {

    this.s.mostrarModal(RetoEstadoPage, { "nombre": idR, "idCreador": idC, "idRetoOriginal": idR, "idRetoCompartido": idRC });

  }
  estadoDelRetoC(idC: string, idR: string, idRC: string) {

    this.s.mostrarModal(RetoEstadoPage, { "nombre": idRC, "idCreador": idC, "idRetoOriginal": idR, "idRetoCompartido": idRC });

  }
  mostrarFecha(reto: RetoPropio) {

    let fecha = new Date(reto.fecha);

    let devolver = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
    return devolver;
  }


  editarAhorroNecesario(r: RetoPropio) {

    this.s.mostrarAlertConInput("Cambiar precio", "Nuevo Ahorro Necesario:", "number", (dato) => {

      if (dato.name <= 0) {
        this.s.mostrarAviso("middle", "end", "No se puede establecer ese precio!", "aceptar");
      } else if (this.s.sf.usuario.gastoTotal + dato.name > this.s.sf.usuario.ingresoMensual) {
        this.s.mostrarAlertConfirmacion("Cuidado!", "Con este nuevo precio se excederá el ingreso mensual!\n¿Continuar?", "Continuar", () => {
          this.s.sf.editarRetoAhorro(r, { ahorroNecesario: Number(dato.name) });
        });
      } else {
        this.s.sf.editarRetoAhorro(r, { ahorroNecesario: Number(dato.name) });

      }
    });
  }

  editarRetoParticipantes(id: string) {

  }


  mostrarRetosPendientes() {
    if (this.s.sf.usuario.retos.pendientes.length == 0) {
      this.s.mostrarAviso('middle', "end", "No tienes invitaciones a retos!", "Aceptar");
    } else {
      this.s.mostrarModal(RetosPendientesPage);
    }
  }
}
