import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private http: HttpClient ) { }

  urlBase: string = 'http://127.0.0.1:8000/api/';

  get(url: string) {
    return this.http.get(url)
      .pipe(
        map( resp =>{
          return resp;
        })
      );
  }

  post(url: string, datos: object){
    return this.http.post(url, datos)
      .pipe(
        map( resp =>{
          return resp;
        })
      );
  }

  put(url: string, datos: object){
    return this.http.put(url, datos)
      .pipe(
        map( resp =>{
          return resp;
        })
      );
  }
}
