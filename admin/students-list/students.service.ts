import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StudentsService {
  editableData = {
    id: 0,

    username: 0,
    password: 0,
  };
  upgrateData: any;

  deleteItem: any;
  constructor() {}
}
