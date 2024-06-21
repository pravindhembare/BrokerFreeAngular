import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../model/admin';


@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  generateToken(email: string, password: string): Observable<any> {
    const credentials = {
      email: email,
      password: password
    };
    return this.http.post(`http://localhost:7070/auth/login`, credentials, this.httpOptions);
  }

  loginUser(token:any,username:any,usertype:any,uname:any,photo:any){
    localStorage.setItem("token",token)
    localStorage.setItem("username",username)
    localStorage.setItem("usertype",usertype)
    localStorage.setItem("uname",uname)
    localStorage.setItem("photo",photo)
    return true;
  }

  isLoggedIn(){
    let token=localStorage.getItem("token");
    if(token==undefined || token==='' || token==null){
      return false;
    }else{
      return true;
    }
  }

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('usertype')
    localStorage.removeItem('uname')
    localStorage.removeItem('photo')
    return true;
  }

  getToken(){
    return localStorage.getItem("token")
  }

  public adminForgotPassword(admin : Admin):Observable<any>
  {
  return  this.http.post<any>("http://localhost:7070/admin/PassFogAdmin",admin);
  }
}
