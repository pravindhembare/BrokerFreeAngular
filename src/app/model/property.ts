import { from } from "rxjs";

import { Owner } from 'src/app/model/owner';
export class Property {
    //o :Owner;
    area? :string;
     buildname?:string;
     deposit ?:string;
      pdparking?:string;
      pdtype? :string; 
      prent?:string;
      
     /* constructor(data:any)
      {
         this.area=data.area;
         this.buildname=data.buildname;
         this.deposit=data.deposit;
         this.pdparking=data.pdparking;
         this.pdtype=data.pdtype;
         this.prent=data.rent;
         //this.o=JSON.parse(localStorage.getItem("session_id")!);
      }*/
      constructor()
      {}
}
