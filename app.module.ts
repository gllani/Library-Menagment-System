import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { AdminComponent } from "./admin/admin.component";
import { StudentComponent } from "./student/student.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NewStudentComponent } from "./admin/new-student/new-student.component";
import { StudentsListComponent } from "./admin/students-list/students-list.component";
import { BooksComponent } from "./admin/books/books.component";
import { SearchModalComponent } from "./homepage/search-modal/search-modal.component";
import { AboutComponent } from "./student/about/about.component";
import { ContactComponent } from "./student/contact/contact.component";
import { PanelComponent } from "./student/panel/panel.component";
import { HomeComponent } from "./student/home/home.component";
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
import { DeleteModalComponent } from "./admin/delete-modal/delete-modal.component";
import { DialogComponent } from "./admin/dialog/dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
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
    AboutComponent,
    ContactComponent,
    PanelComponent,
    HomeComponent,
    ReserveComponent,
    BooksListComponent,
    DeleteModalComponent,
    DialogComponent,
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
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent],
})
export class AppModule {}
