import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.scss"],
})
export class StudentComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.fragment.subscribe((value) => {
      this.jumpTo(value);
    });
  }
  jumpTo(section: any) {
    document.getElementById(section)
      ?.scrollIntoView({ behavior: "smooth" });
  }
}
