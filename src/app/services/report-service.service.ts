import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}from '@angular/common/http'
import { Observable } from 'rxjs';
import { Report } from '../model/report';
import { NewReport } from 'src/app/model/new-report';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  constructor( private _http: HttpClient) { }

  public addReport(report:Report) : Observable<any>{
    return  this._http.post<any>("http://localhost:7070/addReport",report);
  }

  public getReportsByAgainstEmail(againstEmail: string):Observable<any>
  {           
    const url = `http://localhost:7070/getAllReportsByAgainstEmail/${againstEmail}`;
     return this._http.get<any>(url);
  }

  public deleteReportById(rid:number): Observable<any>{
    const url = `http://localhost:7070/deleteReportById/${rid}`;
    return this._http.delete<any>(url);
  }

  public deleteAllReport(email:any): Observable<any>{
    const url = `http://localhost:7070/deleteReportsByAgainstEmail/${email}`;
    return this._http.delete<any>(url);
  }

  public getAllReports():Observable<any>
  {           
    const url = `http://localhost:7070/getAllReports`;
     return this._http.get<any>(url);
  }

  public searchReports(report : NewReport):Observable<any>
  {
  return  this._http.post<any>("http://localhost:7070/searchReports",report);
  }

  public checkUserByEmail(Email: string):Observable<any>
  {           
    const url = `http://localhost:7070/checkUserByEmail/${Email}`;
     return this._http.get<any>(url);
  }
  
}
