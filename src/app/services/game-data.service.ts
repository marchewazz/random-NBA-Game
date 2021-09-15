import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiKey } from './apiKey';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
		"x-rapidapi-key": apiKey
  }),
};

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  
  constructor(private http: HttpClient) { }

  getGame(): Observable<Object>{

    let randomID = Math.floor(Math.random() * 10000 + 1);
    let apiUrl = `https://api-nba-v1.p.rapidapi.com/gameDetails/${randomID}`;
    return this.http.get(apiUrl, httpOptions);
  } 
}
