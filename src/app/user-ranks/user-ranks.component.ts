import { Component, OnInit } from '@angular/core';
import { map, toArray } from 'rxjs';
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

  constructor(public observer_holder: ObserverHolderService) { }

  ngOnInit(): void {

    this.observer_holder.getSearchObservable().subscribe((search)=>{
      search= search.toLowerCase();
      console.log("SEARCH....",search);
      let leader_list = document.getElementsByClassName('leader_list')[0];
      let lists = leader_list.children;
      for(let i=0; i<lists.length; i++){
        let el = lists.item(i);
        if(el?.id!=undefined && el?.id.toLowerCase() == search){
          el.scrollIntoView();
        }
      }
    });
  }
}
