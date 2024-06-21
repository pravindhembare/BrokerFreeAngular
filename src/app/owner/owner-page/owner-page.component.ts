import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/model/owner';
import { OwnerServiceService } from 'src/app/services/owner-service.service';

@Component({
  selector: 'app-owner-page',
  templateUrl: './owner-page.component.html',
  styleUrls: ['./owner-page.component.css']
})
export class OwnerPageComponent implements OnInit {
  owner: any;
  
  constructor(private _service: OwnerServiceService){}
 
  ngOnInit(): void {
    let response = this._service.getOwners();
    response.subscribe((data: any) => this.owner = data);
  }
   
}
