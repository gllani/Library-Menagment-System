import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }
  getData() {
    return this.firestore
      .collection('books')
      .valueChanges({ idField: 'customIdName' });
  }
  fshiProdukt(id: any) {
    console.log(id);
    return this.firestore.collection('books').doc(id).delete();
  }

  getPunonjes() {
    return this.firestore
      .collection('employeer')
      .valueChanges({ idField: 'customIdName' });
  }
  ndryshoProdukt(item: any) {
    return this.firestore
      .collection('books')
      .doc(item.customIdName)
      .update(item);
  }
  addProduct(item: any) {
    return this.firestore.collection('books').add(item);
  }
  fshiPunonjes(id: any) {
    console.log(id);
    return this.firestore.collection('employeer').doc(id).delete();
  }
  punonjesIRi(item: any) {
    return this.firestore.collection('employeer').add(item);
  }

}
