import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject } from "rxjs";
import { FirebaseService } from "src/app/services/firebase.service";
import { StudentsService } from "../students-list/students.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [
    "bookId",
    "title",
    "author",
    "startDate",
    "endDate",
    "reservedBy",
    "action",
  ];
  user: any;
  dataSource: any = [];
  form!: FormGroup;
  allData: any = [];
  data: any = [];
  loading: any = new BehaviorSubject(false);
  element: any;
  endDate: any;
  constructor(
    private studentsService: StudentsService,
    private firebase: FirebaseService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.studentsService.editableData = {
      id: "",
      username: 0,
      password: 0,
    };
    this.form = new FormGroup({
      search: new FormControl(""),
    });
    this.dataSource = [];
    this.firebase.getReservedBooks().subscribe((data: any) => {
      this.firebase.getPunonjes().subscribe((students: any) => {
        students.map((student: any) => {
          student.books.map((book: any) => {
            data.filter((e: any) => {
              if (e.BookName === book.title) {
                let item: any = {
                  BookName: e.BookName,
                  Name: e.Name,
                  customIdName: e.customIdName,
                  startDate: book.startDate,
                  endDate: book.endDate,
                  student: student.username,
                };
                this.dataSource.push(item);
              }
            });
          });
        });
        this.loading.next(true);
      });
    });
  }

  searchArray = (toSearch: string, array: any[]) => {
    this.loading.next(false);
    if (toSearch === "") {
      this.dataSource = [];
      this.firebase.getReservedBooks().subscribe((data: any) => {
        this.firebase.getPunonjes().subscribe((students: any) => {
          students.map((student: any) => {
            student.books.map((book: any) => {
              data.filter((e: any) => {
                if (e.BookName === book.title) {
                  let item: any = {
                    BookName: e.BookName,
                    Name: e.Name,
                    customIdName: e.customIdName,
                    startDate: book.startDate,
                    endDate: book.endDate,
                    student: student.username,
                  };
                  this.dataSource.push(item);
                }
              });
            });
          });
          this.loading.next(true);
        });
      });
    } else {
      let terms = toSearch.split(" ");
      this.dataSource = array.filter((object) =>
        terms.every((term) =>
          Object.values(object).some((value: any) =>
            typeof value === "string" || value instanceof String
              ? value.includes(term)
              : false
          )
        )
      );
      this.loading.next(true);
    }
  };

  openDialogWithTemplateRef(templateRef: TemplateRef<any>, element: any) {
    this.element = element;
    this.dialog.open(templateRef);
  }
  retrunBook(element: any) {
    element.status = "free";
    this.firebase.ndryshoProdukt(element);
    this.firebase.getPunonjes().subscribe((users: any) => {
      users.map((user: any) => {
        user.books.map((book: any) => {
          if (book.title === element.BookName) {
            let index = user.books.indexOf(book);
            user.books.splice(index, 1);
            this.firebase.reserveBook(user);
          }
        });
      });
      this.searchArray("", []);
    });
    this.element = "";
  }
  consvertStartDate(timeStamp: any) {
    let startDate = new Date(
      timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000
    );
    return startDate;
  }

  getData(data: any) {
    this.allData = data;
    this.data = data;
  }
}
