import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { BookService } from "src/app/admin/books/book.service";
import { FirebaseService } from "src/app/firebase.service";

@Component({
  selector: "app-reserve",
  templateUrl: "./reserve.component.html",
  styleUrls: ["./reserve.component.scss"],
})
export class ReserveComponent implements OnInit {
  form!: FormGroup;
  allData: any = [];
  data: any = [];
  minDate!: any;
  maxDate!: any;
  logedInIndividual: any;

  constructor(
    private bookService: BookService,
    private firebase: FirebaseService
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    var future = new Date();
    this.maxDate = new Date(future.setDate(future.getDate() + 30));
  }

  save(item: any) {
    console.log("item", item);
    let bookItem = {
      title: item.BookName,
      author: item.Name,
      startDate: this.form.value.startdate,
      endDate: this.form.value.enddate,
    };
    console.log("item", bookItem);
  }

  ngOnInit(): void {
    this.logedInIndividual = JSON.parse(localStorage.getItem("login") || "");
    this.form = new FormGroup({
      filter: new FormControl(""),
      startdate: new FormControl(""),
      enddate: new FormControl(""),
    });
    this.bookService.editableData = {
      BookName: "",
      Name: "",
    };
    this.firebase.getData().subscribe((data: any) => {
      console.log("data nga firebasi", data);
      this.allData = data;
      this.data = this.allData;
    });
    this.form = new FormGroup({
      filter: new FormControl(""),
    });
  }
  filter() {
    this.data = this.searchArray(this.form.value.filter, this.data);
    if (this.form.value.filter === "") {
      this.data = this.allData;
    }
  }
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
}
