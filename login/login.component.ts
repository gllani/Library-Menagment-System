import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { FirebaseService } from "../firebase.service";
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
      console.log("data", data);
      this.student = data;
    });
  }

  test() {
    console.log("test");
    if (this.loginForm.valid) {
      this.student.map((student: any) => {
        console.log("students", student);
        if (
          student.username === this.loginForm.value.username &&
          student.password === this.loginForm.value.password
        ) {
          localStorage.setItem("login", student);
          if (student.role === "admin") {
            this.authService.isLoggedIn = true;
            this.authService.isAdmin = true;
            this.router.navigate(["Admin"]);
          } else {
            this.authService.isLoggedIn = true;
            this.authService.isAdmin = false;
            this.router.navigate(["Student"]);
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
