import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { AdminComponent } from "./admin/admin.component";
import { StudentComponent } from "./student/student.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NewStudentComponent } from "./admin/message/new-student/new-student.component";
import { StudentsListComponent } from "./admin/students-list/students-list.component";
import { BooksComponent } from "./admin/books/books.component";
import { SearchModalComponent } from "./homepage/search-modal/search-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { environment } from "../environments/environment";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { provideFirestore, getFirestore } from "@angular/fire/firestore";
import { ReserveComponent } from "./student/reserve/reserve.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatNativeDateModule } from "@angular/material/core";
import { FIREBASE_OPTIONS } from "@angular/fire/compat";
import { HttpClientModule } from "@angular/common/http";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { BooksListComponent } from "./admin/books-list/books-list.component";
import { MatTableModule } from "@angular/material/table";
import { DeleteModalComponent } from "./admin/books-list/delete-modal/delete-modal.component";
import { DialogComponent } from "./admin/books/dialog/dialog.component";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { HomepageBooksComponent } from "./homepage/homepage-books/homepage-books.component";
import { MatSelectModule } from "@angular/material/select";
import { MessageComponent } from "./admin/message/message.component";
import { MatCardModule } from "@angular/material/card";
import { PreviewComponent } from "./booktable/preview/preview.component";
import { BooktableComponent } from "./booktable/booktable.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { DashboardComponent } from "./admin/dashboard/dashboard.component";
import { HistoryComponent } from "./student/history/history.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    AdminComponent,
    StudentComponent,
    NewStudentComponent,
    StudentsListComponent,
    BooksComponent,
    SearchModalComponent,
    ReserveComponent,
    BooksListComponent,
    DeleteModalComponent,
    DialogComponent,
    HomepageBooksComponent,
    MessageComponent,
    PreviewComponent,
    BooktableComponent,
    DashboardComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatCardModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent],
})
export class AppModule {}
