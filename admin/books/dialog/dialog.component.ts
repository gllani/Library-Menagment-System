import { Component, Inject, Input, OnInit } from "@angular/core";

import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
@Inject(MAT_DIALOG_DATA)
@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent implements OnInit {
  @Input() books: any[] = [];
  public data: any[] = [];
  startDate: any;
  endDate: any;
  constructor(private dialog: MatDialog) {}

  // consvertStartDate(timeStamp: any) {
  //   let startDate = new Date(
  //     timeStamp.startDate.seconds * 1000 +
  //       timeStamp.startDate.nanoseconds / 1000000
  //   );
  //   let endDate = new Date(
  //     timeStamp.endDate.seconds * 1000 + timeStamp.endDate.nanoseconds / 1000000
  //   );
  //   return startDate;
  // }
  // consvertEndDate(timeStamp: any) {
  //   let endDate = new Date(
  //     timeStamp.endDate.seconds * 1000 + timeStamp.endDate.nanoseconds / 1000000
  //   );
  //   return endDate;
  // }

  ngOnInit(): void {}
}
