import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { BookService } from "src/app/services/book.service";
import { FirebaseService } from "src/app/services/firebase.service";
import { PreviewService } from "../../booktable/preview/preview.service";
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
  booksToDisplay: any[] = [];

  constructor(
    private bookService: BookService,
    public dialog: MatDialog,
    public PreviewService: PreviewService,
    private firebase: FirebaseService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      startdate: new FormControl(""),
      enddate: new FormControl(""),
      filter: new FormControl(""),
      author: new FormControl(""),
      category: new FormControl(""),
    });
    this.bookService.editableData = {
      BookName: "",
      Name: "",
    };
    this.firebase.getData().subscribe((data: any) => {
      this.booksToDisplay.push(
        data[0],
        data[1],
        data[2],
        data[3],
        data[4],
        data[5],
        data[6],
        data[7],
        data[7]
      );
    });
  }
}
