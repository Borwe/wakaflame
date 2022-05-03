import { HttpClient, HttpClientModule } from '@angular/common/http';
import { inject } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { count, Observable } from 'rxjs';
import { AppModule } from '../app.module';
import { WakaEditors } from './models/waka-api';

import { WakaApiService } from './waka-api.service';

describe('WakaApiService', () => {
  let service: WakaApiService;

  beforeEach(()=>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000000;
    TestBed.configureTestingModule({
      imports: [BrowserModule,HttpClientModule],
      providers: [WakaApiService]
    });
    service = TestBed.inject(WakaApiService);
  })

  it('Test getting available editor info', waitForAsync(()=>{
    let editors_observable: Observable<WakaEditors> = service.getEditors()
    editors_observable.pipe(count()).subscribe(result => {
      console.log("Result: ",result);
      expect(result>0).toBeTrue();
    });
  }))
});
