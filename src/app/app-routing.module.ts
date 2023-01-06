import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { BooksListComponent } from "./admin/books-list/books-list.component";
import { NewStudentComponent } from "./admin/message/new-student/new-student.component";
import { StudentsListComponent } from "./admin/students-list/students-list.component";
import { GuardService } from "./services/guard.service";
import { HomepageBooksComponent } from "./homepage/homepage-books/homepage-books.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { SearchModalComponent } from "./homepage/search-modal/search-modal.component";
import { LoginComponent } from "./login/login.component";
import { StudentComponent } from "./student/student.component";
import { BooktableComponent } from "./booktable/booktable.component";
import { HistoryComponent } from "./student/history/history.component";
import { DashboardComponent } from "./admin/dashboard/dashboard.component";

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
  },
  {
    path: "admin",
    component: AdminComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "new-student",
        component: NewStudentComponent,
      },
      {
        path: "students",
        component: StudentsListComponent,
      },
      {
        path: "books-list",
        component: BooksListComponent,
      },
      {
        path: "books-preview",
        component: BooktableComponent,
      },
    ],
    canActivate: [GuardService],
    
  },
  {
    path: "student",
    component: StudentComponent,
    canActivate: [GuardService],
    children: [
      {
        path: "book-list",
        component: BooktableComponent,
      },
      {
        path: "history",
        component: HistoryComponent,
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
