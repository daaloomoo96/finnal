import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  exports:[AngularFireModule],
  providers:[AngularFireModule]
})
export class BasedatosModule {


 public static iniciar(){
    AngularFireModule.initializeApp(environment.firebaseConfig);
  }
}
