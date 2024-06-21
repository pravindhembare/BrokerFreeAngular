import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/model/contact';
import { ContactServiceService } from 'src/app/services/contact-service.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  constructor(private contactService:ContactServiceService) { }  

  ngOnInit(): void {
  }

  name:string='';
  email:string='';
  category:string='';
  message:string='';
  contact = new Contact();

  addContactDetails(){
    if (this.name!='' && this.name !== null && this.name != undefined && this.email!='' && this.email !== null && this.email != undefined
          && this.category!='' && this.category !== null && this.category != undefined  && this.message!='' && this.message !== null && this.message != undefined )
     {
      this.contact.name=this.name;
      this.contact.email=this.email;
      this.contact.category=this.category;
      this.contact.message=this.message;

      this.contactService.addContact(this.contact).subscribe(
        (data) => {
          alert("Your Message Send Successfully.");
          this.contact = new Contact();         
        },
        (error) => {
          console.error("Error fetching with adding Contact details:", error);
        }
      );


    }else{
      alert("Please fill this form correctly !!!")
    }

  }


}
