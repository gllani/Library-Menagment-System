import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { FirebaseService } from "src/app/firebase.service";
import { GoogleAPIService } from "src/app/homepage/search-modal/google-api.service";
import { AdminComponent } from "../admin.component";
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
  automaticBook!: FormGroup;
  allData: any = [];
  data: any = [];
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

  searchData: any[] = [];

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
    };
    this.firebase.addProduct(item);
  }

  constructor(
    private router: Router,
    private bookService: BookService,
    private firebase: FirebaseService,
    private dialogRef: MatDialogRef<AdminComponent>,
    private dialog: MatDialog,
    private bookservice: BookService,
    private googleApiService: GoogleAPIService
  ) {}
  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
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

  search() {
    this.googleApiService
      .searchBook(this.automaticBook.value.search)
      .subscribe((data: any) => {
        console.log(data);
        this.searchData = data.items;
      });
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
  onClose(): void {
    this.dialogRef.close(true);
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

    this.form = new FormGroup({
      BookName: new FormControl(BookName, Validators.required),
      Name: new FormControl(Name, Validators.required),
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
}
