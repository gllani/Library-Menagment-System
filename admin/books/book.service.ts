import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  editableData = {
    BookName: '',
    Name: ''

  };
  upgrateData: any;

  deleteItem: any;
  constructor() { }
}
