import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { LanguageCount } from '../services/models/waka-api';
import { ObserverHolderService } from '../services/observer-holder.service';

@Component({
  selector: 'app-languages-display',
  templateUrl: './languages-display.component.html',
  styleUrls: ['./languages-display.component.css']
})
export class LanguagesDisplayComponent implements OnInit {

  columnsToDisplay = ["position","name","users"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('users_table') users_table!: MatTable<LanguageCount>;

  constructor(public observer_holder: ObserverHolderService){
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.observer_holder.lang_with_most_users_mat.paginator = this.paginator;
    this.observer_holder.users_table = this.users_table;
    this.users_table.renderRows();
    console.log("TABLES BABY!!!!");
  }

  ngOnDestroy(){
    this.observer_holder.users_table = undefined;
    this.observer_holder.users_paginator = undefined;
    console.log("LANGS DESTROYED");
  }
}
