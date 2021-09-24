import { Component, OnInit } from '@angular/core';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import * as firebase from 'firebase';


import { ServicioService } from 'src/app/servicios/servicio.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {

  nombre: string;
  contrasena: string;


  constructor(private s: ServicioService) {

    this.nombre = "";
    this.contrasena = "";

    /*   AngularFireModule.initializeApp(environment.firebaseConfig); */

  }

  ngOnInit() {
  }

  irA(lugar: string) {
    this.s.irA(lugar);
  }




  async iniciarSesion() {

    if (this.nombre.trim().length == 0) {
      this.s.mostrarAviso("middle", "end", "El nombre de usuario no puede estar vacio!", "Aceptar");

    } else {

      
      /*  await this.s.sf.bd.firestore.enableNetwork(); */
      if (! await this.s.sf.comprobarExisteUsuario(this.nombre)) {
        this.s.mostrarAviso("middle", "end", "Nombre de usuario o contraseña incorrectos!", "Aceptar");
      } else {

        if (!await this.s.sf.comprobarContraseña(this.nombre, this.contrasena)) {
          this.s.mostrarAviso("middle", "end", "Nombre de usuario o contraseña incorrectos!", "Aceptar");

        } else {

          this.s.mostrarEspera("Iniciando Sesión..", 3000);
          await this.s.sf.bajarUsuario(this.nombre);

          setTimeout(() => {
            this.s.irA('base');
          }, 3300);
        }
      }
    }
  }
}
