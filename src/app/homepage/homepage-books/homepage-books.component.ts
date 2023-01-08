import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { BookService } from "src/app/services/book.service";
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

  constructor(
    private bookService: BookService,
    public dialog: MatDialog,
    public PreviewService: PreviewService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      startdate: new FormControl(""),
      enddate: new FormControl(""),
    });
    this.bookService.editableData = {
      BookName: "",
      Name: "",
    };
  }
}
