import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../guards/auth.service";
import { FirebaseService } from "../services/firebase.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  title = "login";
  loginForm!: FormGroup;
  student: any[] = [];
  dontexist: any = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private authService: AuthService,
    private firebase: FirebaseService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
    this.firebase.getPunonjes().subscribe((data: any) => {
      this.student = data;
    });
  }

  test() {
    if (this.loginForm.valid) {
      this.student.map((student: any) => {
        if (
          student.username === this.loginForm.value.username &&
          student.password === this.loginForm.value.password
        ) {
          localStorage.setItem("login", JSON.stringify(student));
          if (student.role === "admin") {
            this.authService.isLoggedIn = true;
            this.authService.isAdmin = true;
            this.router.navigate(["admin/dashboard"]);
          } else {
            this.authService.isLoggedIn = true;
            this.authService.isAdmin = false;
            this.router.navigate(["student/book-list"]);
          }
        } else {
          this.dontexist.next(true);
        }
      });
    } else {
      alert("Please Enter Valid Username and Password");
    }
  }
  openGmail() {
    window.open(
      "https://accounts.google.com/v3/signin/identifier?dsh=S-1291780961%3A1671800748218277&continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&ifkv=AeAAQh686pSnyPYbfpchbK6V9W-cyqQZ5BOjgeMKri2pEDtm80K6v0Mknbl8L2o5DhXldkerVH48"
    );
  }
}
