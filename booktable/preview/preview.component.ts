import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { FirebaseService } from "src/app/services/firebase.service";
import { PreviewService } from "./preview.service";

@Component({
  selector: "app-preview",
  templateUrl: "./preview.component.html",
  styleUrls: ["./preview.component.scss"],
})
export class PreviewComponent implements OnInit {
  minDate: any;
  maxDate: any;
  form!: FormGroup;
  user: any;
  isAdmin: boolean = false;
  error = false;
  displayData: boolean = false;
  item: any;
  dataToDispaly: any;

  constructor(
    public previewService: PreviewService,
    private firebase: FirebaseService
  ) {
    this.minDate = new Date();
    var future = new Date();
    this.maxDate = new Date(future.setDate(future.getDate() + 30));
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      startDate: new FormControl(""),
      endDate: new FormControl(""),
    });
    this.item = this.previewService.item;
    this.firebase.getPunonjes().subscribe((users: any) => {
      users.map((booksOfUsers: any) => {
        booksOfUsers.books.map((data: any) => {
          if (data.title === this.item.BookName) {
            this.dataToDispaly = {
              owner: booksOfUsers.username,
              start: data.startDate,
              end: data.endDate,
            };
          }
        });
      });
    });
    if (localStorage.getItem("login")) {
      let user = localStorage.getItem("login");
      this.user = JSON.parse(user || "");
      if (this.user.role === "admin" || this.user === "") {
        this.isAdmin = true;
        this.displayData = true;
      }
    } else {
      this.isAdmin = true;
    }
  }

  getStatusColor(status: any) {
    return status === "free" ? "green" : "red";
  }
  consvertStartDate(timeStamp: any) {
    let startDate = new Date(
      timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000
    );
    return startDate;
  }

  reserve(item: any) {
    if (item.status === "free") {
      let data = this.previewService.user;
      if (data.books.length === 3) {
        alert("You can not reserve more books");
      } else {
        let bookItem = {
          title: item.BookName,
          author: item.Name,
          startDate: this.form.value.startDate,
          endDate: this.form.value.endDate,
        };
        let stringArray: any = [];
        data.books.map((book: any) => {
          let bookFromuser = JSON.stringify(book.title);
          stringArray.push(bookFromuser);
        });

        let stringBook: any = JSON.stringify(bookItem.title);
        if (!stringArray.includes(stringBook)) {
          let history: any = {
            title: item.BookName,
            author: item.Name,
            startDate: this.form.value.startDate,
            endDate: this.form.value.endDate,
            name: this.user.username,
          };
          item.status = "reserved";
          data.books.push(bookItem);
          this.firebase.ndryshoProdukt(item);
          this.firebase.reserveBook(data);
          this.firebase.addNewToHistory(history);
        } else {
          alert("You alredy have this book");
        }
      }
    } else {
      alert("this book is alredy reserved");
    }
  }
}
