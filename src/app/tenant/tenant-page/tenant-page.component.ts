import { Component, OnInit } from '@angular/core';
import { Tenant } from 'src/app/model/tenant';
import { TenantServiceService } from 'src/app/services/tenant-service.service';

@Component({
  selector: 'app-tenant-page',
  templateUrl: './tenant-page.component.html',
  styleUrls: ['./tenant-page.component.css']
})
export class TenantPageComponent implements OnInit {

  tenant:any;
  constructor(private _service: TenantServiceService){}
 
  ngOnInit(): void {
    let response = this._service.getTenants();
    response.subscribe((data: any) => this.tenant = data);
  }
   
}
