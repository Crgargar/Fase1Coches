import { Injectable } from '@angular/core';

import {AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private angularFirestore: AngularFirestore) { }

  public insertar(coches, datos){
    return this.angularFirestore.collection(coches).add(datos);
  }

  public consultar(coches){
    return this.angularFirestore.collection(coches).snapshotChanges();
  }

}
