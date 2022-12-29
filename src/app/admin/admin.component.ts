import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { FirebaseService } from "../services/firebase.service";
import { BooksListComponent } from "./books-list/books-list.component";
import { BooksComponent } from "./books/books.component";
import { DialogComponent } from "./books/dialog/dialog.component";
import { MessageComponent } from "./message/message.component";
import { NewStudentComponent } from "./message/new-student/new-student.component";
import { StudentsListComponent } from "./students-list/students-list.component";
import { StudentsService } from "./students-list/students.service";

import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  form!: FormGroup;
  constructor(
    public router: Router,
    private auth: AuthService,
    private studentsService: StudentsService,
    private firebase: FirebaseService,
    public dialog: MatDialog
  ) {}
  
  ngOnInit() {

  }

  logOut() {
    this.auth.isLoggedIn = false;
    this.auth.isAdmin = false;
    localStorage.removeItem("login");
    localStorage.clear();
    this.router.navigate([""]);
  }
  openGmail() {
    window.open(
      "https://accounts.google.com/v3/signin/identifier?dsh=S-1291780961%3A1671800748218277&continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&ifkv=AeAAQh686pSnyPYbfpchbK6V9W-cyqQZ5BOjgeMKri2pEDtm80K6v0Mknbl8L2o5DhXldkerVH48"
    );
  }
}
