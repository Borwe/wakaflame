import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, map, mergeMap, Observable } from 'rxjs';
import { WakaEditors, WakaReplyJson } from './models/waka-api';

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
        responseType: 'json',
        withCredentials: options.withCredentials
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
}
