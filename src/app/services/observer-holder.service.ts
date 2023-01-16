import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, Connectable } from 'rxjs';
import { Language, LanguageCount, LeaderJson, WakaEditors } from './models/waka-api';

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

  lang_with_most_users_mat = new MatTableDataSource<LanguageCount>();
  users_table?: MatTable<LanguageCount>;
  users_paginator?: MatPaginator;
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
