import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
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
  dontexist = false;

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
          this.dontexist = true;
        }
      });
    } else {
      alert("Please Enter Valid Username and Password");
    }
  }
}
