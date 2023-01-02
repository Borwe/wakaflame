import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { LeaderJson } from '../services/models/waka-api';
import { ObserverHolderService } from '../services/observer-holder.service';

@Component({
  selector: 'app-user-ranks',
  templateUrl: './user-ranks.component.html',
  styleUrls: ['./user-ranks.component.css']
})
export class UserRanksComponent implements OnInit {


  // To hold ordered list of users
  leaders: Array<LeaderJson> = new Array();

  // To hold filtered elements based on search
  searched_leaders: Array<LeaderJson> = new Array();

  // To hold the searched string
  search: string= '';

  constructor(private observer_holder: ObserverHolderService) { }

  ngOnInit(): void {
    this.observer_holder.getLeadersObservable().pipe(map(leader=>{
      this.addAndReloadLeadersArray(leader);
      this.filterLeadersArrayBySearch(this.search);
      return leader;
    })).subscribe();

    this.observer_holder.getSearchObservable().pipe(map(search=>{
      this.search = search;
      this.filterLeadersArrayBySearch(search);
      return search;
    })).subscribe();
  }

  addAndReloadLeadersArray(leader: LeaderJson){
    this.leaders.push(leader);
    this.leaders.sort((l1,l2)=>{
      if(l1.rank>l2.rank){
        return 1;
      }else if(l1.rank < l2.rank){
        return -1;
      }
      return 0;
    });
    this.searched_leaders = this.leaders;
  }

  filterLeadersArrayBySearch(search: string){
    if(search.length == 0){
      this.searched_leaders = this.leaders;
      return;
    }
    this.searched_leaders = this.leaders.filter(leader=>{
      if(leader.user.display_name!= undefined &&
	leader.user.display_name.includes(search )){
	return true;
      }
      if(leader.user.username!=undefined && leader.user.username.includes(search)){
	return true;
      }
      if(leader.user.full_name!= undefined && leader.user.full_name.includes(search)){
	return true;
      }
      return false;
    });
  }
}
