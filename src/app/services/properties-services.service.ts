import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Properties } from '../model/properties';

@Injectable({
  providedIn: 'root'
})
export class PropertiesServicesService {

  constructor( private _http: HttpClient) {
  }

  public propertyPost(property : Properties):Observable<any>
  {           
  return  this._http.post<any>("http://localhost:7070/addProperties",property);
  }

  public propertyUpdate(id: any, property: Properties): Observable<any>
   {       
    return this._http.put<any>(`http://localhost:7070/updatePropertyById/${id}`,property);
   }

   public searchProperties(property: Properties): Observable<any>
   {       
    return this._http.post<any>("http://localhost:7070/searchProperties",property);
   }

  public getPropertiesByOwnerEmail(email: string): Observable<any> {
    const url = `http://localhost:7070/getPropertiesByOwnerEmail/${email}`;
    return this._http.get<any>(url);
  }

  public getPropertiesByPropertyId(id: any): Observable<any> {
    const url = `http://localhost:7070/findProperties/${id}`;
    return this._http.get<any>(url);
  }

  public getOwnerByPropertyId(id: any): Observable<any> {
    const url = `http://localhost:7070/getOwnerByProperties/${id}`;
    return this._http.get<any>(url);
  }

  
  public deletePropertiesByPropertyId(id: any): Observable<any> {
    const url = `http://localhost:7070/deleteProperties/${id}`;
    return this._http.delete<any>(url);
  }

  public addToCart(email:any,id: any): Observable<any> {
    const url = `http://localhost:7070/addToCart/${email}/${id}`;
    return this._http.get<any>(url);
  }
  
  public getPropertiesByTenantEmail(email: string): Observable<any> {
    const url = `http://localhost:7070/getPropertiesByTenantEmail/${email}`;
    return this._http.get<any>(url);
  }

  public removeFromCart(email:any,id: any): Observable<any> {
    const url = `http://localhost:7070/removeFromCart/${email}/${id}`;
    return this._http.delete<any>(url);
  }

  public getTenantByPropertyId(id: number): Observable<any> {
    const url = `http://localhost:7070/getTenantByPropertyId/${id}`;
    return this._http.get<any>(url);
  }
  
  public getAllProperties(): Observable<any> {
    const url = `http://localhost:7070/getAllProperties`;
    return this._http.get<any>(url);
  }
}