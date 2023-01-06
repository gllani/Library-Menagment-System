import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { FirebaseService } from "src/app/services/firebase.service";
import { StudentsService } from "./students.service";

@Component({
  selector: "app-students-list",
  templateUrl: "./students-list.component.html",
  styleUrls: ["./students-list.component.scss"],
})
export class StudentsListComponent implements OnInit {
  showModal: boolean = false;
  displayedColumns: string[] = ["id", "username", "password", "action"];
  data: any[] = [];
  allData: any = [];
  form!: FormGroup;
  getPunonjes: boolean = false;
  addStudent: boolean = false;
  fshiPunonjes: boolean = false;

  constructor(
    private firebase: FirebaseService,
    private studentsService: StudentsService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  openDialogWithTemplateRef(templateRef: any, edit?: any) {
    if (templateRef._declarationTContainer.localNames[0] === "myDialog") {
      if (edit) {
        console.log("this is edit");
      }
    }
    this.dialog.open(templateRef);
  }

  ngOnInit(): void {
    this.studentsService.editableData = {
      id: "",
      username: 0,
      password: 0,
    };
    this.firebase.getPunonjes().subscribe((data: any) => {
      console.log("data nga firebasi", data);
      this.allData = data;
      this.data = this.allData;
    });
    this.form = new FormGroup({
      id: new FormControl("", Validators.required),
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }

  goToAdd() {
    let item = {
      id: this.form.value.id,
      username: this.form.value.username,
      password: this.form.value.password,
      role: "employeer",
      books: [],
    };
    this.firebase.punonjesIRi(item);
    this.router.navigate(["/students-list"]);
  }

  setShowModal(value: boolean, item: any) {
    this.firebase.fshiPunonjes = item;
    this.showModal = value;
  }

  deleteFunction(event: any) {
    if (event.role === "admin") {
      alert("You can not delete admin");
    } else {
      this.firebase.fshiPunonjes(event.customIdName);
    }
  }
}