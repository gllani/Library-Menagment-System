import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './student/student.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewStudentComponent } from './admin/new-student/new-student.component';
import { StudentsListComponent } from './admin/students-list/students-list.component';
import { BooksComponent } from './admin/books/books.component';
import { SearchModalComponent } from './homepage/search-modal/search-modal.component';
import { AboutComponent } from './student/about/about.component';
import { ContactComponent } from './student/contact/contact.component';
import { PanelComponent } from './student/panel/panel.component';
import { HomeComponent } from './student/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { ReserveComponent } from './student/reserve/reserve.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';

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
    ReserveComponent
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
    MatNativeDateModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
