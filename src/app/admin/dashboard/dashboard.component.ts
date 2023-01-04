import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { FirebaseService } from "src/app/services/firebase.service";
import { BooksListComponent } from "../books-list/books-list.component";
import { BooksComponent } from "../books/books.component";
import { DialogComponent } from "../books/dialog/dialog.component";
import { NewStudentComponent } from "../message/new-student/new-student.component";
import { StudentsListComponent } from "../students-list/students-list.component";
import { StudentsService } from "../students-list/students.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ["title", "author", "action"];
  dataSource = [];
  form!: FormGroup;
  allData: any = [];
  data: any = [];
  constructor(
    private router: Router,
    private auth: AuthService,
    private studentsService: StudentsService,
    private firebase: FirebaseService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.studentsService.editableData = {
      id: "",
      username: 0,
      password: 0,
    };
    this.firebase.getReservedBooks().subscribe((data: any) => {
      console.log(data);
      this.dataSource = data;
    });
  }
  return(item: any) {
    this.allData.map((books: any) => {
      if (books.BookName === item.title) {
        books.status = "free";
        this.firebase.ndryshoProdukt(books);

        let bookHistory = {
          title: item.title,
          users: [],
        };
      }
    });
  }
  retrunBook(element: any) {
    element.status = "free";
    this.firebase.ndryshoProdukt(element);
    this.firebase.getPunonjes().subscribe((users: any) => {
      users.map((user: any) => {
        user.books.map((book: any) => {
          if (book.title === element.BookName) {
            let index = user.books.indexOf(book);
            user.books.splice(index, index + 1);
            this.firebase.reserveBook(user);
          }
        });
      });
    });
  }

  openDialog(item: any) {
    let dialogueRef = this.dialog.open(DialogComponent);
    let instance = dialogueRef.componentInstance;
    instance.books = item.books;
  }

  goToAddBooks() {
    const dialogRef = this.dialog.open(BooksComponent, {
      maxWidth: "50vw",
      maxHeight: "50vh",
      height: "50%",
      width: "50%",
    });
  }
  goToCheckBooks() {
    const dialogRef = this.dialog.open(BooksListComponent, {
      maxWidth: "100vw",
      maxHeight: "100vh",
      height: "100%",
      width: "100%",
    });
  }
  goToAddStudent() {
    const dialogRef = this.dialog.open(NewStudentComponent, {
      maxWidth: "50vw",
      maxHeight: "50vh",
      height: "50%",
      width: "50%",
    });
  }
  goToCheckStudents() {
    const dialogRef = this.dialog.open(StudentsListComponent, {
      maxWidth: "100vw",
      maxHeight: "100vh",
      height: "100%",
      width: "100%",
    });
  }

  getData(data: any) {
    this.allData = data;
    this.data = data;
  }
}
