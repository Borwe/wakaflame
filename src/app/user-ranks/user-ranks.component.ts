import { Component, Input, OnInit } from '@angular/core';
import {count ,map, Observable, toArray } from 'rxjs';
import { LeaderJson } from '../services/models/waka-api';

@Component({
  selector: 'app-user-ranks',
  templateUrl: './user-ranks.component.html',
  styleUrls: ['./user-ranks.component.css']
})
export class UserRanksComponent implements OnInit {

  @Input() leaders_observable: Observable<LeaderJson> = new Observable();
  loaded: boolean = false;// turn true once gotten users list in order

  // To hold ordered list of users
  leaders: Array<LeaderJson> = new Array();

  constructor() { }

  addAndReloadLeadersArray(leader: LeaderJson){
    this.leaders.push(leader);
    this.leaders.sort((l1,l2)=>{
      if(l1.rank>l2.rank){
        return 1;
      }else if(l1.rank < l2.rank){
        return -1;
      }
      return 0;
    })
  }

  ngOnInit(): void {
    this.leaders_observable.pipe(map(leader=>{
      this.addAndReloadLeadersArray(leader);
      this.loaded = true;
      return leader;
    })).pipe(count())
    .subscribe(size=>{
      console.log("Done getting leaders");
    })
  }

}
