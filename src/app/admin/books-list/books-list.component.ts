import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { FirebaseService } from "src/app/services/firebase.service";
import { GoogleAPIService } from "src/app/homepage/search-modal/google-api.service";
import { BookService } from "../../services/book.service";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-books-list",
  templateUrl: "./books-list.component.html",
  styleUrls: ["./books-list.component.scss"],
})
export class BooksListComponent implements OnInit {
  loading: any = new BehaviorSubject(false);
  addProduct: boolean = false;
  editProduct: boolean = false;
  deleteProduct: boolean = false;
  disableProduct: boolean = false;
  showModal: boolean = false;
  form!: FormGroup;
  automaticBook!: FormGroup;
  allData: any = [];
  data: any = [];
  searchData: any[] = [];
  searchText: any;
  todayDate: Date = new Date();
  dateVal = new Date();
  displayData: any = {
    volumeInfo: {
      title: "",
      authors: [""],
      description: "",
      imageLinks: {
        thumbnail: "",
      },
    },
  };
  constructor(
    private router: Router,
    private bookService: BookService,
    private firebase: FirebaseService,
    private dialog: MatDialog,
    private bookservice: BookService,
    private googleApiService: GoogleAPIService
  ) {}
  ngOnInit(): void {
    this.bookService.editableData = {
      BookName: "",
      Name: "",
    };
    this.firebase.getData().subscribe((data: any) => {
      this.allData = data;
      this.data = this.allData;
    });
    this.form = new FormGroup({
      filter: new FormControl(""),
    });
    this.automaticBook = new FormGroup({
      search: new FormControl(""),
    });
    let BookName: any = "";
    let Name: any = "";
    if (this.bookservice.editableData.BookName !== "") {
      BookName = this.bookservice.editableData.BookName;
    }
    if (this.bookservice.editableData.Name !== "") {
      Name = this.bookservice.editableData.Name;
    }
  }
  searchArray = (toSearch: string, array: any[]) => {
    if (toSearch === "") {
      this.allData = [];
      this.firebase.getData().subscribe((data: any) => {
        this.allData = data;
        this.data = this.allData;
      });
    } else {
      let terms = toSearch.split(" ");
      this.data = array.filter((object) =>
        terms.every((term) =>
          Object.values(object).some((value: any) =>
            typeof value === "string" || value instanceof String
              ? value.includes(term)
              : false
          )
        )
      );
    }
  };
  displayFn(user: any): string {
    return user && user.name ? user.name : "";
  }

  display(option: any) {
    this.displayData = {};
    this.displayData = option;
  }

  addBook() {
    let item = {
      BookName: this.displayData.volumeInfo.title,
      Name: this.displayData.volumeInfo.authors[0],
      description: this.displayData.volumeInfo.description,
      img: this.displayData.volumeInfo.imageLinks.thumbnail,
      status: "free",
      categories: this.displayData.volumeInfo.categories[0],
    };
    this.firebase.addProduct(item);
  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }

  search() {
    this.googleApiService
      .searchBook(this.automaticBook.value.search)
      .subscribe((data: any) => {
        this.searchData = data.items;
      });
  }

  setShowModal(value: boolean, item: any) {
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
}
