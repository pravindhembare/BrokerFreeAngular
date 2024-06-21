import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders}from '@angular/common/http'
import { Observable } from 'rxjs';
import {Contact } from '../model/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  constructor(private _http: HttpClient) { }

  public addContact(contact:Contact) : Observable<any>{
    return  this._http.post<any>("http://localhost:7070/addContact",contact);
  }

  public deleteContactById(id:number): Observable<any>{
    const url = `http://localhost:7070/deleteContactById/${id}`;
    return this._http.delete<any>(url);
  }

  public getAllContacts():Observable<any>
  {           
    const url = `http://localhost:7070/getAllContacts`;
     return this._http.get<any>(url);
  }
}
