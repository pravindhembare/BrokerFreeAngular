import { Component, OnInit } from '@angular/core';
import {  NgForm} from '@angular/forms';
import { Owner } from 'src/app/model/owner';
import { Property } from 'src/app/model/property';
import { PropertyServiceService } from 'src/app/services/property-service.service';
@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  property=new Property();
 // property!:Property;
  owner!:Owner;
  
  oid:any;
  constructor(private _service: PropertyServiceService){}



  ngOnInit(): void {
  } 
  //addProperty(propertyData:any)
  addProperty()
  {
//this.owner = JSON.parse(localStorage.getItem("session_id")!);
   // console.log(propertyData);
    //this.oid = this.owner.oid;
   this._service.addPropertyfromRemote(this.property).subscribe(

    data =>console.log("response received"),
    error =>console.log("exception occured")
   )
  }
}
  
