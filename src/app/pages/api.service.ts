import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Data} from './data';
import { BehaviorSubject,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private mediaType$ = new BehaviorSubject<string>("tv");
  private searchParameters$ = new BehaviorSubject<String>("");

  passedMedia$ = this.mediaType$.asObservable();
  passedParameters$ = this.searchParameters$.asObservable();
  


  setMediaType(media:string){
    this.mediaType$.next(media);
  }
  setSearchParameters(parameters:string){
    this.searchParameters$.next(parameters);
  }

  topRatedUrl = `https://api.themoviedb.org/3/${this.mediaType$.value}/top_rated?api_key=5e11f4e981c871df863bfd2315c33be9&language=en-US&page=1`;
  

  constructor(private _http:HttpClient) { }

  getData():Observable<Data>{

    this.passedMedia$.subscribe(value => {
    this.topRatedUrl=`https://api.themoviedb.org/3/${value}/top_rated?api_key=5e11f4e981c871df863bfd2315c33be9&language=en-US&page=1`;
  })
    return this._http.get<Data>(this.topRatedUrl);
  }

  searchUrl = '';
  

  searchData():Observable<Data>{
    this.passedMedia$.subscribe(media =>{
      this.passedParameters$.subscribe(parameters => {
      this.searchUrl= `https://api.themoviedb.org/3/search/${media}?api_key=5e11f4e981c871df863bfd2315c33be9&language=en-US&query=${parameters}&page=1&include_adult=false`
    })
  })
    return this._http.get(this.searchUrl);
  }


}
