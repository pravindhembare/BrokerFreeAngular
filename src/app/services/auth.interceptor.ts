import { HttpEvent,HttpHandler,HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { Admin } from 'src/app/model/admin';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private adminService : AdminServiceService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let newReq=req;
        let token=this.adminService.getToken()
        console.log("INTERCEPTOR ",token);

        if (token!=null) {
            newReq=newReq.clone({setHeaders:{Authorization:`Bearer ${token}`}})
        }
        
        return next.handle(newReq)
        
    }
    
}