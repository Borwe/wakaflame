import { Component, OnInit } from '@angular/core';
import { Observable, share } from 'rxjs';
import { LeaderJson, WakaEditors } from './services/models/waka-api';
import { WakaApiService } from './services/waka-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  leaders_observable: Observable<LeaderJson>;
  editors_observable: Observable<WakaEditors>;

  constructor(private wakaApi: WakaApiService){
    this.leaders_observable = this.wakaApi.getKenyanLeaders().pipe(share());
    this.editors_observable = this.wakaApi.getEditors().pipe(share());
  }

  ngOnInit(): void {
  }

}
