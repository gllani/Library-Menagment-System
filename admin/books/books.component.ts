import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { FirebaseService } from "src/app/services/firebase.service";
import { BookService } from "./book.service";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.scss"],
})
export class BooksComponent implements OnInit {
  title = "books";
  form!: FormGroup;

  constructor(
    private router: Router,
    private bookservice: BookService,
    private firebase: FirebaseService
  ) {}

  ngOnInit(): void {
    let BookName: any = "";
    let Name: any = "";
    if (this.bookservice.editableData.BookName !== "") {
      BookName = this.bookservice.editableData.BookName;
    }
    if (this.bookservice.editableData.Name !== "") {
      Name = this.bookservice.editableData.Name;
    }

    this.form = new FormGroup({
      BookName: new FormControl(BookName, Validators.required),
      Name: new FormControl(Name, Validators.required),
    });
  }
  kthehu() {
    this.router.navigate(["/admin"]);
  }

  goToAdd() {
    let item = {
      BookName: this.form.value.BookName,
      Name: this.form.value.Name,
    };
    this.firebase.addProduct(item);
    this.router.navigate(["/books-list"]);
  }
}
