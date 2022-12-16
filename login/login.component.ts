import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ["", Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ["", Validators.required],
  });
  title = "login";
  loginForm!: FormGroup;
  student: any[] = [];
  dontexist = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.student.map((student: any) => {
        if (
          student.username === this.loginForm.value.username &&
          student.password === this.loginForm.value.password
        ) {
          localStorage.setItem("login", student);
          if (student.role === "admin") {
            this.authService.isLoggedIn = true;
            this.authService.isAdmin = true;
            this.router.navigate(["admin"]);
          } else {
            this.authService.isLoggedIn = true;
            this.authService.isAdmin = false;
            this.router.navigate(["student"]);
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
