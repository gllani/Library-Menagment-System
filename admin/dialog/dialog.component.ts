import { Component, Inject, OnInit } from '@angular/core';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface DialogData {
  students: 'x' | 'y' ;
}
@Inject(MAT_DIALOG_DATA) 
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public data!: DialogData;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
  
  }

}
