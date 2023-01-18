import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.scss"],
})
export class HomepageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  openIt() {
    window.open("localhost:4200/search-modal");
  }
  openGmail() {
    window.open(
      "https://accounts.google.com/v3/signin/identifier?dsh=S-1291780961%3A1671800748218277&continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&ifkv=AeAAQh686pSnyPYbfpchbK6V9W-cyqQZ5BOjgeMKri2pEDtm80K6v0Mknbl8L2o5DhXldkerVH48"
    );
  }
}
