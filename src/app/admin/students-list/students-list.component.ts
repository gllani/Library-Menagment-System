import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { FirebaseService } from "src/app/firebase.service";
import { AdminComponent } from "../admin.component";
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
    private dialogRef: MatDialogRef<AdminComponent>,
    private dialog: MatDialog
  ) {}

  onClose(): void {
    this.dialogRef.close(true);
  }
  openDialogWithTemplateRef(templateRef: any, edit?: any) {
    if (templateRef._declarationTContainer.localNames[0] === "myDialog") {
      if (edit) {
        console.log("this is edit");
      }
    }
    this.dialog.open(templateRef);
  }
  filter() {
    this.data = this.searchArray(this.form.value.filter, this.data);
    if (this.form.value.filter === "") {
      this.data = this.allData;
    }
  }
  searchArray = (toSearch: string, array: any[]) => {
    let terms = toSearch.split("");
    return array.filter((object) =>
      terms.every((term) =>
        Object.values(object).some((value: any) =>
          typeof value === "string" || value instanceof String
            ? value.includes(term)
            : false
        )
      )
    );
  };

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
      filter: new FormControl(""),
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
