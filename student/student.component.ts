import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.scss"],
})
export class StudentComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,private auth: AuthService,private router: Router,) {}

  ngOnInit(): void {
    this.activatedRoute.fragment.subscribe((value) => {
      this.jumpTo(value);
    });
  }
  jumpTo(section: any) {
    document.getElementById(section)
      ?.scrollIntoView({ behavior: "smooth" });
  }
  onLogout() {
    this.auth.isLoggedIn = false;
    this.auth.isAdmin = false;
    localStorage.removeItem('login');
    localStorage.clear();
    this.router.navigate(['']);
  }
}
