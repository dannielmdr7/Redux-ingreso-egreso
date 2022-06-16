import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import * as authActions from '../auth/auth.actions';
import { Usuario } from '../models/usuario.model';

interface userResponse {
  uid:string;
  email:string;
  nombre:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  fireUser = new Subscription;

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore, private store: Store) { }

  initAuthListener() {
    this.auth.authState.subscribe((fuser: any) => {
      if (fuser !== null) {
        this.fireUser = this.firestore.doc<userResponse>(`${fuser.uid}/usuario`)
          .valueChanges().subscribe(firestoreUser => {
            if(firestoreUser ){
              this.store.dispatch(
                authActions.setUser({ user: { email: firestoreUser.email, nombre: firestoreUser.nombre, uid: firestoreUser.uid } })
              )
            }
          })
      } else {
        this.fireUser.unsubscribe();
        this.store.dispatch(authActions.unSetUser())

      }

    })
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new Usuario(user?.uid || '', nombre, user?.email || '');
        return this.firestore.doc(`${user?.uid}/usuario`).set({ ...newUser });

      })
  }
  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    this.store.dispatch(authActions.unSetUser())
    return this.auth.signOut();
  }
  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    )
  }

}
