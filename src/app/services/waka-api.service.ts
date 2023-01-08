import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Connectable, filter, from, map, mergeMap, Observable, range, retry, toArray } from 'rxjs';
import { EditorCount, Language, LanguageCount, LeaderJson, LeaderUser, WakaEditors, WakaReplyJson, WakaStatsReplyJson, WakaUserStatusEditor } from './models/waka-api';

const MAIN_URL: string = "https://wakaflames.fly.dev/api/v1/";

class HttpOptions{
  headers:HttpHeaders;
  params: HttpParams | undefined;
  reportProgress: boolean = false
  withCredentials: boolean = false

  constructor(){
    this.headers = new HttpHeaders();
  }
}

class Client {

  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  get<T>(url:string, options: HttpOptions | undefined): Observable<T>{
    return this.httpClient.get<T>(url,{
      headers: options?.headers,
      params: options?.params,
      observe: 'body',
      reportProgress: options?.reportProgress,
      responseType: 'json',
      withCredentials: options?.withCredentials
    }).pipe(retry(10));
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

  getEditorsUseInKenya(leaders: Observable<LeaderJson>):Observable<EditorCount>{
    return leaders.pipe(map(leader=> leader.user.username))
    .pipe(mergeMap(name=>{
      let user_stats_url = MAIN_URL+"users/"+name+"/stats";
      console.log("Making url request: ",user_stats_url);
      return this.client.get<WakaStatsReplyJson>(user_stats_url,undefined);
    })).pipe(mergeMap(obj=> from(obj.data.editors)))
    .pipe(map(obj=> <WakaUserStatusEditor>obj))
    .pipe(toArray())
    .pipe(map(editors_array=>{
      let editor_counts = new Array<EditorCount>();

      for(let i = 0; i<editors_array.length;i++){
        let editor: string = editors_array[i].name;
        let editor_count  = new EditorCount(editor);

        //reset editor_count if it already exists to that one
        for(let j=0; j<editor_counts.length; j++){
          if(editor_counts[j]!=undefined && editor_counts[j].name == editor){
            editor_count.name = editor_counts[j].name;
            editor_count.users = editor_counts[j].users;
            delete editor_counts[j];
            break;
          }
        }

        if(editor_count.users>0){
          continue;
        }

        for(let j=0;j<editors_array.length;j++){
          if(editor==editors_array[j].name){
            editor_count.users+=1;
          }
        }

        editor_counts.push(editor_count);
      }
      console.log(editor_counts);
      return editor_counts;
    })).pipe(mergeMap(editors_array=> from(editors_array)))
    .pipe(filter(editor=>{
      if(editor==undefined){
        return false;
      }
      return true;
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
