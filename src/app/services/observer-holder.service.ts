import { Injectable } from '@angular/core';
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

  languages = new Array<LanguageCount>();
  lang_with_most_users_order = new Array<LanguageCount>();
  lang_with_most_time_order = new Array<LanguageCount>();

  constructor() { }

  setLeaderObservable(leaders_observable: Connectable<LeaderJson>){
    this.leaders_observable=leaders_observable;
  }

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

  getLeadersObservable(): Connectable<LeaderJson>{
    return this.leaders_observable;
  }

  getSearchObservable(): Observable<string>{
    return this.search_observable;
  }
}
