import { Component } from '@angular/core';
import { GastosPage } from 'src/app/paginas/gastos/gastos.page';
import { InicioPage } from 'src/app/paginas/inicio/inicio.page';
import { ServicioService } from 'src/app/servicios/servicio.service';



@Component({
  selector: 'app-nuevo-gasto',
  templateUrl: './nuevo-gasto.page.html',
  styleUrls: ['./nuevo-gasto.page.scss'],
})
export class NuevoGastoPage {


  nombre: string;
  coste: number;
  dia: number;
  tipo: "Mensual" | "Trimestral" | "Anual";
  mes: number;
  ano: number;


  constructor(private s: ServicioService) {

    this.nombre = "";
    this.coste = 0;
    this.dia = 0;
    this.tipo = "Mensual";
    this.mes = 0;
    this.ano = new Date().getFullYear();
  }



  async anadirGasto() {

    if (this.nombre.trim().length == 0) {
      this.s.mostrarAviso('middle', "end", "El nombre no puede quedarse vacío!", "aceptar");
    } else {

      if (await this.s.sf.comprobarExisteGasto(this.nombre)) {
        this.s.mostrarAviso('middle', "end", "Ya existe un gasto con este nombre!", "aceptar");
      } else {
        if (this.coste <= 0) {
          this.s.mostrarAviso('middle', "end", "Este gasto no puede tener ese precio!", "aceptar");
        } else {
          if (this.dia <= 0 || this.dia > 31) {
            this.s.mostrarAviso('middle', "end", "Este gasto debe cobrarse en un día real!", "aceptar");
          } else {

            if (this.s.sf.usuario.gastoTotal + this.coste > this.s.sf.usuario.ingresoMensual) {

              this.s.mostrarAlertConfirmacion("Aviso!", "Con este nuevo gasto se excederá el ingreso Mensual!\n¿Continuar?", "Continuar", async () => {

                await this.añadirGastoAuxiliar();

              });
            } else {
              await this.añadirGastoAuxiliar();

            }
          }
        }
      }
    }
  }

  private async añadirGastoAuxiliar() {

    if (this.tipo == "Mensual") {
      await this.s.sf.añadirGasto(this.nombre, { id: this.nombre, precio: this.coste, dia: this.dia, tipo: this.tipo, estado: "Pendiente", ano: this.ano });

    } else {

      if (this.mes < 1 || this.mes > 12) {
        this.s.mostrarAviso('middle', "end", "Este gasto debe tener un mes real!", "aceptar");

      } else {

        if (this.tipo == 'Anual') {

          await this.s.sf.añadirGasto(this.nombre, { id: this.nombre, precio: this.coste, dia: this.dia, tipo: this.tipo, estado: "Pendiente", mes: this.mes, ano: this.ano });

        } else {

          await this.s.sf.añadirGasto(this.nombre, { id: this.nombre, precio: this.coste, dia: this.dia, tipo: this.tipo, estado: "Pendiente", meses: this.meses(), ano: this.ano });
        }
      }
    }
    this.s.modalController.dismiss();
    this.s.comprobarNotificaciones();
    this.s.sC.hacerGastosPorTipo();
    this.s.sC.hacerDisponibleGastado();
    this.s.sC.hacerGastosPorTipoM();
    this.s.sC.hacerDisponibleGastadoM();
    this.s.sC.hacerGastosRetos();
    this.s.sC.hacerGastosRetosM();
  }

  private meses(): number[] {

    let meses = [];
    meses.push(this.mes);

    for (let i = 0; i < 2; i++) {
      this.mes += 4;
      if (this.mes > 12) {
        this.mes -= 12;
        meses.push(this.mes);
      } else {
        meses.push(this.mes);
      }
    }
    this.mes == 0;
    return meses;

  }


  cancelar() {
    this.s.modalController.dismiss();
  }

}
