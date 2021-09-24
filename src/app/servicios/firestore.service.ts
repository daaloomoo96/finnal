import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';

import { Gasto, RetoCompartido, RetoPropio, Usuario } from "../esquemas/usuario.esquema";

import { BasedatosModule } from "../basedatos/basedatos.module";
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';

import { AngularFireModule, FirebaseApp } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private usuarios: AngularFirestoreCollection;
  UsuarioRef: DocumentReference;
  public usuario: Usuario = {};
  public totalMensual: number;
  public totalTrimestral: number;
  public totalAnual: number;
  public totalMensualM: number;
  public totalTrimestralM: number;
  public totalAnualM: number;
  public GastoTotalM: number;
  snaps = [];
  private color = {
    pendiente: "white",
    cercano: "rgba(255, 94, 0, 0.200)",
    pagado: "rgba(0, 128, 0, 0.200)",
    sinPagar: "rgba(255, 0, 0, 0.350)"
  };
  private mesActual = new Date().getMonth() + 1;
  private anoActual = new Date().getFullYear();

  private diasMesActual = new Date(this.anoActual, this.mesActual, 0).getDate();



  constructor(public bd: AngularFirestore, private b: BasedatosModule) {

    this.usuarios = this.bd.collection('usuarios');
    this.usuario.retos = {};
    this.usuario.gastosDelMes = [];


  }

  desconectar() {

    this.snaps.forEach(s => {
      s();
    })
    this.snaps = [];
  }

  //---------------------------------------------------------Escuchar cambios
  async bajarUsuario(id: string) {
    this.usuario = {};
    this.usuario.retos = {};
    this.usuario.id = id;
    this.usuario.retos.aceptados = [];

    this.UsuarioRef = (await this.usuarios.ref.doc(id).get()).ref;


    //----Propiedades simples del usuario
    await this.UsuarioRef.get().then(usu => {
      let aux: Usuario = usu.data();
      this.usuario.id = aux.id;
      this.usuario.contrasena = aux.contrasena;
      this.usuario.ingresoMensual = aux.ingresoMensual;
      this.usuario.ultimoMes = aux.ultimoMes;
      this.usuario.ultimoAno = aux.ultimoAno;
      /* get()).docs.forEach(doc => {
          gastos.push(doc.data());
        }); */

    });

    //Si ha cambiado el mes, aplicamos ciertos cambios.
    if (this.mesActual > this.usuario.ultimoMes || this.anoActual > this.usuario.ultimoAno) {

      //Actualizamos Pagos
      await this.UsuarioRef.update({ ultimoMes: this.mesActual, ultimoAno: this.anoActual });

      await this.UsuarioRef.collection('gastos').get().then(docs => {

        docs.forEach(doc => {
          doc.ref.update({ estado: "Pendiente" });
        });
      });

      //Añadimos el aporte mensual a nuestros retos aceptados
      await this.UsuarioRef.collection('retosAceptados').get().then(docs => {
        docs.forEach(async doc => {

          let retoC: RetoCompartido = doc.data();
          retoC.aporteIndividualTotal += retoC.aporte;
          doc.ref.update({ aporteIndividualTotal: retoC.aporteIndividualTotal });

          //Atualizamos el reto Creador
          await this.actualizarRetoCreador(retoC);
        });
      });

      //añadimos el aporte mensual a  nuestros retos propios
      this.UsuarioRef.collection('retosPropios').get().then(docs => {

        docs.forEach(doc => {
          let retoP: RetoPropio = doc.data();

          retoP.aporteIndividualTotal += retoP.aporte;
          retoP.aporteTotal += retoP.aporte;
          doc.ref.update({ aporteIndividualTotal: retoP.aporteIndividualTotal, aporteTotal: retoP.aporteTotal });
        });
      });
    }


    let aux = this.UsuarioRef.onSnapshot(usu => {
      let aux: Usuario = usu.data();
      let d = new Date();
      this.usuario.id = aux.id;
      this.usuario.contrasena = aux.contrasena;
      this.usuario.ingresoMensual = aux.ingresoMensual;
      this.usuario.ultimoMes = aux.ultimoMes;
      this.usuario.ultimoAno = aux.ultimoAno;
      /* get()).docs.forEach(doc => {
          gastos.push(doc.data());
        }); */

    });
    this.snaps.push(aux);

    //----Gastos del usuario
    aux = this.UsuarioRef.collection('gastos').onSnapshot(docs => {

      let gastos = [];
      let i = 0;
      docs.forEach(doc => {

        gastos.push(doc.data());
        gastos[i].color = this.establecerColor(doc.data().estado);
        i++;
      });


      this.usuario.gastos = gastos;


      this.usuario.gastoTotal = 0;
      this.usuario.gastosDelMes = [];
      if (this.usuario.gastos.length != 0) {
        this.usuario.gastos.forEach(gasto => { this.usuario.gastoTotal += Number(gasto.precio) });
        /*  this.usuario.gastoTotal = this.usuario.gastos.map(gasto => gasto.precio).reduce((acum, precio) => acum + precio); */
      }
      this.totalMensual = this.datosPorTipo("Mensual");
      this.totalTrimestral = this.datosPorTipo('Trimestral');
      this.totalAnual = this.datosPorTipo('Anual');


      let gMAuxiliar = [];
      this.usuario.gastos.forEach(g => {
        switch (g.tipo) {

          case "Mensual":

            gMAuxiliar.push(g);
            break;

          case "Trimestral":
            if (this.mesActual == g.meses[0] || this.mesActual == g.meses[1] || this.mesActual == g.meses[2]) {
              gMAuxiliar.push(g);
            }
            break;

          case "Anual":
            if (this.mesActual == g.mes) {
              gMAuxiliar.push(g);
            }
            break;
        }
      });
      this.usuario.gastosDelMes = gMAuxiliar;
      this.totalMensualM = this.datosPorTipoM("Mensual");
      this.totalTrimestralM = this.datosPorTipoM('Trimestral');
      this.totalAnualM = this.datosPorTipoM('Anual');
      this.GastoTotalM = this.totalMensualM + this.totalTrimestralM + this.totalAnualM;

      this.usuario.gastosDelMes = this.usuario.gastosDelMes.map(g => {
        if (g.dia > this.diasMesActual) {
          g.diaCobro = this.diasMesActual;
        } else {
          g.diaCobro = g.dia;
        }
        return g;
      });
    });
    this.snaps.push(aux);

    //----Retos Privados del usuario
    aux = this.UsuarioRef.collection('retosPropios').onSnapshot(docs => {
      /*   alert("bajarUsuarioRetosPropios usuario => " + this.usuario.id); */
      let retos = [];
      this.usuario.retos.ahorroTotalPropios = 0;
      this.usuario.retos.ahorroTotalMensualPropios = 0;
      /*       console.log("propios"); */
      docs.forEach(doc => {
        /*   console.log(doc.data().id);
   */
        retos.push(doc.data());
        this.usuario.retos.ahorroTotalPropios += doc.data().ahorroNecesario;
        this.usuario.retos.ahorroTotalMensualPropios += doc.data().aporte;
      });
      this.usuario.retos.propios = retos;

    });
    this.snaps.push(aux);
    //----Retos Compartidos del usuario
    aux = this.UsuarioRef.collection('retosAceptados').onSnapshot(docs => {

      let retos = [];
      this.usuario.retos.ahorroTotalAceptados = 0;
      this.usuario.retos.ahorroTotalMensualAceptados = 0;
      /* console.log("aceptados"); */
      docs.forEach(doc => {
        /*   console.log(doc.data().id); */
        retos.push(doc.data());

        this.usuario.retos.ahorroTotalAceptados += doc.data().ahorroNecesario;
        this.usuario.retos.ahorroTotalMensualAceptados += doc.data().aporte;
      });
      this.usuario.retos.aceptados = retos;
    });
    this.snaps.push(aux);
    //----Retos  pendientes
    aux = this.UsuarioRef.collection('retosPendientes').onSnapshot(docs => {

      let retos = [];
      this.usuario.retos.pendientes;
      docs.forEach(doc => {
        retos.push(doc.data());
      });
      this.usuario.retos.pendientes = retos;
    });
    this.snaps.push(aux);

    /*   //--- poner listeners en el creador de los retos aceptados.
      this.usuario.retos.aceptados.forEach(r => {
  
        this.listenerAceptado(r);
      }); */

  }
  //---------------------------------------------------------




  //---------------------------------------------------------Cambios en Usuario
  async editarUsuario(ob: {}) {
    await this.UsuarioRef.update(ob);
  }
  //---------------------------------------------------------





  //---------------------------------------------------------Gastos
  async editarGasto(id: string, ob: {}) {

    await this.UsuarioRef.collection("gastos").doc(id).update(ob);

  }

  async comprobarExisteGasto(id: string): Promise<boolean> {

    return (await this.UsuarioRef.collection('gastos').doc(id).get()).exists
  }

  async añadirGasto(id: string, ob: {}) {

    await this.UsuarioRef.collection('gastos').doc(id).set(ob);
  }

  async eliminarGasto(id: string) {

    await this.UsuarioRef.collection("gastos").doc(id).delete();
  }
  //---------------------------------------------------------





  //---------------------------------------------------------Retos

  async comprobarExisteReto(id: string) {
    return (await this.UsuarioRef.collection('retosPropios').doc(id).get()).exists || (await this.UsuarioRef.collection('retosAceptados').doc(id).get()).exists
  }

  async añadirRetoPropio(reto: RetoPropio) {

    await this.UsuarioRef.collection('retosPropios').doc(reto.id).set(reto);
  }

  async enviarRetoCompartido(usu: string, reto: RetoCompartido) {

    await this.usuarios.ref.doc(usu).collection("retosPendientes")
      .doc(reto.id).set(reto);
  }

  async aceptarReto(r: RetoCompartido) {

    //lo añadimos a nuestros retos, y lo eliminamos de pendientes
    await this.UsuarioRef.collection('retosPendientes').doc(r.id).delete();
    r.aceptados.push(this.usuario.id);
    r.idQuienAcepta = this.usuario.id;
    r.aporteIndividualTotal = r.aporte;
    await this.UsuarioRef.collection('retosAceptados').doc(r.id).set(r);




    //Notificamos al creador 
    let docRef = ((await this.usuarios.doc(r.idCreador).collection('retosPropios').ref.doc(r.idReal).get())).ref; //RefRetoParaRaquel


    //(AQUÍ ES DONDE DA EL ERROR) pero en debugger al salir de aquí,en memoria tiene lo que debe tener. Es después en el snapshot de propios. Por qué?
    let doc: RetoPropio = (await docRef.get()).data(); //RetoOriginal

    doc.aceptados.push(this.usuario.id); //Añado al usuario que acepta el reto
    doc.pendientes = doc.pendientes.filter(usu => usu != this.usuario.id); //La inversa
    doc.aporteTotal += r.aporte;
    docRef.update({ aceptados: doc.aceptados, pendientes: doc.pendientes, aporteTotal: doc.aporteTotal }).catch(e => {
      console.log(e);
    }); //Actualizo al creador con este reto modificado
    //------------------FIN ERROR


    /*   this.listenerAceptado(r); */
  }




  async rechazarReto(r: RetoCompartido) {
    await this.UsuarioRef.collection('retosPendientes').doc(r.id).delete();

    this.usuarios.doc(r.idCreador).collection('retosPropios').ref.doc(r.idReal).get().then(rL => {
      let retoL: RetoPropio = rL.data();
      retoL.pendientes.filter(usu => usu != this.usuario.id);
      this.usuarios.doc(r.idCreador).collection('retosPropios').ref.doc(r.idReal).update({ pendientes: retoL.pendientes });
    });
  }

  async obtenerRetoCreador(idC: string, idR: string) {
    return (await ((await this.usuarios.doc(idC).collection('retosPropios').doc(idR).ref.get()).ref).get()).data();
  }

  async obtenerRetoParticipante(par: string[], nomR: string, idC: string) {
    let retos: Array<RetoCompartido> = new Array<RetoCompartido>();


    for await (const p of par) {
      if (p != idC) {

        let reto: RetoCompartido = (await ((await this.usuarios.doc(p).collection('retosAceptados').doc(nomR).ref.get()).ref).get()).data();

        retos.push(reto);
      }
    }
    return retos;
  }


  async editarRetoAhorro(r: RetoPropio, ob: {}) {
    await this.UsuarioRef.collection("retosPropios").doc(r.id).update(ob);

    if (r.aceptados.length > 0) {

      r.aceptados.forEach(n => {
        if (n != this.usuario.id) {
          this.usuarios.doc(n).collection('retosAceptados').doc(r.idCompartido).update(ob);
        }
      });
    }
  }

  async eliminarRetoPropio(r: RetoPropio) {



    if (r.aceptados.length > 0) {
      r.aceptados.forEach(n => {
        if (n != this.usuario.id) {
          this.usuarios.doc(n).collection('retosAceptados').doc(r.idCompartido).delete();
        }
      });
    }

    if (r.pendientes.length > 0) {
      r.pendientes.forEach(n => {
        if (n != this.usuario.id) {
          this.usuarios.doc(n).collection('retospendientes').doc(r.idCompartido).delete();
        }
      });
    }
    this.UsuarioRef.collection("retosPropios").doc(r.id).delete();
  }

  async eliminarRetoAceptado(r: RetoCompartido) {

    this.usuarios.doc(this.usuario.id).collection('retosAceptados').doc(r.id).delete();

    r.aceptados = r.aceptados.filter(usu => usu != this.usuario.id);
    r.aceptados.forEach(n => {
      if (n != r.idCreador) {
        this.usuarios.doc(n).collection('retosAceptados').doc(r.id).update({ aceptados: r.aceptados });
      }
    });
    this.usuarios.doc(r.idCreador).collection('retosPropios').doc(r.idReal).update({ aceptados: r.aceptados });

  }


  //---------------------------------------------------------





  //---------------------------------------------------------Comprobaciones
  async comprobarContraseña(nombre: string, contra: string): Promise<boolean> {
    let bien: boolean;
    await this.usuarios.ref.doc(nombre).get().then(usu => {

      if (usu.data().contrasena == contra) {
        bien = true;
      } else {
        bien = false;
      }
    });
    return bien;

  }

  async comprobarExisteUsuario(id: string) {
    /*  alert("Ahora error"); */
    if ((await this.bd.collection('usuarios').ref.doc(id).get()).exists) {
      /*  alert("Sí comprueba el usuario"); */
      return true;
    } else {
      /*  alert("Sí comprueba el usuario"); */
      return false;
    }

  }

  async crearCuenta(id: string, contra: string, ingreso: number, ultimoMes: number, ultimoAno: number) {
    await this.usuarios.doc(id).set({ id: id, contrasena: contra, ingresoMensual: ingreso, ultimoMes: ultimoMes, ultimoAno: ultimoAno, gastoTotal: 0, peticionesRetosPendientes: [] });
  }
  //---------------------------------------------------------




  //---------------------------------------------------------Privados 

  private datosPorTipo(tipo: "Mensual" | "Trimestral" | "Anual") {
    let resul: number = 0;
    this.usuario.gastos.forEach(g => {
      if (g.tipo == tipo) {
        resul += g.precio;
      }
    });
    return resul;

  }
  private datosPorTipoM(tipo: "Mensual" | "Trimestral" | "Anual") {
    let resul: number = 0;
    this.usuario.gastosDelMes.forEach(g => {
      if (g.tipo == tipo) {
        resul += g.precio;
      }
    });
    return resul;

  }

  private establecerColor(estado: string) {
    let color: string;

    switch (estado) {
      case "Pendiente":
        color = this.color.pendiente;
        break;

      case "Cercano":
        color = this.color.cercano;
        break;

      case "Pagado":
        color = this.color.pagado;
        break;

      case "SinPagar":
        color = this.color.sinPagar;
        break;
    }
    return color;
  }

  /*   private async listenerAceptado(r: RetoCompartido) {
  
      let retoCreadorRef = ((await this.usuarios.doc(r.idCreador).collection('retosPropios').ref.doc(r.idReal).get())).ref;
  
      //Tenemos un listener en el creador
      retoCreadorRef.onSnapshot(reto => {
  
        let retoL: RetoPropio = reto.data();
  
        this.UsuarioRef.collection('retosAceptados').doc(r.id).update({
          aceptados: retoL.aceptados,
          ahorroNecesario: retoL.ahorroNecesario,
  
          fecha: retoL.fecha
        }).catch(e => {
          console.log(e);
        });
      });
  
    } */



  private async actualizarRetoCreador(retoC: RetoCompartido) {
    let RetoRref = this.usuarios.doc(retoC.idCreador).collection("retosPropios").ref.doc(retoC.idReal).get();
    let retoR: RetoPropio = (await RetoRref).data();
    retoR.aporteTotal += retoC.aporte;

    (await RetoRref).ref.update({ aporteTotal: retoR.aporteTotal });
  }
  //---------------------------------------------------------
}
