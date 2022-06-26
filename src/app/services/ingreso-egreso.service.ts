import { AppState } from 'src/app/app.reducer';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {
  
  constructor(private firestore: AngularFirestore, private authService: AuthService, private store:Store<AppState>) {
    // this.store.select('user').subscribe( user => {
    //   this.uid = user.user.uid
    // } )

   }
  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    // console.log({ingresoEgreso});

    return this.firestore
      .doc(`${this.authService.getUser().uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso });
  }
  initIngresosEgresosListener(uid: string) {
    return this.firestore
      .collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(snapshot => snapshot.map(doc => (
          {
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data() as any
          })
        )
        )
      )

  }
  borrarIngresoEgreso(uidItem:string){
     return this.firestore.doc(`${this.authService.getUser().uid}/ingresos-egresos/items/${uidItem}`).delete()
  }
}
