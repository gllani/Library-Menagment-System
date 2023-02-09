import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { shareReplay } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  subscribe(arg0: (overdueBook: any) => void) {
    throw new Error("Method not implemented.");
  }
  constructor(private firestore: AngularFirestore) {}

  getHistory(user: any) {
    return this.firestore
      .collection("history", (ref) => ref.where("name", "==", user.username))
      .valueChanges();
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
  getBookCategory(category: any) {
    return this.firestore
      .collection("books", (ref) => ref.where("categories", "==", category))
      .valueChanges();
  }
  getFreeBooks() {
    return this.firestore
      .collection("books", (ref) => ref.where("status", "==", "free"))
      .valueChanges();
  }

  getSpecificBooks(bookname: any) {
    return this.firestore
      .collection("books", (ref) => ref.where("BookName", "==", bookname))
      .valueChanges()
      .pipe(shareReplay());
  }

  fshiProdukt(id: any) {
    return this.firestore.collection("books").doc(id).delete();
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
    return this.firestore.collection("employeer").doc(id).delete();
  }

  punonjesIRi(item: any) {
    return this.firestore.collection("employeer").add(item);
  }
}
