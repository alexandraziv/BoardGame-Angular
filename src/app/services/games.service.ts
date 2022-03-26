import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game } from 'src/app//model/game'
import { GameList } from '../model/gameList';

const baseUrl: string = "http://localhost:3000/api";
const URL_CATEGORIES: string = "http://localhost:3000/api/categories";

@Injectable({
  providedIn: 'root'
})
export class GamesService {

 

 gamesCount: number = 0;

  //importovali smo HttpClient i injektovali ga u konstruktor/servis za dalje koriscenje this.http
  constructor(private http: HttpClient) { }

  //ova metoda odmah nam salje sa servera i count i result gde mi dobijamo count i results niz!
 getAllGames(params?: any): Observable<GameList> {
    let queryParams: any = {};
   if (params) {
     queryParams = {
       params: new HttpParams()
         .set("pageSize", params.pageSize && params.pageSize.toString() || "")
         .set("page", params.page && params.page.toString() || "")
         .set("filter", params.filter && JSON.stringify(params.filter) || "")
     }
   }
   return this.http.get(`${baseUrl}/games`, queryParams).pipe(map(
    data => { return new GameList(data) }
  ));
 }
  
  
/* getGame(params?: any): Observable<Game[]> {
  let queryParams: any = {};
 if (params) {
   queryParams = {
     params: new HttpParams()
       .set("pageSize", params.pageSize && params.pageSize.toString() || "")
       .set("page", params.page && params.page.toString() || "")
       .set("filter", params.filter && JSON.stringify(params.filter) || "")
   }
 }
   
 return this.http.get(`${baseUrl}/games`, queryParams).pipe(map(
  ( elem :any ) => {
     this.gamesCount = elem.count;
     return elem.games && elem.games.map((elem2: any) => new Game(elem2)) || [];
   }));
  };*/


  //Na serveru je niz stringova koji nam trebaju za select.
	getCategories(): Observable<string[]> {
    return this.http.get(URL_CATEGORIES).pipe(map(response => {
      console.log(response);
        return response as string[];
      }));
  }	

  //dobavljanje niza vakcina koji su ugnjezdeni sa url-a /vaccines. koje imaju count i niz za select
 getGame(): Observable<Game[]> {
    return this.http.get(`${baseUrl}/games`).pipe(map((elem: any) => {
      console.log(elem)
      return elem.games && elem.games.map((elem2: any) => new Game(elem2)) || [];
    }));
  }
  
  //jedna igrica sa id ZA IZMENU ILI DODAVANJE U FORMI!
  getOneGame(id: number): Observable<Game> {
    return this.http.get(`${baseUrl}/games/${id}`).pipe(map(  
      (jsonResponse: any) =>  { return new Game(jsonResponse); }
    ));
  }

  

  add(newVaccination: Game): Observable<Game> {
    return this.http.post(`${baseUrl}/games`, newVaccination)
      .pipe(map((jsonResponse: any) => new Game(jsonResponse)));
  }

  update(update: Game): Observable<Game> {
    return this.http.put(baseUrl + "/games/" + update._id, update)
      .pipe(map((jsonResponse: any) => new Game(jsonResponse)));
  }

  remove(id: number): Observable<Game> {
    return this.http.delete(`${baseUrl}/games/${id}`)
      .pipe(map((jsonResponse: any) => new Game(jsonResponse)));

  }






}
