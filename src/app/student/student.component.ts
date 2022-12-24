import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BookService } from "../admin/books/book.service";
import { AuthService } from "../auth.service";
import { FirebaseService } from "../firebase.service";

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private bookService: BookService,
    private firebase: FirebaseService
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    var future = new Date();
    this.maxDate = new Date(future.setDate(future.getDate() + 30));
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      filter: new FormControl(""),
      startdate: new FormControl(""),
      enddate: new FormControl(""),
    });
    this.bookService.editableData = {
      BookName: "",
      Name: "",
    };
    this.firebase.getData().subscribe((data: any) => {
      console.log("data nga firebasi", data);
      this.allData = data;
      this.data = this.allData;
    });
    let user = localStorage.getItem("login");
    this.user = JSON.parse(user || "");
    this.firebase
      .getSpecificUser(this.user.customIdName)
      .subscribe((userData: any) => {
        this.userData = userData;
      });
    this.form = new FormGroup({
      filter: new FormControl(""),
    });
  }

  convertstartDate(item: any) {
    return new Date(item.seconds * 1000 + item.nanoseconds / 1000000);
  }

  onLogout() {
    this.auth.isLoggedIn = false;
    this.auth.isAdmin = false;
    localStorage.removeItem("login");
    localStorage.clear();
    this.router.navigate([""]);
    this.form = new FormGroup({
      filter: new FormControl(""),
      startdate: new FormControl(""),
      enddate: new FormControl(""),
    });

    this.firebase.getData().subscribe((data: any) => {
      console.log("data nga firebasi", data);
      this.allData = data;
      this.data = this.allData;
    });
    this.form = new FormGroup({
      filter: new FormControl(""),
    });
  }
}
