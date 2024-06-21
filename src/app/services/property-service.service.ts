import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Property } from '../model/property';
import {HttpClient,HttpHeaders}from '@angular/common/http'
let pService = "http://localhost:8080/property/";
@Injectable({
  providedIn: 'root'
})
export class PropertyServiceService {
  
  constructor( private _http: HttpClient){}

  public addPropertyfromRemote(property : Property):Observable<any>
  {
    const token = localStorage.getItem('token');
     const usertype = localStorage.getItem('usertype');
 
     // Set the Authorization header with the JWT token
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
     console.log(headers.toString());
   
     if (usertype=="tenant") {
      return  this._http.post<any>("http://localhost:7070/addProperty",property,{ headers });       
     }
         alert ("Please Login First !!!");
         window.location.href="/"
         return this._http.get<any[]>('http://localhost:7070/admin/demolist',{ headers });       
  }
  public getAllProperty():Observable<any>
  {
    

     // Retrieve the JWT token from localStorage
     const token = localStorage.getItem('token');
     const usertype = localStorage.getItem('usertype');
 
     // Set the Authorization header with the JWT token
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
     console.log(headers.toString());
   
     if (usertype=="tenant") {
       return this._http.get<any[]>('http://localhost:7070/viewProperty',{ headers });
     }
         alert ("Please Login First !!!");
         window.location.href="/"
         return this._http.get<any[]>('http://localhost:7070/admin/demolist',{ headers }); 

}

public deleteProperty(pid:number) {
  return this._http.delete("http://localhost:7070/deleteProperty/"+pid);
}

public editProperty(pid: number,property:Property):Observable<any>{
  return this._http.put<any>("http://localhost:7070/updateProperty/"+pid,property);
}
}
