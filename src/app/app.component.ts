import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatSidenav } from '@angular/material/sidenav';
import { connectable, from, fromEvent, map, merge, mergeMap, share } from 'rxjs';
import { LanguageCount } from './services/models/waka-api';
import { ObserverHolderService } from './services/observer-holder.service';
import { WakaApiService } from './services/waka-api.service';

// minimum width before we push items into side menu
// and burger menus
export const MIN_WIDTH = 700;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  width_is_less_than_minimum = true;
  show_loading_bar = true;
  @ViewChild('menu_sidenav') menu_sidenav!: MatSidenav;
  @ViewChild('show_side_nav_button') show_side_nav_button!: MatButton;

  constructor(private observer_holder: ObserverHolderService,
    private wakaApi: WakaApiService){
    let kenyan_leaders = connectable(this.wakaApi.getKenyanLeaders());
    //setup observables
    observer_holder.
      setEditorsObservable(this.wakaApi.getEditors().pipe(share()));
    observer_holder.setWindowWidthResizeObservable(fromEvent(window,
      "resize").pipe(map(_ => window.innerWidth)));


    //set leaders
    let fill_leaders_observable = kenyan_leaders.pipe(map(leader=>{
      this.observer_holder.leaders.push(leader);
      this.observer_holder.leaders.sort((l1,l2)=>{
        if(l1.rank>l2.rank){
          return 1;
        }else if(l1.rank < l2.rank){
          return -1;
        }
        return 0;
      });
    }));
    //set languages
    let languages_filler_observable = kenyan_leaders.pipe(
      map(leaderjson=> leaderjson.running_total.languages),
      mergeMap(langs=> from(langs)),
      map(lang=>{
        let loc = -1;//mark location where language exists, -1 means not found
        for(let i=0; i<this.observer_holder.languages.length; i++){
          let lang_count = this.observer_holder.languages[i];
          if(lang_count.name == lang.name){
            loc = i;
            break;
          }
        }
        
        if(loc==-1){
          //meaning language not found, then add it to array
          this.observer_holder.languages.push(new LanguageCount(lang));
        }else{
          //meaning we found the language
          let lang_count = this.observer_holder.languages[loc];
          lang_count.users+=1;
          lang_count.seconds+=lang.total_seconds;
          this.observer_holder.languages[loc] = lang_count;
        }

        //refresh langs arrays
        this.observer_holder.lang_with_most_users_order = 
          JSON.parse(JSON.stringify(this.observer_holder.languages));
        this.observer_holder.lang_with_most_time_order = 
          [...this.observer_holder.languages].map(i=>i);
        
        //sort by users
        this.observer_holder.lang_with_most_users_order.sort((l1,l2)=>{
          if(l1.users>l2.users){
            return -1;
          }else if(l1.users < l2.users){
            return 1;
          }
          return 0;
        });


        //sort by time
        this.observer_holder.lang_with_most_time_order.sort((l1,l2)=>{
          if(l1.seconds>l2.seconds){
            return -1;
          }else if(l1.seconds < l2.seconds){
            return 1;
          }
          return 0;
        });

        //add indexes
        for(let i = 0;
          i<this.observer_holder.lang_with_most_users_order.length;i++){
          this.observer_holder.lang_with_most_users_order[i].position=i+1;
          this.observer_holder.lang_with_most_time_order[i].position=i+1;
        }
        this.observer_holder.langs_mat_tables.setUsersData(
          this.observer_holder.lang_with_most_users_order,
          this.observer_holder.lang_with_most_time_order);

        //re-render
        this.observer_holder.langs_mat_tables.redrawTables();
        return lang;
      })
    );
    //set loading bar
    let loading_bar_observable = merge(
      fill_leaders_observable, languages_filler_observable);


    //subscribe
    loading_bar_observable.subscribe(null, null,
      ()=>{
        this.show_loading_bar = false;
    });

    //connect the observable
    kenyan_leaders.connect();
  }

  ngOnInit(): void {
    //resize view to be responsive on first load on small screens
    this.handleResizing(window.innerWidth);
  }

  ngAfterViewInit(): void{
    //we do this here, because until this component loads, we have no real
    //access to search_input
    this.observer_holder.search_observable=fromEvent<InputEvent>(
      <HTMLInputElement>document.getElementById("search_input")
      ,"input").pipe(map(event=> (event.target as HTMLInputElement).value));
    this.observer_holder.window_width_resize_observable.subscribe((v)=>{
      this.handleResizing(v);
    });
  }

  handleResizing(width: number): void{
    if(width<MIN_WIDTH){
      let show_nav_button = document.getElementById("show_side_nav_button");
      if(show_nav_button!=undefined){
        show_nav_button.style.display="block";
        show_nav_button.style.visibility="visible";
      }
      this.width_is_less_than_minimum=true;

      let expanded_3_menu = document.getElementById("expanded_3_menu");
      if(expanded_3_menu!=undefined){
        expanded_3_menu.style.display="none";
        expanded_3_menu.style.visibility="hidden";
      }
    }else{
      let show_nav_button = document.getElementById("show_side_nav_button");
      if(show_nav_button!=undefined){
        show_nav_button.style.display="none";
        show_nav_button.style.visibility="hidden";
      }

      this.width_is_less_than_minimum=false;
      let expanded_3_menu = document.getElementById("expanded_3_menu");
      if(expanded_3_menu!=undefined){
        expanded_3_menu.style.display="block";
        expanded_3_menu.style.visibility="visible";
      }
    }
  }

}
