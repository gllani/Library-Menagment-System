import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { FirebaseService } from "src/app/firebase.service";
import { BookService } from "../books/book.service";

@Component({
  selector: "app-books-list",
  templateUrl: "./books-list.component.html",
  styleUrls: ["./books-list.component.scss"],
})
export class BooksListComponent implements OnInit {
  addProduct: boolean = false;
  editProduct: boolean = false;
  deleteProduct: boolean = false;
  disableProduct: boolean = false;
  showModal: boolean = false;
  form!: FormGroup;
  allData: any = [];
  data: any = [];
  searchText: any;
  todayDate : Date = new Date();
  dateVal  =new Date();

  constructor(
    private router: Router,
    private bookService: BookService,
    private firebase: FirebaseService
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

  setShowModal(value: boolean, item: any) {
    console.log(item);
    this.bookService.deleteItem = item;
    this.showModal = value;
  }

  deleteFunction(event: any) {
    if (event.type === "yes") {
      this.firebase.fshiProdukt(event.id);
      this.showModal = false;
    }
    if (event.type === "close" || event.type === "no") {
      this.showModal = false;
    }
  }

  ngAfterViewInit() {}

  ngOnInit(): void {
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

  goToEdit(item: any) {
    this.editProduct = true;
    this.addProduct = false;
    this.bookService.editableData = item;
    this.router.navigate(["books"]);
  }
  goToDelete(item: any) {
    this.deleteProduct = false;
    this.showModal = true;
    this.bookService.editableData = item;
  }
  goToAdd(item: any) {
    this.addProduct = true;
    this.editProduct = false;
    this.router.navigate(["books"]);
    this.bookService.editableData = item;
  }
  goToDisable(item: any) {}
}
