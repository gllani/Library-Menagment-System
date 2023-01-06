import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject, elementAt } from "rxjs";
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
  displayedColumns: string[] = [
    "bookId",
    "title",
    "author",
    "startDate",
    "endDate",
    "action",
  ];
  user: any;
  dataSource: any = [];
  form!: FormGroup;
  allData: any = [];
  data: any = [];
  loading: any = new BehaviorSubject(false);

  constructor(
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
      this.firebase.getPunonjes().subscribe((students: any) => {
        students.map((student: any) => {
          student.books.map((book: any) => {
            data.filter((e: any) => {
              if (e.BookName === book.title) {
                let item: any = {
                  BookName: e.BookName,
                  Name: e.Name,
                  customIdName: e.customIdName,
                  startDate: book.startDate,
                  endDate: book.endDate,
                  student: student.username,
                };
                this.dataSource.push(item);
              }
            });
          });
        });
        console.log(this.dataSource);
        this.loading.next(true);
      });
    });
  }
  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }
  consvertStartDate(timeStamp: any) {
    console.log(timeStamp);
    let startDate = new Date(
      timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000
    );
    return startDate;
  }

  sortByDate() {
    this.dataSource.sort(function (x: { timestamp: number; }, y: { timestamp: number; }) {
      return x.timestamp - y.timestamp;
    });
  }

  return(item: any) {
    this.allData.map((books: any) => {
      if (books.BookName === item.title) {
        books.status = "free";
        this.firebase.ndryshoProdukt(books);

        let bookHistory = {
          title: item.title,
          startDate: item.startDate,
          endDate: item.endDate,
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
