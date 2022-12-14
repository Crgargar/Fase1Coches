import { Component } from '@angular/core';
import { Coche } from '../coche';

import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  cocheEditando: Coche;
  arrayColeccionCoches: any = [{
    id: "",
    data: {} as Coche
  }];

  constructor(private firestoreService: FirestoreService) {
    // crear un coche vacio al empezar
    this.cocheEditando = {} as Coche;

    this.obtenerListaCoches();
  }

  clickBotonInsertar(){
    this.firestoreService.insertar("coche", this.cocheEditando).then(() =>{
      console.log("Coche creado correctamente");
      // limpiar el contenido de los coches que se estaban editando
      this.cocheEditando = {} as Coche;
    }, (error) => {
      console.error(error);
    });
  }

  obtenerListaCoches(){
    this.firestoreService.consultar("coche").subscribe((resultadoConsultaCoches) => {
      this.arrayColeccionCoches = [];
      resultadoConsultaCoches.forEach((datosCoche: any) => {
        this.arrayColeccionCoches.push({
          id: datosCoche.payload.doc.id,
          data: datosCoche.payload.doc.data()
        })
      })
    }
    )
  }

}
