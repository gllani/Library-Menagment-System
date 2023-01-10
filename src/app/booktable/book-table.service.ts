import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BookTableService {
  filter: any = new BehaviorSubject("");

  constructor() {}
}
