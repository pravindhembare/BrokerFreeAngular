import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { Admin } from 'src/app/model/admin';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private adminService:AdminServiceService, private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.adminService.isLoggedIn()){
        return true;
      }

      this.router.navigate(['admin-login'])

    return false;
  }
  
}
