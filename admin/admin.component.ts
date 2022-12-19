import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  form!: FormGroup;
  allData: any = [];
  data: any = [];
  constructor(private router: Router,private auth: AuthService) {}

  ngOnInit() {}
 
  goToAddBooks() {
    this.router.navigate(["/books"]);
  }
  goToCheckBooks(){
    this.router.navigate(["/books-list"])
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
    localStorage.removeItem('login');
    localStorage.clear();
    this.router.navigate(['']);
  }
}
