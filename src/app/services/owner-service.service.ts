import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Owner } from '../model/owner';
import {HttpClient, HttpHeaders}from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class OwnerServiceService {

  constructor( private _http: HttpClient) {

   }

  public ownerRegisterfromRemote(owner : Owner):Observable<any>
  {
           
  return  this._http.post<any>("http://localhost:7070/registerOwner",owner);
  }

  public ownerLoginfromRemote(owner : Owner):Observable<any>
  {
  return  this._http.post<any>("http://localhost:7070/loginOwner",owner);
  }

  public ownerForgotPassword(owner : Owner):Observable<any>
  {
  return  this._http.post<any>("http://localhost:7070/PassFogOwner",owner);
  }

  public ownerUpdateProfile(owner : Owner):Observable<any>
  {
           
  return  this._http.post<any>("http://localhost:7070/updateOwnerDetails",owner);
  }

  ownerChangePassword(oemail: string, newPassword: string): Observable<any> {
    const url = `http://localhost:7070/changeOwnerPassword/${oemail}`;
    return this._http.post<any>(url, newPassword);
  }

  getOwners()
  {
    // Retrieve the JWT token from localStorage
    const token = localStorage.getItem('token');
    const usertype = localStorage.getItem('usertype');

    // Set the Authorization header with the JWT token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(headers.toString());
  
    if (usertype=="admin") {
      return this._http.get<Owner[]>('http://localhost:7070/admin/listOwners',{ headers });
    }
        alert ("Please Login First !!!");
        window.location.href="/"
        return this._http.get<Owner[]>('http://localhost:7070/admin/demolist',{ headers }); 
  } 

  GetOwnerProfile(oemail: string): Observable<any> {
    const url = `http://localhost:7070/GetOwnerProfile/${oemail}`;
    return this._http.get<any>(url);
  }

  deleteOwnerByEmail(oemail: string): Observable<any> {
    const url = `http://localhost:7070/deleteOwnerByEmail/${oemail}`;
    return this._http.delete<any>(url);
  }

  
  public searchOwners(owner : Owner):Observable<any>
  {
  return  this._http.post<any>("http://localhost:7070/searchOwners",owner);
  }
}
