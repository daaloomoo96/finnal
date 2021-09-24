import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

import { NuevoGastoPage } from 'src/app/componentes/nuevo-gasto/nuevo-gasto.page';
import { NuevoRetoPage } from 'src/app/componentes/nuevo-reto/nuevo-reto.page';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { GastosPage } from '../gastos/gastos.page';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})



export class InicioPage implements OnInit {

  estadoPanel: boolean;

  constructor(private s: ServicioService, private pagGasto: GastosPage) {

    this.estadoPanel = false;



  }
  ngOnInit(): void {
    let algo = <HTMLCanvasElement>document.getElementById('idGastosPorTipo');
    let algo2 = algo.getContext('2d');
    this.s.sC.hacerIDGastosPorTipo(algo2);
    this.s.sC.hacerGastosPorTipo();

    algo = <HTMLCanvasElement>document.getElementById('idDisponibleGastado');
    algo2 = algo.getContext('2d');
    this.s.sC.hacerIDisponibleGastado(algo2);
    this.s.sC.hacerDisponibleGastado();

    algo = <HTMLCanvasElement>document.getElementById('idGastosPorTipoM');
    algo2 = algo.getContext('2d');
    this.s.sC.hacerIDGastosPorTipoM(algo2);
    this.s.sC.hacerGastosPorTipoM();

    algo = <HTMLCanvasElement>document.getElementById('idDisponibleGastadoM');
    algo2 = algo.getContext('2d');
    this.s.sC.hacerIDisponibleGastadoM(algo2);
    this.s.sC.hacerDisponibleGastadoM();

    

    algo = <HTMLCanvasElement>document.getElementById('idGastosRetosM');
    algo2 = algo.getContext('2d');
    this.s.sC.hacerIDGastosRetosM(algo2);
    this.s.sC.hacerGastosRetosM();

    algo = <HTMLCanvasElement>document.getElementById('idGastosRetos');
    algo2 = algo.getContext('2d');
    this.s.sC.hacerIDGastosRetos(algo2);
    this.s.sC.hacerGastosRetos();


    
  }



  editarContrasena() {

    this.s.mostrarAlertConInput("Cambiar contraseña", "Nueva contraseña:", "text", async (dato) => {

      if (dato.name.trim().length <= 3) {
        this.s.mostrarAviso("middle", "end", "La contraseña debe tener al menos 4 carácteres!", "aceptar");
      } else {
        console.log("Antes => " + this.s.sf.usuario.gastos);
        await this.s.sf.editarUsuario({ contrasena: dato.name });
        console.log("Después => " + this.s.sf.usuario.gastos);
      }
    });
  }

  async editarIngresoMensual() {

    await this.s.mostrarConfirmarConEntrada("Cambiar Ingreso Mensual", "Nuevo ingreso:", [{ name: "name", type: "number" }], async (dato) => {

      if (Number(dato.name) <= 0) {
        this.s.mostrarAviso('middle', "end", "Ingreso mensual no permitido!", "Aceptar");
      } else {
        await this.s.sf.editarUsuario({ ingresoMensual: Number(dato.name) });
        this.s.sC.hacerDisponibleGastado();
        this.s.sC.hacerDisponibleGastadoM();
        this.s.sC.hacerGastosRetosM();
        this.s.sC.hacerGastosRetos();
      }
    });

  }

  anadirGasto() {
    this.s.mostrarModal(NuevoGastoPage);
  }

  anadirReto(){
    this.s.mostrarModal(NuevoRetoPage)
  }
}

