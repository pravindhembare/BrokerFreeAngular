import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}from '@angular/common/http'
import { Observable } from 'rxjs';
import { Messages } from '../model/messages';

@Injectable({
  providedIn: 'root'
})
export class MessagesServiceService {

  constructor( private _http: HttpClient) { }

  public addMessage(messages:Messages) : Observable<any>{
    return  this._http.post<any>("http://localhost:7070/addMessage",messages);
  }

  public deleteMessageById(id:Number) : Observable<any>{    
    const url =(`http://localhost:7070/deleteMessageById/${id}`);
    return  this._http.delete<any>(url);
  }

  public getAllMessageBySenderAndRecieverEmail(sender: any,reciever:string): Observable<any> {
    const url = `http://localhost:7070/getAllMessageBySenderAndRecieverEmail/${sender}/${reciever}`;
    return this._http.get<any>(url);
  }

  public getEmailsBySenderOrReceiver(email: string): Observable<any> {
    const url = `http://localhost:7070/getEmailsBySenderOrReceiver/${email}`;
    return this._http.get<any>(url);
  }

  public getAllEmails(): Observable<any> {
    const url = `http://localhost:7070/getAllEmails`;
    return this._http.get<any>(url);
  }

  public getAllMessangers(): Observable<any> {
    const url = `http://localhost:7070/getUniqueMessagengers`;
    return this._http.get<any>(url);
  }

}
