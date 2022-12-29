import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FirebaseService } from "../services/firebase.service";
import { PreviewService } from "./preview/preview.service";
import { PreviewComponent } from "./preview/preview.component";

@Component({
  selector: "app-booktable",
  templateUrl: "./booktable.component.html",
  styleUrls: ["./booktable.component.scss"],
})
export class BooktableComponent implements OnInit {
  allData: any[] = [];
  user: any;
  inactiveClass: any;
  @Input() admin: boolean = false;
  @Input() bookMenu: boolean = false;
  @Input() student: boolean = false;

  constructor(
    private firebase: FirebaseService,
    public previewService: PreviewService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.firebase.getData().subscribe((data: any) => {
      if (this.admin === false) {
        this.allData = data;
      } else {
        data.map((book: any) => {
          if (book.status === "reserved") {
            this.allData.push(book);
          }
        });
      }
    });
    if (this.admin === true || this.bookMenu === true) {
      this.inactiveClass = "card";
    } else {
      this.inactiveClass = "deactriveCard";
    }
    let user = localStorage.getItem("login");
    this.user = JSON.parse(user || "");
    this.firebase
      .getSpecificUser(this.user.customIdName)
      .subscribe((user: any) => {
        this.previewService.user = user;
      });
  }
  openDialog(item: any) {
    if (this.student === true && item.status === "free") {
      this.previewService.item = item;
      const dialogRef = this.dialog.open(PreviewComponent);

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    } else {
      this.previewService.item = item;
      const dialogRef = this.dialog.open(PreviewComponent);

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }
}
