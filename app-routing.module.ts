import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { BooksListComponent } from "./admin/books-list/books-list.component";
import { StudentsListComponent } from "./admin/students-list/students-list.component";
import { HomepageBooksComponent } from "./homepage/homepage-books/homepage-books.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { SearchModalComponent } from "./homepage/search-modal/search-modal.component";
import { LoginComponent } from "./login/login.component";
import { StudentComponent } from "./student/student.component";
import { BooktableComponent } from "./booktable/booktable.component";
import { HistoryComponent } from "./student/history/history.component";
import { DashboardComponent } from "./admin/dashboard/dashboard.component";
import { MessagesComponent } from "./student/messages/messages.component";
import { GuardGuard } from "./guards/guard.guard";

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
    path: "search-modal",
    component: SearchModalComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [GuardGuard],
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
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
  },
  {
    path: "student",
    component: StudentComponent,
    canActivate: [GuardGuard],
    children: [
      {
        path: "book-list",
        component: BooktableComponent,
      },
      {
        path: "history",
        component: HistoryComponent,
      },
      {
        path: "messages",
        component: MessagesComponent,
      },
    ],
  },

  { path: "**", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
