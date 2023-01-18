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

  userColumnsToDisplay = ["position","name","users"];
  timeColumnsToDisplay = ["position","name","time"];

  @ViewChild('users_paginator') user_paginator!: MatPaginator;
  @ViewChild('users_table') users_table!: MatTable<LanguageCount>;
  @ViewChild('times_paginator') time_paginator!: MatPaginator;
  @ViewChild('times_table') times_table!: MatTable<LanguageCount>;

  constructor(public observer_holder: ObserverHolderService){
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.observer_holder.langs_mat_tables.
      setUI(this.users_table, this.user_paginator, this.times_table
        ,this.time_paginator);
    this.observer_holder.langs_mat_tables.redrawTables();
  }

  ngOnDestroy(){
    this.observer_holder.langs_mat_tables.unSet();
  }
}
