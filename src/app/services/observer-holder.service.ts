import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, Connectable } from 'rxjs';
import { LanguageCount, LeaderJson, WakaEditors } from './models/waka-api';

/**
 * Hold references and info to be used to update the tables in
 * languages-display.components.ts
 */
export class MatTableLangsRef {
  languages_users_mat = new MatTableDataSource<LanguageCount>;
  languages_times_mat = new  MatTableDataSource<LanguageCount>;
  languages_user_table?: MatTable<LanguageCount>;
  languages_users_paginator?: MatPaginator;
  languages_time_table?: MatTable<LanguageCount>;
  languages_times_paginator?: MatPaginator;

  setUsersData(users_langs: Array<LanguageCount>,
    times_langs: Array<LanguageCount>){
    this.languages_users_mat.data = users_langs;
    this.languages_times_mat.data = times_langs;
  }

  setUI(user_table: MatTable<LanguageCount>, 
    users_paginator: MatPaginator, time_table: MatTable<LanguageCount>,
    time_paginator: MatPaginator){
    this.languages_user_table = user_table;
    this.languages_users_paginator = users_paginator;
    this.languages_time_table = time_table;
    this.languages_times_paginator = time_paginator;
  }

  unSet(){
    this.languages_users_paginator = undefined;
    this.languages_user_table = undefined;
    this.languages_times_paginator = undefined;
    this.languages_time_table = undefined;
  }

  redrawTables(){
    if(this.languages_time_table!=undefined){
      this.languages_time_table.renderRows();
    }
    if(this.languages_user_table!=undefined){
      this.languages_user_table.renderRows();
    }
    if(this.languages_users_paginator!=undefined){
      this.languages_users_mat.paginator = this.languages_users_paginator;
    }
    if(this.languages_times_paginator!=undefined){
      this.languages_times_mat.paginator = this.languages_times_paginator;
    }
  }
}

/**
 * Service used for passing obseravables around between
 * components, like a singleton kind of interface
 */
@Injectable({
  providedIn: 'root'
})
export class ObserverHolderService {

  leaders_observable!: Connectable<LeaderJson>;
  editors_observable = new Observable<WakaEditors>();
  search_observable = new Observable<string>();
  window_width_resize_observable = new Observable<number>();

  leaders = new Array<LeaderJson>();

  langs_mat_tables = new MatTableLangsRef();

  languages = new Array<LanguageCount>();
  lang_with_most_users_order = new Array<LanguageCount>();
  lang_with_most_time_order = new Array<LanguageCount>();

  constructor() { }

  setWindowWidthResizeObservable(window_width_resize_observable: Observable<number>){
    this.window_width_resize_observable = window_width_resize_observable;
  }

  setEditorsObservable(editors_observable: Observable<WakaEditors> ){
    this.editors_observable = editors_observable;
  }

  getWindowWidthResizeObservable(): Observable<number>{
    return this.window_width_resize_observable;
  }

  getEditorsObservable(): Observable<WakaEditors>{
    return this.editors_observable;
  }

  getSearchObservable(): Observable<string>{
    return this.search_observable;
  }
}
