import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders}from '@angular/common/http'
import { Observable } from 'rxjs';
import {Features } from '../model/features';

@Injectable({
  providedIn: 'root'
})
export class FeaturesServiceService {

  constructor(private _http: HttpClient) { }

  public addFeatures(features:Features) : Observable<any>{
    return  this._http.post<any>("http://localhost:7070/addFeature",features);
  }

  public deleteFeatureByID(id:number): Observable<any>{
    const url = `http://localhost:7070/deleteFeatureById/${id}`;
    return this._http.delete<any>(url);
  }

  public getAllFeatures():Observable<any>
  {           
    const url = `http://localhost:7070/getAllFeatures`;
     return this._http.get<any>(url);
  }
}
