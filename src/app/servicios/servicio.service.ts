import { Injectable } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { FirestoreService } from './firestore.service';

import { ModalController } from '@ionic/angular';
import { NuevoGastoPage } from '../componentes/nuevo-gasto/nuevo-gasto.page';
import { AppPage } from 'e2e/src/app.po';
import Chart from 'chart.js/auto';
import { ServicioCanvasService } from './servicio-canvas.service';


@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private d = new Date;
  private diaActual: number;


  /*   private mesActual: number; */

  public activarNotificaciones: boolean;
  public algunoSinPagar: boolean;
  constructor(

    public sf: FirestoreService,
    public sC: ServicioCanvasService,
    public modalController: ModalController,
    public controladorAlert: AlertController,
    private nv: NavController,
    public controladorAviso: ToastController,
    private ControladorLoading: LoadingController
  ) {

    this.activarNotificaciones = false;
    this.diaActual = this.d.getDate();


  }



  comprobarNotificaciones() {
    /* this.activarNotificaciones = false; */
    let activar: boolean = false;
    this.algunoSinPagar =false;

    this.sf.usuario.gastosDelMes.forEach(g => {

      //Cercano
      if (this.diaActual >= g.diaCobro - 7 && this.diaActual < g.diaCobro) {

        switch (g.tipo) {

          case "Mensual":

            if (g.estado != "Pagado") {

              activar = true;
              this.sf.editarGasto(g.id, { estado: "Cercano" });
            }

            break;

          case "Trimestral":
            let mesActual = this.d.getMonth() + 1;


            if (mesActual == g.meses[0] || mesActual == g.meses[1] || mesActual == g.meses[2]) {

              if (g.estado != "Pagado") {
                activar = true;
                this.sf.editarGasto(g.id, { estado: "Cercano" });
              }
            }
            break;

          case "Anual":
            let mesActual2 = this.d.getMonth() + 1;

            if (mesActual2 == g.mes && g.ano >= this.d.getFullYear()) {

              if (g.estado != "Pagado") {
                activar = true;
                this.sf.editarGasto(g.id, { estado: "Cercano" });
              }
            }
            break;
        }

        //Pendiente
      } else if (this.diaActual < g.diaCobro - 7) {
        if (g.estado != "Pagado") {
          /* activar = true; */
          this.sf.editarGasto(g.id, { estado: "Pendiente" });
        }
      } else {
        if (g.estado != "Pagado") {
          this.sf.editarGasto(g.id, { estado: "SinPagar" });
          activar = true;
          this.algunoSinPagar=true;
        }
      }

    });
    this.activarNotificaciones = activar;
  }
  //-------------------------------------------Navegación
  irA(lugar: string) {
    this.nv.navigateRoot(lugar);
  }

  //-------------------------------------------Carga
  async mostrarEspera(mensaje: string, duracion: number) {
    const loading = await this.ControladorLoading.create({
      cssClass: 'my-custom-class',
      message: mensaje,
      duration: duracion
    });
    await loading.present();
  }


  async mostrarModal(pagina: any,propiedades?:{}) {
    const modal = await this.modalController.create({
      component: pagina,
      cssClass: 'modal',
      componentProps:propiedades
      
    });
    return await modal.present();
  }


  //-------------------------------------------Notificaciones
  async mostrarAviso(posicion: "top" | "bottom" | "middle", posicionBoton: "start" | "end", mensaje: string, botonTexto: string, accionBoton?: () => void) {
    const toast = await this.controladorAviso.create({

      message: mensaje,
      position: posicion,
      buttons: [
        {
          side: posicionBoton,
          text: botonTexto,
          role: 'cancel',
          handler: accionBoton
        }
      ]
    });
    toast.present();
  }


  async mostrarAlertConInput(titulo: string, descrp: string, tipoInput: 'text' | 'number', aceptarAccion: (algo: any) => void) {
    const alert = await this.controladorAlert.create({
      cssClass: 'my-custom-class',
      header: titulo,
      message: descrp,

      inputs: [
        {
          name: 'name',
          type: tipoInput
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Aceptar',
          handler: aceptarAccion
        }
      ]
    });

    await alert.present();
  }


  async mostrarConfirmarConEntrada(titulo: string, descrp: string, entrada: any, aceptarAccion: (algo: any) => void) {
    const alert = await this.controladorAlert.create({
      cssClass: 'my-custom-class',
      header: titulo,
      message: descrp,
      inputs: entrada,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Aceptar',
          handler: aceptarAccion
        }
      ]
    });

    await alert.present();
  }

  async mostrarAlertConfirmacion(titulo: string, mensaje: string, textoBoton: string, accion: () => void) {
    const alert = await this.controladorAlert.create({
      cssClass: 'my-custom-class',
      header: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: textoBoton,
          handler: accion
        }
      ]
    });
    await alert.present();
  }

}