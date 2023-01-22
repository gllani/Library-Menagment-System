import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "../services/firebase.service";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.scss"],
})
export class HomepageComponent implements OnInit {
  booksToDisplay1: any[] = [];
  booksToDisplay2: any[] = [];
  constructor(private firebase: FirebaseService) {}

  ngOnInit(): void {
    this.firebase.getData().subscribe((data: any) => {
      this.booksToDisplay1.push(data[0], data[1], data[2], data[3]);
      this.booksToDisplay2.push(data[4], data[5], data[6], data[7]);
    });
  }
  openIt() {
    window.open("localhost:4200/search-modal");
  }
  openGmail() {
    window.open(
      "https://accounts.google.com/v3/signin/identifier?dsh=S-1291780961%3A1671800748218277&continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&ifkv=AeAAQh686pSnyPYbfpchbK6V9W-cyqQZ5BOjgeMKri2pEDtm80K6v0Mknbl8L2o5DhXldkerVH48"
    );
  }
}
