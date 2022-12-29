import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { FirebaseService } from "src/app/services/firebase.service";

@Component({
  selector: "app-new-student",
  templateUrl: "./new-student.component.html",
  styleUrls: ["./new-student.component.scss"],
})
export class NewStudentComponent implements OnInit {
  // title = "new-student";
  // form!: FormGroup;
  constructor() {}
  // private router: Router, private firebase: FirebaseService

  ngOnInit(): void {
    // this.form = new FormGroup({
    //   id: new FormControl("", Validators.required),
    //   username: new FormControl("", Validators.required),
    //   password: new FormControl("", Validators.required),
    // });
  }
  // kthehu() {
  //   this.router.navigate(["/admin"]);
  // }
  // goToAdd() {
  //   let item = {
  //     id: this.form.value.id,
  //     username: this.form.value.username,
  //     password: this.form.value.password,
  //     role: "employeer",
  //   };
  //   this.firebase.punonjesIRi(item);
  //   this.router.navigate(["/students-list"]);
  // }
}
