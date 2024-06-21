import { Component, OnInit } from '@angular/core';
import {  NgForm} from '@angular/forms';
import { Property } from 'src/app/model/property';
import { PropertyServiceService } from 'src/app/services/property-service.service';

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.css']
})
export class ViewPropertyComponent implements OnInit {
  // property=new Property();
 property:any;
  constructor(private _service: PropertyServiceService){}
 
  ngOnInit(): void {
    let response = this._service.getAllProperty();
    response.subscribe(data => this.property = data);
  }
   
  public removeProperty(pid:number){
    let response = this._service.deleteProperty(pid);
    response.subscribe(data => this.property = data);
  }
  public updateProperty(pid:number,property:Property){
    let response = this._service.editProperty(pid,this.property);
    response.subscribe(data => this.property = data);
 
  }
 


  }

