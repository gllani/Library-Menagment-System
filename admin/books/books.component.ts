import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {  Router } from "@angular/router";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.scss"],
})
export class BooksComponent implements OnInit {
  title = "form";
  form!: FormGroup;
  

  constructor(private router: Router) {}

  ngOnInit(): void {
    let Id: any = "";
    let Name: any = "";
    let lastname: any = "";
    let Email: any = "";
    let Password: any = "";

    this.form = new FormGroup({
      Id: new FormControl(Id, Validators.required),
      Emri: new FormControl(Name, Validators.required),
      Cmimi: new FormControl(lastname, Validators.required),
      Sasia: new FormControl(Email, Validators.required),
      lloji: new FormControl(Password, Validators.required),
    });
  }
  kthehu() {
    this.router.navigate(['/admin']);
  }
}
