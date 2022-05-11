import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Language, LeaderJson } from '../services/models/waka-api';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.css']
})
export class UserDisplayComponent implements OnInit {

  @Input() leader?: LeaderJson =  undefined;
  @Input() index: number = 0;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  showLanguages(){
    this.dialog.open(UserDisplayDialogComponent,{
      width: "300px",
      data: this.leader
    });
  }
}


class Lang{
  name: string;
  percentage: number;

  constructor(name_lang: string){
    this.name = name_lang;
    this.percentage = 0;
  }
}

@Component({
  selector: 'app-user-display-language-dialog',
  templateUrl: './user-display-language-dialog.html',
  styleUrls: ['./user-display.component.css']
})
export class UserDisplayDialogComponent implements OnInit {
  total_sum_of_seconds: number = 0;
  langs: Array<Lang> = new Array();


  constructor(public dialogRef: MatDialogRef<UserDisplayDialogComponent>,
	      @Inject(MAT_DIALOG_DATA) public data: LeaderJson) {

    if(data!=undefined){
      data.running_total.languages.forEach((lang)=>{
	this.total_sum_of_seconds+=lang.total_seconds;
      });
      data.running_total.languages.forEach((lang_passed)=>{
	let lang = new Lang(lang_passed.name);
	lang.percentage = (lang_passed.total_seconds/this.total_sum_of_seconds)*100;
	this.langs.push(lang);
      })
    }
  }

  ngOnInit(): void {
  }
}
