import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { FirebaseService } from "../firebase.service";
import { BooksListComponent } from "./books-list/books-list.component";
import { BooksComponent } from "./books/books.component";
import { DialogComponent } from "./dialog/dialog.component";
import { NewStudentComponent } from "./new-student/new-student.component";
import { StudentsListComponent } from "./students-list/students-list.component";
import { StudentsService } from "./students-list/students.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
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
    this.firebase.getPunonjes().subscribe((data: any) => {
      console.log("this.allData from fb", data);
      this.allData = data;
      this.data = this.allData;
    });
    this.form = new FormGroup({
      filter: new FormControl(""),
    });
  }
  openDialog(item: any) {
    let dialogueRef = this.dialog.open(DialogComponent);
    let instance = dialogueRef.componentInstance;
    instance.books = item.books;
  }

  goToAddBooks() {
    const dialogRef = this.dialog.open(BooksComponent, {
      maxWidth: '50vw',
      maxHeight: '50vh',
      height: '50%',
      width: '50%',
    
    });
  }
  goToCheckBooks() {
    const dialogRef = this.dialog.open(BooksListComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
    
    });
  }
  goToAddStudent() {
    const dialogRef = this.dialog.open(NewStudentComponent, {
      maxWidth: '50vw',
      maxHeight: '50vh',
      height: '50%',
      width: '50%',
    
    });
  }
  goToCheckStudents() {
    const dialogRef = this.dialog.open(StudentsListComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
    
    });
  }
  searchArray(filter: any, data: any): any {
    const result: any[] = [];
    data.forEach((element: { name: string; email: string }) => {
      if (
        element.name.toLowerCase().includes(filter.toLowerCase()) ||
        element.email.toLowerCase().includes(filter.toLowerCase())
      ) {
        result.push(element);
      }
    });
    return result;
  }
  getData(data: any) {
    this.allData = data;
    this.data = data;
  }

  logOut() {
    this.auth.isLoggedIn = false;
    this.auth.isAdmin = false;
    localStorage.removeItem("login");
    localStorage.clear();
    this.router.navigate([""]);
  }
}