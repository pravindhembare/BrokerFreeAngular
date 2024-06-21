import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/model/owner';
import { OwnerServiceService } from 'src/app/services/owner-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-owner-register1',
  templateUrl: './owner-register1.component.html',
  styleUrls: ['./owner-register1.component.css']
})
export class OwnerRegister1Component implements OnInit {
  registerForm !: FormGroup;
 owner=new Owner();
   constructor(private formBuilder: FormBuilder, private _service:OwnerServiceService) { }

   ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      oname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      oemail: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      ocontact: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      oaddress: ['', Validators.required],
      opassreq: ['', Validators.required],
      opassans: ['', Validators.required],
      opassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      ocpassword: ['', Validators.required],
      
    });
  }
  get f() { return this.registerForm.controls; }

 ownerRegister1()
  {
    if (this.registerForm.invalid ) {
      alert("Please fill out the Registration Form correctly");
      return;
    }

    this.owner.oname = this.registerForm.value.oname;
    this.owner.oemail = this.registerForm.value.oemail;
    this.owner.ocontact = this.registerForm.value.ocontact;
    this.owner.oaddress = this.registerForm.value.oaddress;
    this.owner.opassreq = this.registerForm.value.opassreq;
    this.owner.opassans = this.registerForm.value.opassans;
    this.owner.opassword = this.registerForm.value.opassword;
    this.owner.ocpassword = this.registerForm.value.ocpassword;    
  
    if (this.owner.ocpassword != this.owner.opassword || !this.owner.oname || !this.owner.oemail || !this.owner.ocontact || !this.owner.oaddress || !this.owner.opassword || !this.owner.ocpassword || !this.owner.opassreq || !this.owner.opassans) {
      alert("Please fill out the Registration Form correctly...");
      return;
    }

    console.log(this.owner);
    
   this._service.ownerRegisterfromRemote(this.owner).subscribe(
    response=>
    {
      console.log(response)
      alert("Owner Registered successfully");

    },
    error => {
      if (error.status === 409) {
        alert("Email is already present");
      } else {
        alert("An error occurred while registering owner");
      }
    }
    );
   
   }

   onEmailInput(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toLowerCase();
  }
}
