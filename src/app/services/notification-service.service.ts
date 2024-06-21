import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}from '@angular/common/http'
import { Observable } from 'rxjs';
import {Notifications } from '../model/notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  constructor(private _http: HttpClient) { }

  public addNotifications(notification:Notifications) : Observable<any>{
    return  this._http.post<any>("http://localhost:7070/addNotification",notification);
  }

  public getNotificationByToEmail(toEmail: string):Observable<any>
  {           
    const url = `http://localhost:7070/getNotificationByToEmail/${toEmail}`;
     return this._http.get<any>(url);
  }

  public deleteNotificationByEmail(email:string): Observable<any>{
    const url = `http://localhost:7070/deleteNotificationByEmail/${email}`;
    return this._http.delete<any>(url);
  }

  public deleteNotificationById(id:number): Observable<any>{
    const url = `http://localhost:7070/deleteNotificationById/${id}`;
    return this._http.delete<any>(url);
  }

  public getAllNotifications():Observable<any>
  {           
    const url = `http://localhost:7070/getAllNotifications`;
     return this._http.get<any>(url);
  }

  public searchNotifications(notification : Notifications):Observable<any>
  {
  return  this._http.post<any>("http://localhost:7070/searchNotifications",notification);
  }

  
}
