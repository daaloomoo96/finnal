import { Component } from '@angular/core';
import { NuevoGastoPage } from 'src/app/componentes/nuevo-gasto/nuevo-gasto.page';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { Sort } from '@angular/material/sort';
import { Gasto } from 'src/app/esquemas/usuario.esquema';


@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})

export class GastosPage {


  verTabla: boolean;
  clase: string;
  mesesNombre = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  mesActual = new Date().getMonth()+1;



  constructor(private s: ServicioService) {

    this.verTabla = true;

    this.clase = "verde";

  }


  /*--------------- Tabla */
  ordenarTabla(sort: Sort) {

    this.s.sf.usuario.gastos = this.s.sf.usuario.gastos.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.s.sf.usuario.gastos = this.s.sf.usuario.gastos.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return this.compare(a.id, b.id, isAsc);
        case 'precio': return this.compare(a.precio, b.precio, isAsc);
        case 'dia': return this.compare(a.dia, b.dia, isAsc);
        case 'tipo': return this.compare(a.tipo, b.tipo, isAsc);
        case 'estado': return this.comparar(a.estado, b.estado, isAsc);
        default: return 0;
      }
    });

  }
  ordenarTablaA(sort: Sort) {

    this.s.sf.usuario.gastosDelMes = this.s.sf.usuario.gastosDelMes.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.s.sf.usuario.gastosDelMes = this.s.sf.usuario.gastosDelMes.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return this.compare(a.id, b.id, isAsc);
        case 'precio': return this.compare(a.precio, b.precio, isAsc);
        case 'dia': return this.compare(a.dia, b.dia, isAsc);
        case 'tipo': return this.compare(a.tipo, b.tipo, isAsc);
        case 'estado': return this.comparar(a.estado, b.estado, isAsc);
        default: return 0;
      }
    });

  }
  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private comparar(as: string, bs: string, isAsc: boolean) {

    let valoreS = [as, bs];
    let valores = new Array<number>();

    for (let i = 0; i < valoreS.length; i++) {

      switch (valoreS[i]) {

        case "Pendiente":
          valores[i] = 1;
          break;

        case "Cercano":
          valores[i] = 2;
          break;

        case "Pagado":
          valores[i] = 3;
          break;

        case "SinPagar":
          valores[i] = 4;
          break;
      }
    }
    return (valores[0] < valores[1] ? -1 : 1) * (isAsc ? 1 : -1);
  }




  anadirGasto() {
    this.s.mostrarModal(NuevoGastoPage);
  }


  editarGastoPrecio(id: string) {

    this.s.mostrarAlertConInput("Cambiar precio", "Nuevo precio:", "number", (dato) => {

      if (dato.name <= 0) {
        this.s.mostrarAviso("middle", "end", "No se puede establecer ese precio!", "aceptar");
      } else if (this.s.sf.usuario.gastoTotal + dato.name > this.s.sf.usuario.ingresoMensual) {
        this.s.mostrarAlertConfirmacion("Cuidado!", "Con este nuevo precio se excederá el ingreso mensual!\n¿Continuar?", "Continuar", () => {
          this.s.sf.editarGasto(id, { precio: Number(dato.name) });
        });
      } else {
        this.s.sf.editarGasto(id, { precio: Number(dato.name) });

      }
    });

  }

  editarGastoDia(id: string) {
    this.s.mostrarAlertConInput("Cambiar dia", "Nuevo dia:", "number", async (dato) => {

      if (dato.name <= 0 || dato.name > 31) {
        this.s.mostrarAviso("middle", "end", "Debe establecer un día válido!", "aceptar");
      } else {
        await this.s.sf.editarGasto(id, { dia: Number(dato.name) });
        this.s.comprobarNotificaciones();
      }
    });

  }

   editarGastoTipo(id: string) {

     this.s.mostrarConfirmarConEntrada("Cambiar Tipo de Gasto", "",
      [
        { name: "nombre", type: "radio", label: "Mensual", value: "Mensual" },
        { name: "nombre", type: "radio", label: "Trimestral", value: "Trimestral" },
        { name: "nombre", type: "radio", label: "Anual", value: "Anual" }
      ], async (tipo) => {
        if (tipo == "Trimestral" || tipo == "Anual") {

          await this.s.mostrarConfirmarConEntrada("Selección de mes", "Elige el mes de inicio de este gasto", [{ name: "name", type: "text" }],
            async (mes) => {

              if (tipo == "Anual") {
                await this.s.sf.editarGasto(id, { tipo: tipo, mes: Number(mes.name), ano: new Date().getFullYear() });
              } else {
                await this.s.sf.editarGasto(id, { tipo: tipo, meses: this.meses(Number(mes.name)) });
              }
              this.s.comprobarNotificaciones();
            });
        } else {
          await this.s.sf.editarGasto(id, { tipo: tipo });
          this.s.comprobarNotificaciones();
        }
      });
  }

  async pagar(g: Gasto) {

    if (g.estado != "Pagado") {
      await this.s.sf.editarGasto(g.id, { estado: "Pagado" });
    } else {
      await this.s.sf.editarGasto(g.id, { estado: "Pendiente" });
    }
    this.s.comprobarNotificaciones();
  }


  async eliminar(id: string) {

    await this.s.mostrarAlertConfirmacion("Cuidado!", "Realmente desea eliminar este gasto?", "Confirmar", async () => {

      await this.s.sf.eliminarGasto(id);
      this.s.comprobarNotificaciones();
    });
    /* this.sortedData = this.s.sf.usuario.gastos.slice(); */
  }




  private meses(mes: number) {
    let meses = [];
    meses.push(mes);

    for (let i = 0; i < 2; i++) {
      mes += 4;
      if (mes > 12) {
        mes -= 12;
        meses.push(mes);
      } else {
        meses.push(mes);
      }
    }
    return meses;
  }

}
