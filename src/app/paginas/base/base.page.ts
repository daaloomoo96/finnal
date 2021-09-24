import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MenuController, NavController } from '@ionic/angular';
import { ServicioService } from 'src/app/servicios/servicio.service';


@Component({
  selector: 'app-base',
  templateUrl: './base.page.html',
  styleUrls: ['./base.page.scss'],
})
export class BasePage {

  queComponente: number;

  activado: boolean;



  constructor(private menu: MenuController, private s: ServicioService, private navControler: NavController) {

    this.queComponente = 0;

    s.comprobarNotificaciones();
  }

  irA(lugar: string) {
    this.s.irA(lugar);
  }
  cambiarComponente(comp: number) {
    this.queComponente = comp;

    this.menu.close();
  }



  async desconectar() {
     this.s.sf.desconectar();
    this.navControler.navigateRoot('home');
  }
}