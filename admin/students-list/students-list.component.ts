import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss'],
})
export class StudentsListComponent implements OnInit {
  form!: FormGroup;
  allData: any = [];
  data: any = [];

  constructor() {}

  ngOnInit(): void {}
  filter() {
    this.data = this.searchArray(this.form.value.filter, this.data);
    if (this.form.value.filter === '') {
      this.data = this.allData;
    }
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
}
