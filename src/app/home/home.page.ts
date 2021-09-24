import { Component } from '@angular/core';
import { ServicioService } from '../servicios/servicio.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private s: ServicioService) { }


  irA(lugar: string) {
    /*  window.open("https://www.google.com", "_blank"); */

    this.s.irA(lugar);
  }



  prueba() {
    this.s.sf.bajarUsuario("dani");

    this.s.mostrarEspera("Iniciando Sesión...", 4900);

    setTimeout(() => {

      this.s.irA('base');

    }, 5000);
  }
}
