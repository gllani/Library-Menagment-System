import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FirebaseService } from "../firebase.service";
import { PreviewService } from "./preview/preview.service";
import { PreviewComponent } from "./preview/preview.component";

@Component({
  selector: "app-booktable",
  templateUrl: "./booktable.component.html",
  styleUrls: ["./booktable.component.scss"],
})
export class BooktableComponent implements OnInit {
  allData: any;
  user: any;

  constructor(
    private firebase: FirebaseService,
    public previewService: PreviewService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.firebase.getData().subscribe((data: any) => {
      this.allData = data;
    });
    let user = localStorage.getItem("login");
    this.user = JSON.parse(user || "");
    this.firebase
      .getSpecificUser(this.user.customIdName)
      .subscribe((user: any) => {
        this.previewService.user = user;
      });
  }
  openDialog(item: any) {
    this.previewService.item = item;
    const dialogRef = this.dialog.open(PreviewComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
