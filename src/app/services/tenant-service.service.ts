import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tenant } from '../model/tenant';
import {HttpClient, HttpHeaders}from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TenantServiceService {

  constructor(private _http: HttpClient) { }

  public tenantRegisterfromRemote(tenant : Tenant):Observable<any>
  {
  return  this._http.post<any>("http://localhost:7070/registerTenant",tenant);
  }

  public tenantLoginfromRemote(tenant : Tenant):Observable<any>
  {
  return  this._http.post<any>("http://localhost:7070/loginTenant",tenant);
  }

  public tenantForgotPassword(tenant : Tenant):Observable<any>
  {
  return  this._http.post<any>("http://localhost:7070/PassFogTenant",tenant);
  }

   public tenantUpdateProfile(tenant : Tenant):Observable<any>
  {
           
  return  this._http.post<any>("http://localhost:7070/updateTenantDetails",tenant);
  }

  public getTenantProfile(temail: string):Observable<any>
  {           
    const url = `http://localhost:7070/getTenantByemail/${temail}`;
     return this._http.get<any>(url);
  }

  tenantChangePassword(temail: string, newPassword: string): Observable<any> {
    const url = `http://localhost:7070/changeTenantPassword/${temail}`;
    return this._http.post<any>(url, newPassword);
  }

  getTenants()
  {
     // Retrieve the JWT token from localStorage
     const token = localStorage.getItem('token');
     const usertype = localStorage.getItem('usertype');
 
     // Set the Authorization header with the JWT token
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
     console.log(headers.toString());
   
     if (usertype=="admin") {
      return this._http.get<Tenant[]>('http://localhost:7070/admin/listTenants',{ headers });
     } 
     alert ("Please Login First !!!");
     return this._http.get<Tenant[]>('http://localhost:7070/admin/demolist',{ headers }); 
     
  }

  public deleteTenantByEmail(temail: string):Observable<any>
  {           
    const url = `http://localhost:7070/deleteTenantByEmail/${temail}`;
     return this._http.delete<any>(url);
  }
  
  public searchTenants(tenant : Tenant):Observable<any>
  {
  return  this._http.post<any>("http://localhost:7070/searchTenants",tenant);
  }

}
