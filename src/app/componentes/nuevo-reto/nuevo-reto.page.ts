import { Component } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { RetoCompartido, RetoPropio } from "../../esquemas/usuario.esquema";

@Component({
  selector: 'app-nuevo-reto',
  templateUrl: './nuevo-reto.page.html',
  styleUrls: ['./nuevo-reto.page.scss'],
})
export class NuevoRetoPage {

  nombre: string;
  coste: number;
  aportacion: number;
  fecha: Date;
  participante: string;
  aceptados: Array<string>;
  pendientes: Array<string>;

  constructor(private s: ServicioService) {

    this.nombre = "";
    this.coste = 0;
    this.aportacion = 0;
    this.fecha = new Date();
    this.participante = "";
    this.aceptados = new Array<string>();
    this.aceptados.push(s.sf.usuario.id);
    this.pendientes = new Array<string>();
  }

  async AnadirParticipante() {


    if (this.participante.trim() != "") {
      if (!(await this.s.sf.comprobarExisteUsuario(this.participante))) {
        await this.s.mostrarAviso('middle', "end", "Este usuario no existe!", "Aceptar!");

      } else {
        if (this.participante == this.s.sf.usuario.id) {
          await this.s.mostrarAviso('middle', "end", "Ya formas parte de los participantes!", "Aceptar!");
        } else {
          let seguir = true;
          this.pendientes.forEach(p => {

            if (p == this.participante) {
              this.s.mostrarAviso('middle', "end", "Este participante ya está incluido!", "Aceptar!");
              seguir = false;
              return true;
            }
          });

          if (seguir) {
            this.pendientes.push(this.participante);
            this.participante = "";
          }
        }
      }
    }

  }


  async anadirReto() {
    let a = new Date();
    /*  let anoA=a.getFullYear(), mesA=a.getMonth(),diaA=a.getDate();
     let anoU= this.fecha.getFullYear(),mesU=this.fecha.getMonth(),diaU=this.fecha.getDate(); */

    if (this.nombre.trim().length == 0) {
      this.s.mostrarAviso('middle', "end", "El nombre no puede quedarse vacío!", "aceptar");
    } else {

      if (await this.s.sf.comprobarExisteReto(this.nombre)) {
        this.s.mostrarAviso('middle', "end", "Ya existe un reto con este nombre!", "aceptar");
      } else {
        if (this.coste <= 0) {
          this.s.mostrarAviso('middle', "end", "Este reto no puede tener este objetivo!", "aceptar");
        } else {
          if (this.aportacion <= 0) {
            this.s.mostrarAviso('middle', "end", "Este reto no puede tener esta aportacion!", "aceptar");
          } else {

            if (this.fecha <= a) {
              this.s.mostrarAviso('middle', "end", "Debe seleccionar una fecha válida!", "aceptar");
            } else {

              let reto: RetoPropio = {
                id: this.nombre,
                idCompartido: this.nombre + " (" + this.s.sf.usuario.id + ")",
                idCreador: this.s.sf.usuario.id,
                ahorroNecesario: this.coste,
                aporte: this.aportacion,
                aporteIndividualTotal: this.aportacion,
                aporteTotal: this.aportacion,
                fecha: String(this.fecha),
                aceptados: this.aceptados,
                pendientes: this.pendientes
              }

              this.añadirreto(reto);

              if (this.pendientes.length > 0) {

                let retoC: RetoCompartido = {
                  id: this.nombre + " (" + this.s.sf.usuario.id + ")",
                  idReal: this.nombre,
                  idCreador: this.s.sf.usuario.id,
                  ahorroNecesario: this.coste,
                  aporte: this.aportacion,
                  fecha: String(this.fecha),
                  aceptados: reto.aceptados
                };


                this.pendientes.forEach(usu => {

                  this.s.sf.enviarRetoCompartido(usu, retoC);

                });
                this.s.mostrarAviso('middle', "end", "Se mostrarán los participantes que hayan aceptado el reto", "Aceptar");
              }
              this.s.modalController.dismiss();

            }
          }
        }
      }
    }
  }

  private async añadirreto(reto: RetoPropio) {
    await this.s.sf.añadirRetoPropio(reto);
    this.s.sC.hacerGastosRetosM();
    this.s.sC.hacerGastosRetos();
    this.s.sC.disponibleGastado();
    this.s.sC.hacerDisponibleGastadoM();
  }
  cancelar() {
    this.s.modalController.dismiss();
  }
}
