import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
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
  data: any = [];
  allData: any = [];
  form!: FormGroup;
  getPunonjes: boolean = false;
  addStudent: boolean = false;
  fshiPunonjes: boolean = false;
  addProduct: boolean = false;
  editProduct: boolean = false;
  loading: any = new BehaviorSubject(false);

  constructor(
    private firebase: FirebaseService,
    private studentsService: StudentsService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.studentsService.editableData = {
      id: "",
      username: 0,
      password: 0,
    };
    this.firebase.getPunonjes().subscribe((data: any) => {
      this.allData = data;
      this.data = this.allData;
      this.loading.next(true);
    });
    this.form = new FormGroup({
      id: new FormControl("", Validators.required),
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      filter: new FormControl(""),
    });
  }
  openDialogWithTemplateRef(templateRef: any, edit?: any) {
    if (templateRef._declarationTContainer.localNames[0] === "myDialog") {
      if (edit) {
      }
    }
    this.dialog.open(templateRef);
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

  searchArray = (toSearch: string, array: any[]) => {
    this.loading.next(false);
    if (toSearch === "") {
      this.allData = [];
      this.firebase.getPunonjes().subscribe((data: any) => {
        this.allData = data;
        this.data = this.allData;
        this.loading.next(true);
      });
    } else {
      let terms = toSearch.split(" ");
      this.data = array.filter((object) =>
        terms.every((term) =>
          Object.values(object).some((value: any) =>
            typeof value === "string" || value instanceof String
              ? value.includes(term)
              : false
          )
        )
      );
      this.loading.next(true);
    }
  };
}
