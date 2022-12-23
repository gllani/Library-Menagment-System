import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { BookService } from "src/app/admin/books/book.service";
import { FirebaseService } from "src/app/firebase.service";

@Component({
  selector: "app-homepage-books",
  templateUrl: "./homepage-books.component.html",
  styleUrls: ["./homepage-books.component.scss"],
})
export class HomepageBooksComponent implements OnInit {
  form!: FormGroup;
  allData: any = [];
  data: any = [];
  minDate!: any;
  maxDate!: any;
  logedInIndividual: any;

  constructor(
    private bookService: BookService,
    private firebase: FirebaseService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      startdate: new FormControl(""),
      enddate: new FormControl(""),
    });
    this.bookService.editableData = {
      BookName: "",
      Name: ""
    };
    this.firebase.getData().subscribe((data: any) => {
      console.log("data nga firebasi", data);
      this.allData = data;
      this.data = this.allData;
    });
  }
}
