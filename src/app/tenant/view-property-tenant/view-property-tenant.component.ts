import { Component, OnInit } from '@angular/core';
import { PropertyServiceService } from 'src/app/services/property-service.service';

@Component({
  selector: 'app-view-property-tenant',
  templateUrl: './view-property-tenant.component.html',
  styleUrls: ['./view-property-tenant.component.css']
})
export class ViewPropertyTenantComponent implements OnInit {
  property:any;
  constructor(private _service: PropertyServiceService){}
 
 

  ngOnInit(): void {
    let response = this._service.getAllProperty();
    response.subscribe(data => this.property = data);
  }
   
  }

