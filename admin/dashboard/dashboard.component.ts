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

export interface PeriodicElement {
  registrationId: number;
  studentId: number;
  id: number;
  date: number;
  status: string;
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    registrationId: 1,
    id: 1,
    studentId: 8,
    date: 1.0079,
    status: "H",
    action: "",
  },
  {
    registrationId: 1,
    id: 1,
    studentId: 8,
    date: 1.0079,
    status: "H",
    action: "",
  },
  {
    registrationId: 1,
    id: 1,
    studentId: 8,
    date: 1.0079,
    status: "H",
    action: "",
  },
  {
    registrationId: 1,
    id: 1,
    studentId: 8,
    date: 1.0079,
    status: "H",
    action: "",
  },
  {
    registrationId: 1,
    id: 1,
    studentId: 8,
    date: 1.0079,
    status: "H",
    action: "",
  },
  {
    registrationId: 1,
    id: 1,
    studentId: 8,
    date: 1.0079,
    status: "H",
    action: "",
  },
  {
    registrationId: 3,
    id: 1,
    studentId: 8,
    date: 1.0079,
    status: "H",
    action: "",
  },
  {
    registrationId: 1,
    id: 1,
    studentId: 8,
    date: 1.0079,
    status: "H",
    action: "",
  },
  {
    registrationId: 1,
    id: 1,
    studentId: 8,
    date: 1.0079,
    status: "H",
    action: "",
  },
  {
    registrationId: 1,
    id: 1,
    studentId: 8,
    date: 1.0079,
    status: "H",
    action: "",
  },
  {
    registrationId: 1,
    id: 1,
    studentId: 8,
    date: 1.0079,
    status: "H",
    action: "",
  },
  {
    registrationId: 1,
    id: 1,
    studentId: 8,
    date: 1.0079,
    status: "H",
    action: "",
  },
  {
    registrationId: 5,
    id: 1,
    studentId: 8,
    date: 1.0079,
    status: "H",
    action: "",
  },
];

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [
    "registrationId",
    "studentId",
    "id",
    "date",
    "status",
    "action",
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.studentsService.editableData = {
      id: "",
      username: 0,
      password: 0,
    };
    this.firebase.getPunonjes().subscribe((data: any) => {
      console.log("this.allData from fb", data);
      this.allData = data;
      this.data = this.allData;
    });
    // this.form = new FormGroup({
    //   filter: new FormControl(""),
    // });
  }
  return(item: any) {
    this.allData.map((books: any) => {
      if (books.BookName === item.title) {
        books.status = "free";
        this.firebase.ndryshoProdukt(books);

        let bookHistory = {
          title : item.title,
          users : []
        }
      }
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
