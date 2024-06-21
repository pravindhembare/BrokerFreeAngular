import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}from '@angular/common/http'
import { Observable } from 'rxjs';
import { Review } from '../model/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewServiceService {
  constructor( private _http: HttpClient) { }

  public addReview(review:Review): Observable<any>{
    return  this._http.post<any>("http://localhost:7070/addReviewDetails",review);
  }
  

  public getReviewsByPropertyId (pid:number): Observable<any> {                
    const url = `http://localhost:7070/getAllReviewsById/${pid}`;
     return this._http.get<any>(url);
  }

  public deleteReviewById(rid:number): Observable<any>{
    const url = `http://localhost:7070/deleteReviewDetails/${rid}`;
    return this._http.delete<any>(url);
  }

  public deleteReviewsByPropertyid(rid:number): Observable<any>{
    const url = `http://localhost:7070/deleteReviewsByPropertyid/${rid}`;
    return this._http.delete<any>(url);
  }
}
