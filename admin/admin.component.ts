import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { FirebaseService } from "../firebase.service";
import { DialogComponent } from "./dialog/dialog.component";
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
      id: 0,
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
  openDialog() {
    this.dialog.open(DialogComponent, {
      data: {
    
      },
    });
  }

  goToAddBooks() {
    this.router.navigate(["/books"]);
  }
  goToCheckBooks() {
    this.router.navigate(["/books-list"]);
  }
  goToAddStudent() {
    this.router.navigate(["/new-student"]);
  }
  goToCheckStudents() {
    this.router.navigate(["/students-list"]);
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
