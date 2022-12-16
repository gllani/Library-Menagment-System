import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { BooksComponent } from "./admin/books/books.component";
import { NewStudentComponent } from "./admin/new-student/new-student.component";
import { StudentsListComponent } from "./admin/students-list/students-list.component";
import { GuardService } from "./guard.service";
import { HomepageComponent } from "./homepage/homepage.component";
import { SearchModalComponent } from "./homepage/search-modal/search-modal.component";
import { LoginComponent } from "./login/login.component";
import { ReserveComponent } from "./student/reserve/reserve.component";
import { StudentComponent } from "./student/student.component";

const routes: Routes = [
  {
    path: "",
    component: HomepageComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [GuardService] 
  },
  {
    path: "student",
    component: StudentComponent,
    canActivate: [GuardService] 
  },
  {
    path: "search-modal",
    component: SearchModalComponent,
  },
  {
    path: "new-student",
    component: NewStudentComponent,
  },
  {
    path: "students-list",
    component: StudentsListComponent,
  },
  {
    path: "books",
    component: BooksComponent,
  },  {
    path: "reserve",
    component: ReserveComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
