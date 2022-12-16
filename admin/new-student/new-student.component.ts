import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-new-student",
  templateUrl: "./new-student.component.html",
  styleUrls: ["./new-student.component.scss"],
})
export class NewStudentComponent implements OnInit {
  title = "form";
  form!: FormGroup;
  constructor(private router: Router) {}

  ngOnInit(): void {}
  kthehu() {
    this.router.navigate(["/admin"]);
  }
}
