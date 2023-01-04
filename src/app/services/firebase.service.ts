import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { collection, doc } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}

  getHistory(user: any) {
    return this.firestore
      .collection("history", (ref) => ref.where("name", "==", user.username))
      .valueChanges();
  }
  addToHistory(item: any) {
    return this.firestore
      .collection("history")
      .doc(item.customIdName)
      .update(item);
  }
  addNewToHistory(item: any) {
    return this.firestore.collection("history").add(item);
  }

  getData() {
    return this.firestore
      .collection("books")
      .valueChanges({ idField: "customIdName" });
  }
  getReservedBooks() {
    return this.firestore
      .collection("books", (ref) => ref.where("status", "==", "reserved"))
      .valueChanges();
  }

  fshiProdukt(id: any) {
    console.log(id);
    return this.firestore.collection("books").doc(id).delete();
  }
  addreservedBook(item: any) {
    return this.firestore
      .collection("books")
      .doc(item.customIdName)
      .update(item);
  }

  getPunonjes() {
    return this.firestore
      .collection("employeer")
      .valueChanges({ idField: "customIdName" });
  }

  getSpecificUser(id: any) {
    return this.firestore
      .collection("employeer")
      .doc(id)
      .valueChanges({ idField: "customIdName" });
  }

  ndryshoProdukt(item: any) {
    return this.firestore
      .collection("books")
      .doc(item.customIdName)
      .update(item);
  }

  reserveBook(item: any) {
    return this.firestore
      .collection("employeer")
      .doc(item.customIdName)
      .update(item);
  }

  addProduct(item: any) {
    return this.firestore.collection("books").add(item);
  }
  fshiPunonjes(id: any) {
    console.log(id);
    return this.firestore.collection("employeer").doc(id).delete();
  }

  punonjesIRi(item: any) {
    return this.firestore.collection("employeer").add(item);
  }
}
