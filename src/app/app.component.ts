import { Component, OnInit } from '@angular/core';
import { fromEvent, map, Observable, share } from 'rxjs';
import { LeaderJson, WakaEditors } from './services/models/waka-api';
import { ObserverHolderService } from './services/observer-holder.service';
import { WakaApiService } from './services/waka-api.service';

export const MIN_WIDTH = 520;//minimum width before we push items into side menu

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  width_is_less_than_minimum = true;

  constructor(private observer_holder: ObserverHolderService,
    private wakaApi: WakaApiService){
    observer_holder.
      setLeaderObservable(this.wakaApi.getKenyanLeaders().pipe(share()));
    observer_holder.
      setEditorsObservable(this.wakaApi.getEditors().pipe(share()));
    observer_holder.setWindowWidthResizeObservable(fromEvent(window,
      "resize").pipe(map(event=> window.innerWidth)));
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
      this.width_is_less_than_minimum=true;
      let expanded_3_menu = document.getElementById("expanded_3_menu");
      if(expanded_3_menu!=undefined){
        expanded_3_menu.style.display="none";
        expanded_3_menu.style.visibility="hidden";
      }
    }else{
      this.width_is_less_than_minimum=false;
      let expanded_3_menu = document.getElementById("expanded_3_menu");
      if(expanded_3_menu!=undefined){
        expanded_3_menu.style.display="block";
        expanded_3_menu.style.visibility="visible";
      }
    }
  }

}
