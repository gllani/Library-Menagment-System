import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { FirebaseService } from "src/app/firebase.service";
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
    let user = localStorage.getItem("login");
    this.user = JSON.parse(user || "");
    if (this.user.role === "admin") {
      this.isAdmin = true;
    }
  }

  reserve(item: any) {
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
      console.log("string", stringArray, stringBook);
      if (!stringArray.includes(stringBook)) {
        item.status = "reserved";
        data.books.push(bookItem);
        this.firebase.ndryshoProdukt(item);
        this.firebase.reserveBook(data);
      } else {
        alert("You alredy have this book");
      }
    }
  }
}
