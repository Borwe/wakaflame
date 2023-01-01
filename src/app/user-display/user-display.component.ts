import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Language, LeaderJson } from '../services/models/waka-api';


const WIDTH_OF_DIAG=300;
const WIDTH_OF_DIAG_STR = "300px";


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
      width: WIDTH_OF_DIAG_STR,
      data: this.leader
    });
  }
}


class Lang{
  name: string;
  percentage: number;
  period: number;

  constructor(lang: Language, total_sum_of_seconds: number){
    this.name = lang.name;
    this.percentage = lang.total_seconds/total_sum_of_seconds*WIDTH_OF_DIAG;
    this.period = lang.total_seconds;
  }
  
  transformToHumanReadable(){
    const hours = Math.trunc(this.period/(60*60));
    const minutes = Math.trunc((this.period - (hours*60*60))/60);
    const seconds = Math.trunc(this.period - ((hours*60*60)+(minutes*60)));
    const result = "Coded for: "+hours+" hrs "+minutes+" mins "+seconds+"s";
    return result; 
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
      data.running_total.languages.forEach((lang_passed)=>{
        this.total_sum_of_seconds+=lang_passed.total_seconds;
      });
      data.running_total.languages.forEach((lang_passed)=>{
        this.langs.push(new Lang(lang_passed, this.total_sum_of_seconds));
      });
    }
  }

  ngOnInit(): void {
  }
}
