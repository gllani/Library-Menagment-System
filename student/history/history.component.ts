import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "src/app/services/firebase.service";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.scss"],
})
export class HistoryComponent implements OnInit {
  user: any;
  dataSource = [];
  displayedColumns: string[] = [
    "bookName",
    "startDate",
    "endDate",
    "reservedBy",
  ];

  constructor(private firebase: FirebaseService) {}

  ngOnInit(): void {
    let user = localStorage.getItem("login");
    this.user = JSON.parse(user || "");
    this.firebase.getHistory(this.user).subscribe((history: any) => {
      this.dataSource = history;
    });
  }
  consvertStartDate(timeStamp: any) {
    let startDate = new Date(
      timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000
    );
    return startDate;
  }
}
