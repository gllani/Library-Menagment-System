import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { map, Observable, startWith } from "rxjs";
import { GoogleAPIService } from "./google-api.service";
@Component({
  selector: "app-search-modal",
  templateUrl: "./search-modal.component.html",
  styleUrls: ["./search-modal.component.scss"],
})
export class SearchModalComponent implements OnInit {
  form!: FormGroup;
  data: any = [];
  myControl = new FormControl<string | any>("");
  options: any[] = [];
  filteredOptions!: Observable<any[]>;
  displayData: any = [];
  allData: any = [];
  constructor(private googleAPI: GoogleAPIService) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      search: new FormControl(""),
    });
    this.googleAPI.getBooks().subscribe((data: any) => {});
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => {
        const name = typeof value === "string" ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
  }
  displayFn(user: any): string {
    return user && user.name ? user.name : "";
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  filter() {
    this.allData = [];
    this.googleAPI.searchBook(this.form.value.search).subscribe((data: any) => {
      this.allData = data.items;
    });
  }
  searchArray(filter: any, data: any): any {
    const result: any[] = [];
    data.forEach((element: { name: string; email: string }) => {
      if (
        element.name.toLowerCase().includes(filter.toLowerCase()) ||
        element.email.toLowerCase().includes(filter.toLowerCase())
      ) {
        result.push(element);
      }
    });
    return result;
  }
  getData(data: any) {
    this.allData = data;
    this.data = data;
  }
  display(option: any) {
    this.displayData = [];
    this.displayData.push(option);
  }
}
