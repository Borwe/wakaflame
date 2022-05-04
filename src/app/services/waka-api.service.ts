import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, from, map, mergeMap, Observable, range } from 'rxjs';
import { LeaderJson, LeaderUser, WakaEditors, WakaReplyJson } from './models/waka-api';

const MAIN_URL: string = "https://wakaflame-server.herokuapp.com/api/v1/";

class HttpOptions{
  headers:HttpHeaders;
  params: HttpParams | undefined;
  reportProgress: boolean = false
  withCredentials: boolean = false

  constructor(){
    this.headers = new HttpHeaders();
    this.headers.append("Access-Control-Allow-Origin","*");
  }
}

class Client {

  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  get<T>(url:string, options: HttpOptions | undefined): Observable<T>{
    if(options != undefined){
      return this.httpClient.get<T>(url,{
        headers: options.headers,
        params: options.params,
        observe: 'body',
        reportProgress: options.reportProgress,
        responseType: 'json', withCredentials: options.withCredentials
      });
    }else{
      let options = new HttpOptions();
      return this.httpClient.get<T>(url,{
        headers: options.headers,
        params: options.params,
        observe: 'body',
        reportProgress: options.reportProgress,
        responseType: 'json',
        withCredentials: options.withCredentials
      });
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class WakaApiService {

  client: Client;

  constructor(private http:HttpClient) {
    this.client = new Client(http);
  }

  getEditors(): Observable<WakaEditors>{
    let editors_url = MAIN_URL+"editors";
    return this.client.get<WakaReplyJson>(editors_url,undefined)
      .pipe(map(json_result => json_result.data))
      .pipe(mergeMap(editors_array => from(editors_array)))
      .pipe(map(obj => {
	return <WakaEditors>obj 
      }));
  }

  getKenyanLeaders(): Observable<LeaderJson>{
    let leaders_url = MAIN_URL+"leaders";
    return this.client.get<WakaReplyJson>(leaders_url,undefined)
      .pipe(mergeMap(json_result=> {
        let pages = json_result.total_pages;
        return range(1,pages);
      }))
      .pipe(mergeMap(page=> {
        let page_url=MAIN_URL+"leaders?page="+page;
        return this.client.get<WakaReplyJson>(page_url,undefined);
      }))
      .pipe(map(json_result=> json_result.data))
      .pipe(mergeMap(leaderjson_array => from(leaderjson_array)))
      .pipe(map(obj=> <LeaderJson>obj))
      .pipe(filter(leader=>{
        if(leader.user.city==undefined){
          return false;
        }else if(leader.user.city.country_code == "KE"){
          return true;
        }else{
          return false;
        }
      }));
  }
}
