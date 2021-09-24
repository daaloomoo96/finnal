import { Component, OnInit } from '@angular/core';
import { RetoCompartido, RetoPropio } from 'src/app/esquemas/usuario.esquema';
import { ServicioService } from 'src/app/servicios/servicio.service';

@Component({
  selector: 'app-reto-estado',
  templateUrl: './reto-estado.page.html',
  styleUrls: ['./reto-estado.page.scss'],
})
export class RetoEstadoPage implements OnInit {


  idCreador: string;
  idRetoOriginal: string;
  idRetoCompartido: string;
  retoCreador: RetoPropio = {};
  fechaReto: Date;
  diasRestantes: string;
  retosCompartidos: Array<RetoCompartido> = new Array<RetoCompartido>();
  mostrar: boolean;
  nombre:string;


  constructor(private s: ServicioService) {
    this.mostrar = false;
  }

  ngOnInit() {
    /*  this.fechaReto = new Date(this.retoCreador.fecha);
     this.diasRestantes = ((this.fechaReto.getTime() - new Date().getTime()) / 86400000).toFixed(0); */

    this.cargarRetosParticipantes();


  }


  async cargarRetosParticipantes() {
    this.retoCreador = await this.s.sf.obtenerRetoCreador(this.idCreador, this.idRetoOriginal);
    
    this.retosCompartidos = await this.s.sf.obtenerRetoParticipante(this.retoCreador.aceptados, this.retoCreador.idCompartido,this.idCreador);

    this.fechaReto = new Date(this.retoCreador.fecha);
    this.diasRestantes = ((this.fechaReto.getTime() - new Date().getTime()) / 86400000).toFixed(0);


    let algo = <HTMLCanvasElement>document.getElementById('idAportacion');
    let algo2 = algo.getContext('2d');
    this.s.sC.hacerIDAportacion(algo2);
    this.s.sC.hacerAportacion(this.retoCreador, this.retosCompartidos);
    this.mostrar=true;
  }
}
