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
  displayedColumns: string[] = ["id", "username", "password", "action"];
  data: any[] = [];
  allData: any = [];
  form!: FormGroup;
  todayDate: Date = new Date();
  dateVal = new Date();

  constructor(
    private firebase: FirebaseService,
    private studentsService: StudentsService
  ) {}
 

  searchArray = (toSearch: string, array: any[]) => {
    let terms = toSearch.split(" ");
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
  filter() {
    this.data = this.searchArray(this.form.value.filter, this.data);
    if (this.form.value.filter === "") {
      this.data = this.allData;
    }
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
