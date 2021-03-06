import { Component, OnInit } from '@angular/core';
import { fromEvent, map, Observable, share } from 'rxjs';
import { LeaderJson, WakaEditors } from './services/models/waka-api';
import { ObserverHolderService } from './services/observer-holder.service';
import { WakaApiService } from './services/waka-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  constructor(private observer_holder: ObserverHolderService,
    private wakaApi: WakaApiService){
    observer_holder.
      setLeaderObservable(this.wakaApi.getKenyanLeaders().pipe(share()));
    observer_holder.
      setEditorsObservable(this.wakaApi.getEditors().pipe(share()));
  }

  ngOnInit(): void {
    this.observer_holder.search_observable=fromEvent<InputEvent>(
      <HTMLInputElement>document.getElementById("search_input")
      ,"input").pipe(map(event=> (event.target as HTMLInputElement).value));
  }
}
