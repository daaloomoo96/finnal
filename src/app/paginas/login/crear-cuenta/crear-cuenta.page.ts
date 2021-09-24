import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

import { ServicioService } from 'src/app/servicios/servicio.service';



@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.page.html',
  styleUrls: ['./crear-cuenta.page.scss'],
})
export class CrearCuentaPage {

  grupo1: FormGroup;
  grupo2: FormGroup;
  grupo3: FormGroup;

  completado1: boolean;
  completado2: boolean;
  completado3: boolean;

  nombre: string;
  contrasena: string;
  ingresoMensual: number;

  constructor(private _formBuilder: FormBuilder, private s: ServicioService) {
    this.nombre = "";
    this.contrasena = "";
    this.ingresoMensual = 0;
  }

  ngOnInit() {
    this.grupo1 = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.grupo2 = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.grupo3 = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  irA(lugar: string) {

    this.s.irA(lugar);
  }


  atras(s: MatStepper, num: number) {
    s.previous();
    if (num == 2) {
      this.completado1 = false;
    } else {
      this.completado2 = false;
    }
  }



  async controlNombre(s: MatStepper) {

    if (this.nombre.trim().length == 0) {

      this.s.mostrarAviso("middle", "end", "El nombre de usuario no puede quedarse vacio!", "Aceptar");
    } else {

      if (this.nombre.trim().length <= 3) {

        this.s.mostrarAviso("middle", "end", "El nombre debe ser de 4 o más carácteres!", "Aceptar");

      } else if (await this.s.sf.comprobarExisteUsuario(this.nombre)) {

        this.s.mostrarAviso("middle", "end", "Ya existe una cuenta con este nombre de usuario!", "Aceptar");
      } else {
        this.completado1 = true;
        setTimeout(() => {
          s.next();
        }, 200);

      }

    }
  }


  controlContrasena(s: MatStepper) {

    if (this.contrasena.trim().length <= 3) {

      this.s.mostrarAviso("middle", "end", "La contraseña debe ser de 4 o más carácteres por tu seguridad :/", "Aceptar");
    } else {
      this.completado2 = true;
      setTimeout(() => {
        s.next();

      }, 200);
    }
  }


  async crearCuenta() {

    if (this.ingresoMensual <= 0) {
      this.s.mostrarAviso('middle', "end", "Ingreso mensual no permitido!", "Regresar");
    } else {
      await this.s.sf.crearCuenta(this.nombre, this.contrasena, this.ingresoMensual,new Date().getMonth(),new Date().getFullYear())
        .then(() => {
          this.s.mostrarAviso("middle", "end", "Cuenta creada con éxito!", "Aceptar", () => {

            this.s.sf.bajarUsuario(this.nombre);
            this.s.mostrarEspera("Iniciando Sesión..", 3000);

            setTimeout(() => {
              this.s.irA('base');
            }, 3300);
          });
        }).catch((error) => {
          this.s.mostrarAviso("middle", "end", "Error al crear la cuenta", "Aceptar");
          console.log(error);
        });
    }
  }
}
