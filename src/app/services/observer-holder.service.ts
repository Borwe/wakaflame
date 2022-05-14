import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeaderJson, WakaEditors } from './models/waka-api';

/**
 * Service used for passing obseravables around between
 * components, like a singleton kind of interface
 */
@Injectable({
  providedIn: 'root'
})
export class ObserverHolderService {

  leaders_observable = new Observable<LeaderJson>();
  editors_observable = new Observable<WakaEditors>();

  constructor() { }

  setLeaderObservable(leaders_observable: Observable<LeaderJson>){
    this.leaders_observable=leaders_observable;
  }

  setEditorsObservable(editors_observable: Observable<WakaEditors> ){
    this.editors_observable = editors_observable;
  }

  getEditorsObservable(): Observable<WakaEditors>{
    return this.editors_observable;
  }

  getLeadersObservable(): Observable<LeaderJson>{
    return this.leaders_observable;
  }
}
