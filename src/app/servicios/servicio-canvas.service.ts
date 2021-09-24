import { Injectable } from '@angular/core';
import Chart from 'chart.js/auto';
import { RetoCompartido, RetoPropio } from '../esquemas/usuario.esquema';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioCanvasService {

  verde;

  gastosPorTipo: Chart;
  private idGastosPorTipo: CanvasRenderingContext2D;

  disponibleGastado: Chart;
  private idDisponibleGastado: CanvasRenderingContext2D;

  gastosPorTipoM: Chart;
  private idGastosPorTipoM: CanvasRenderingContext2D;

  disponibleGastadoM: Chart;
  private idDisponibleGastadoM: CanvasRenderingContext2D;

  Aportacion: Chart;
  private idAportacion: CanvasRenderingContext2D;

  gastosRetosM: Chart;
  private idGastosRetosM: CanvasRenderingContext2D;

  gastosRetos: Chart;
  private idGastosRetos: CanvasRenderingContext2D;

  constructor(private sf: FirestoreService) {

  }


  hacerIDGastosPorTipo(id: CanvasRenderingContext2D) {
    this.idGastosPorTipo = id;
    this.gastosPorTipo = new Chart(id);
  }

  hacerIDisponibleGastado(id: CanvasRenderingContext2D) {
    this.idDisponibleGastado = id;
    this.disponibleGastado = new Chart(id);
  }

  hacerIDGastosPorTipoM(id: CanvasRenderingContext2D) {
    this.idGastosPorTipoM = id;
    this.gastosPorTipoM = new Chart(id);
  }

  hacerIDisponibleGastadoM(id: CanvasRenderingContext2D) {
    this.idDisponibleGastadoM = id;
    this.disponibleGastadoM = new Chart(id);
  }

  hacerIDAportacion(id: CanvasRenderingContext2D) {
    this.idAportacion = id;
    this.Aportacion = new Chart(id);
  }

  hacerIDGastosRetosM(id: CanvasRenderingContext2D) {
    this.idGastosRetosM = id;
    this.gastosRetosM = new Chart(id);
  }

  hacerIDGastosRetos(id: CanvasRenderingContext2D) {
    this.idGastosRetos = id;
    this.gastosRetos = new Chart(id);
  }

  /*  'Sin Gastar | '+((this.sf.usuario.ingresoMensual-(this.sf.totalMensual+this.sf.totalTrimestral+this.sf.totalAnual))*100/this.sf.usuario.ingresoMensual)+'% ' 
              'rgba(0, 128, 0, 0.562)'
              'green'
  */

  hacerGastosPorTipo() {
    this.gastosPorTipo.destroy();
    this.gastosPorTipo = new Chart(this.idGastosPorTipo, {
      type: 'pie',
      data: {
        labels: ['Mensual | ' + (this.sf.totalMensual * 100 / this.sf.usuario.gastoTotal).toFixed(1) + '% ',
        'Trimestral | ' + (this.sf.totalTrimestral * 100 / this.sf.usuario.gastoTotal).toFixed(1) + '% ',
        'Anual | ' + (this.sf.totalAnual * 100 / this.sf.usuario.gastoTotal).toFixed(1) + '% '
        ],
        datasets: [{
          data: [this.sf.totalMensual, this.sf.totalTrimestral, this.sf.totalAnual],

          backgroundColor: [
            'rgba(255, 68, 0, 0.8)',
            'rgba(0, 0, 255, 0.8)',
            'rgba(255, 166, 0, 0.8)'
          ],
          borderWidth: 0.5
        }],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Costes de Pagos Totales por Tipo'
          }
        }
      }
    });

  }

  hacerDisponibleGastado() {
    let gastoGeneral = this.sf.usuario.gastoTotal+this.sf.usuario.retos.ahorroTotalMensualAceptados+this.sf.usuario.retos.ahorroTotalMensualPropios;
    let nombres = ["Ingresos"];
    let datos = [this.sf.usuario.ingresoMensual];
    let colores=["rgba(0, 128, 0, 0.8)","rgb(109, 128, 0,0.8)", "rgba(255, 166, 0, 0.8)"];

    if (this.sf.usuario.ingresoMensual >= gastoGeneral) {

      nombres.push('Disponible | ' + ((this.sf.usuario.ingresoMensual - gastoGeneral) * 100 / this.sf.usuario.ingresoMensual).toFixed(1) + '% ');
      datos.push(this.sf.usuario.ingresoMensual -gastoGeneral);

      nombres.push('Gastado | ' + (gastoGeneral * 100 / this.sf.usuario.ingresoMensual).toFixed(1) + '% ');
      datos.push(gastoGeneral);

    } else {
      nombres.push('Disponible | ' + 0 + '% ');
      datos.push(0);

      nombres.push('Gastado | ' + (gastoGeneral * 100 / this.sf.usuario.ingresoMensual).toFixed(1) + '% ');
      datos.push(gastoGeneral);

      nombres.push('Excedido | ' + (gastoGeneral * 100 / this.sf.usuario.ingresoMensual-100).toFixed(1) + '% ');
      datos.push(gastoGeneral - this.sf.usuario.ingresoMensual);
      colores.push("rgba(255, 0, 0, 0.548)");
    }

    this.disponibleGastado.destroy();
    this.disponibleGastado = new Chart(this.idDisponibleGastado, {
      type: 'bar',
      data: {
        labels: nombres,
        datasets: [{
          data: datos,
          backgroundColor: colores,
          borderWidth: 0.5
        }],
      },
      options: {
        plugins: {
          legend:{display:false},
          title: {
            display: true,
            text: 'Disponible / Gastado'
          }
        }
      }
    });

  }

  hacerGastosPorTipoM() {
    this.gastosPorTipoM.destroy();
    this.gastosPorTipoM = new Chart(this.idGastosPorTipoM, {
      type: 'pie',
      data: {
        labels: ['Mensual | ' + (this.sf.totalMensualM * 100 / this.sf.GastoTotalM).toFixed(1) + '% ',
        'Trimestral | ' + (this.sf.totalTrimestralM * 100 / this.sf.GastoTotalM).toFixed(1) + '% ',
        'Anual | ' + (this.sf.totalAnualM * 100 / this.sf.GastoTotalM).toFixed(1) + '% '
        ],
        datasets: [{
          data: [this.sf.totalMensualM, this.sf.totalTrimestralM, this.sf.totalAnualM],

          backgroundColor: [
            'rgba(255, 68, 0, 0.8)',
            'rgba(0, 0, 255, 0.8)',
            'rgba(255, 166, 0, 0.8)'
          ],
          borderWidth: 0.5
        }],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Costes de Pagos Totales por Tipo'
          }
        }
      }
    });

  }

  hacerDisponibleGastadoM() {
    let gastoGeneral = this.sf.GastoTotalM+this.sf.usuario.retos.ahorroTotalMensualAceptados+this.sf.usuario.retos.ahorroTotalMensualPropios;
    let nombres = ["Ingresos"];
    let datos = [this.sf.usuario.ingresoMensual];
    let colores=["rgba(0, 128, 0, 0.8)","rgb(109, 128, 0,0.8)", "rgba(255, 166, 0, 0.8)"];

    if (this.sf.usuario.ingresoMensual >= gastoGeneral) {

      nombres.push('Disponible | ' + ((this.sf.usuario.ingresoMensual - gastoGeneral) * 100 / this.sf.usuario.ingresoMensual).toFixed(1) + '% ');
      datos.push(this.sf.usuario.ingresoMensual -gastoGeneral);

      nombres.push('Gastado | ' + (gastoGeneral * 100 / this.sf.usuario.ingresoMensual).toFixed(1) + '% ');
      datos.push(gastoGeneral);

    } else {
      nombres.push('Disponible | ' + 0 + '% ');
      datos.push(0);

      nombres.push('Gastado | ' + (gastoGeneral * 100 / this.sf.usuario.ingresoMensual).toFixed(1) + '% ');
      datos.push(gastoGeneral);

      nombres.push('Excedido | ' + (gastoGeneral * 100 / this.sf.usuario.ingresoMensual-100).toFixed(1) + '% ');
      datos.push(gastoGeneral - this.sf.usuario.ingresoMensual);
      colores.push("rgba(255, 0, 0, 0.548)");
    }


    this.disponibleGastadoM.destroy();
    this.disponibleGastadoM = new Chart(this.idDisponibleGastadoM, {
      type: 'bar',
      data: {
        labels: nombres,
        datasets: [{
          data: datos,
          backgroundColor: colores,
          borderWidth: 0.5
        }],
      },
      options: {
        plugins: {
          legend:{display:false},
          title: {
            display: true,
            text: 'Disponible / Gastado'
          }
        }
      }
    });

  }

  hacerAportacion(reto: RetoPropio, retos: Array<RetoCompartido>) {

    let nombres: string[] = [];
    let datos: number[] = [];
    let colores: string[] = [];

    //Añadimos al creador
    nombres.push(reto.idCreador);
    datos.push(reto.aporteIndividualTotal);
    colores.push(this.colorAaleatorio());

    //Añadimos al resto de participantes
    retos.forEach(r => {
      nombres.push(r.idQuienAcepta);
      datos.push(r.aporteIndividualTotal);
      colores.push(this.colorAaleatorio());
    });



    //Añadimos el dinero restante que falta
    nombres.push("Restante");
    datos.push(reto.ahorroNecesario - reto.aporteTotal);
    colores.push(this.colorAaleatorio());


    //Se dibuja con todos los datos
    this.Aportacion.destroy();
    this.Aportacion = new Chart(this.idAportacion, {
      type: 'bar',
      data: {
        labels: nombres,
        datasets: [{
          data: datos,
          backgroundColor: colores,
          borderWidth: 0.5
        }],
      },
      options: {
        legend: {
          display: false,
        },
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Aportaciones por usuario'
          }
        }
      }
    });
  }

  hacerGastosRetosM() {
    let retosTotal = this.sf.usuario.retos.ahorroTotalMensualAceptados + this.sf.usuario.retos.ahorroTotalMensualPropios;
    this.gastosRetosM.destroy();
    this.gastosRetosM = new Chart(this.idGastosRetosM, {
      type: 'pie',
      data: {
        labels: [
          'Gastos | ' + (this.sf.GastoTotalM * 100 / (this.sf.GastoTotalM + retosTotal)).toFixed(1) + '% ',
          'Retos | ' + (retosTotal * 100 / (this.sf.GastoTotalM + retosTotal)).toFixed(1) + '% '
        ],
        datasets: [{
          data: [this.sf.GastoTotalM, retosTotal],

          backgroundColor: [
            'rgba(255, 68, 0, 0.8)',
            'rgba(0, 0, 255, 0.8)',
          ],
          borderWidth: 0.5
        }],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Gastos / Ahorro Necesario de Retos'
          }
        }
      }
    });

  }

  hacerGastosRetos() {
    let retosTotal = this.sf.usuario.retos.ahorroTotalMensualAceptados + this.sf.usuario.retos.ahorroTotalMensualPropios;
    this.gastosRetos.destroy();
    this.gastosRetos = new Chart(this.idGastosRetos, {
      type: 'pie',
      data: {
        labels: [
          'Gastos | ' + (this.sf.usuario.gastoTotal * 100 / (this.sf.usuario.gastoTotal + retosTotal)).toFixed(1) + '% ',
          'Retos | ' + (retosTotal * 100 / (this.sf.usuario.gastoTotal + retosTotal)).toFixed(1) + '% '
        ],
        datasets: [{
          data: [this.sf.usuario.gastoTotal, retosTotal],

          backgroundColor: [
            'rgba(255, 68, 0, 0.8)',
            'rgba(0, 0, 255, 0.8)',
          ],
          borderWidth: 0.5
        }],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Gastos / Ahorro Necesario de Retos'
          }
        }
      }
    });

  }

  private colorAaleatorio() {
    let hexadecimal = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F");
    let color_aleatorio = "#";


    for (let i = 0; i < 6; i++) {
      let posarray = this.aleatorio(0, hexadecimal.length);
      color_aleatorio += hexadecimal[posarray];
    }
    return color_aleatorio
  }

  private aleatorio(inferior, superior) {
    let numPosibilidades = superior - inferior;
    let aleat = Math.random() * numPosibilidades;
    aleat = Math.floor(aleat);
    return parseInt(inferior) + aleat;
  }
}