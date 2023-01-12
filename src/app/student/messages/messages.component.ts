import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FirebaseService } from "src/app/services/firebase.service";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.scss"],
})
export class MessagesComponent implements OnInit {
  mesages: any[] = [];
  allData: any = [];
  data: any = [];
  user: any;
  userData: any;

  constructor(
    private firebase: FirebaseService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.firebase.getData().subscribe((data: any) => {
      this.allData = data;
      this.data = this.allData;
    });
    let user = localStorage.getItem("login");
    this.user = JSON.parse(user || "");
    this.firebase
      .getSpecificUser(this.user.customIdName)
      .subscribe((userData: any) => {
        this.userData = userData;
        this.userData.books.map((book: any) => {
          let today = new Date();
          today.setHours(0, 0, 0, 0);

          if (this.consvertStartDate(book.endDate) < today) {
            let item = {
              name: book.title,
              status: "overdue",
            };
            this.mesages.push(item);
          } else if (this.consvertStartDate(book.endDate) > today) {
            console.log(this.consvertStartDate(book.endDate), today);
          } else {
            let item = {
              name: book.title,
              status: "close",
            };
            this.mesages.push(item);
          }
        });
      });
  }
  consvertStartDate(timeStamp: any) {
    let startDate = new Date(
      timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000
    );
    return startDate;
  }
}
