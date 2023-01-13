import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FirebaseService } from "../services/firebase.service";
import { PreviewService } from "./preview/preview.service";
import { PreviewComponent } from "./preview/preview.component";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-booktable",
  templateUrl: "./booktable.component.html",
  styleUrls: ["./booktable.component.scss"],
})
export class BooktableComponent implements OnInit {
  allData: any = [];
  user: any;
  inactiveClass: any;
  isClicked: boolean = false;
  @Input() admin: boolean = false;
  @Input() bookMenu: boolean = false;
  @Input() student: boolean = false;
  @Input() filterData: any;
  @Input() authorFilter: any;
  @Input() category: any;
  loading: any = new BehaviorSubject(false);
  overdue: any[] = [];

  constructor(
    private firebase: FirebaseService,
    public previewService: PreviewService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loading.next(false);
    this.firebase.getData().subscribe((data: any) => {
      if (this.admin === false) {
        console.log(data);
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
    if (localStorage.getItem("login")) {
      let user = localStorage.getItem("login");
      this.user = JSON.parse(user || "");
    }
    console.log(this.user);
    if (this.user !== undefined) {
      this.firebase
        .getSpecificUser(this.user.customIdName)
        .subscribe((user: any) => {
          this.previewService.user = user;
        });
    }
    this.getOverdue();
    this.loading.next(true);
  }

  ngOnChanges(changes: any) {
    if (changes.filterData) {
      this.searchArray(changes.filterData.currentValue, this.allData);
    }
    if (changes.authorFilter) {
      this.searchArray(changes.authorFilter.currentValue, this.allData);
    }
    if (changes.category) {
      console.log(changes.category);
      if (changes.category.currentValue !== "") {
        this.loading.next(false);
        this.firebase
          .getBookCategory(changes.category.currentValue)
          .subscribe((data: any) => {
            this.allData = data;
            this.loading.next(true);
          });
      } else {
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
      }
    }
  }

  searchArray = (toSearch: string, array: any[]) => {
    if (toSearch === "") {
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
    } else {
      let terms = toSearch.split(" ");
      this.allData = array.filter((object) =>
        terms.every((term) =>
          Object.values(object).some((value: any) =>
            typeof value === "string" || value instanceof String
              ? value.includes(term)
              : false
          )
        )
      );
    }
  };

  openDialog(item: any) {
    if (this.student === true && item.status === "free") {
      this.previewService.item = item;
      const dialogRef = this.dialog.open(PreviewComponent);

      dialogRef.afterClosed().subscribe(() => {});
    } else {
      this.previewService.item = item;
      const dialogRef = this.dialog.open(PreviewComponent);

      dialogRef.afterClosed().subscribe(() => {});
    }
  }

  getFree() {
    this.allData = [];
    this.firebase.getFreeBooks().subscribe((data: any) => {
      if (this.admin === false) {
        this.allData = data;
      } else {
        data.map((book: any) => {
          if (book.status === "free") {
            this.allData.push(book);
          }
        });
      }
    });
  }
  getReserved() {
    this.loading.next(false);
    this.allData = [];
    this.firebase.getReservedBooks().subscribe((data: any) => {
      if (this.admin === false) {
        this.allData = data;
      } else {
        data.map((book: any) => {
          if (book.status === "reserved") {
            this.allData.push(book);
          }
        });
      }
      this.loading.next(true);
    });
  }

  getOverdue() {
    this.loading.next(false);
    this.allData = [];
    let testArray: any = [];
    this.firebase.getPunonjes().subscribe((user: any) => {
      user.map((specificUser: any) => {
        specificUser.books.map((book: any) => {
          var varDate = new Date(this.consvertStartDate(book.endDate));
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (varDate < today) {
            return testArray.push(book);
          }
        });
      });

      testArray.map((overdue: any) => {
        this.firebase
          .getSpecificBooks(overdue.title)
          .subscribe((overdueBook: any) => {
            this.allData.push(overdueBook[0]);
            this.loading.next(true);
          });
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
