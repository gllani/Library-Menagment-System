import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { FirebaseService } from "src/app/firebase.service";
import { StudentsService } from "./students.service";

@Component({
  selector: "app-students-list",
  templateUrl: "./students-list.component.html",
  styleUrls: ["./students-list.component.scss"],
})
export class StudentsListComponent implements OnInit {
  showModal: boolean = false;
  deletePunonjes: boolean = false;
  displayedColumns: string[] = ['id', 'username', 'password', 'action'];
  data: any[] = [];
  allData: any = [];
  form!: FormGroup;

  constructor(private firebase: FirebaseService, private studentsService :StudentsService) {}

  setShowModal(value: boolean, item: any) {
    console.log(item);
    this.firebase = item;
    this.showModal = value;
  }
  goToDelete(item: any) {
    this.deletePunonjes = false;
    this.showModal = true;
    this.deletePunonjes = item;
  }
  deleteFunction(event: any) {
    this.firebase.fshiPunonjes(event.customIdName);
  }

  ngOnInit(): void {
    this.studentsService.editableData = {
      id: 0,
      username: 0,
      password: 0,
      
    };
    this.firebase.getPunonjes().subscribe((data: any) => {
      console.log("data nga firebasi", data);
      this.allData = data;
      this.data = this.allData;
    });
    this.form = new FormGroup({
      filter: new FormControl(""),
    });
  }
}
