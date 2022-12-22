import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { BooksListComponent } from "./admin/books-list/books-list.component";
import { BooksComponent } from "./admin/books/books.component";
import { NewStudentComponent } from "./admin/new-student/new-student.component";
import { StudentsListComponent } from "./admin/students-list/students-list.component";
import { GuardService } from "./guard.service";
import { HomepageBooksComponent } from "./homepage/homepage-books/homepage-books.component";
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
    path: "homepage/books",
    component: HomepageBooksComponent,
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [GuardService],
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [GuardService],
    children: [
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
      },
      {
        path: "books-list",
        component: BooksListComponent,
      },
    ],
  },
  {
    path: "student",
    component: StudentComponent,
    canActivate: [GuardService],
    children: [
      {
        path: "reserve",
        component: ReserveComponent,
      },
    ],
  },

  {
    path: "search-modal",
    component: SearchModalComponent,
  },
  { path: "**", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
