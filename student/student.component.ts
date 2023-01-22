import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { BookService } from "../services/book.service";
import { AuthService } from "../guards/auth.service";
import { FirebaseService } from "../services/firebase.service";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.scss"],
})
export class StudentComponent implements OnInit {
  form!: FormGroup;
  allData: any = [];
  data: any = [];
  minDate!: any;
  maxDate!: any;
  logedInIndividual: any;
  user: any;
  userData: any;
  bookTable: boolean = true;
  history: boolean = false;
  messages: boolean = false;
  mesages: any[] = [];
  loading: any = new BehaviorSubject(false);

  constructor(
    private auth: AuthService,
    public router: Router,
    private bookService: BookService,
    private firebase: FirebaseService,
    private dialog: MatDialog
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    var future = new Date();
    this.maxDate = new Date(future.setDate(future.getDate() + 30));
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      filter: new FormControl(""),
      author: new FormControl(""),
      startdate: new FormControl(""),
      enddate: new FormControl(""),
      category: new FormControl(""),
    });
    this.bookService.editableData = {
      BookName: "",
      Name: "",
    };
    this.firebase.getData().subscribe((data: any) => {
      this.allData = data;
      this.data = this.allData;
      this.loading.next(true);
    });
  }

  consvertStartDate(timeStamp: any) {
    let startDate = new Date(
      timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000
    );
    return startDate;
  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }

  onLogout() {
    this.auth.isLoggedIn = false;
    this.auth.isAdmin = false;
    localStorage.removeItem("login");
    localStorage.clear();
    this.router.navigate([""]);
    this.form = new FormGroup({
      startdate: new FormControl(""),
      enddate: new FormControl(""),
    });
    this.firebase.getData().subscribe((data: any) => {
      this.allData = data;
      this.data = this.allData;
    });
  }
}
