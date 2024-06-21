import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OwnerServiceService } from 'src/app/services/owner-service.service';
import { Owner } from 'src/app/model/owner';

@Component({
  selector: 'app-owner-forgot',
  templateUrl: './owner-forgot.component.html',
  styleUrls: ['./owner-forgot.component.css']
})
export class OwnerForgotComponent implements OnInit {
  oforgotForm !: FormGroup;
  owner=new Owner();
  constructor(private formBuilder: FormBuilder, private _service:OwnerServiceService) { }

  ngOnInit(): void {
    this.oforgotForm = this.formBuilder.group({     
      oemail: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],     
      opassreq: ['', Validators.required],
      opassans: ['', Validators.required],
      opassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      ocpassword: ['', Validators.required],      
    });
  }
  get f() { return this.oforgotForm.controls; }
  ownerforgot() {

    if (this.oforgotForm.invalid ) {
      alert("Please fill out the Form correctly");
      return;
    }
  
    // Populate this.tenant with form values    
    this.owner.oemail = this.oforgotForm.value.oemail;    
    this.owner.opassreq = this.oforgotForm.value.opassreq;
    this.owner.opassans = this.oforgotForm.value.opassans;
    this.owner.opassword = this.oforgotForm.value.opassword;
    this.owner.ocpassword = this.oforgotForm.value.ocpassword;    
  
    if (this.owner.ocpassword != this.owner.opassword ||  !this.owner.oemail || !this.owner.opassword || !this.owner.ocpassword || !this.owner.opassreq || !this.owner.opassans) {
      alert("Please fill out the Form correctly...");
      return;
    }

    console.log(this.owner);
  
    this._service.ownerForgotPassword(this.owner).subscribe(
      response => {
        console.log(response)
        alert("Owner Password Reset successfully");
      },
      error => {
        console.error(error);
        alert("Invalid Credentials");
      }
    );
  }
  onEmailInput(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toLowerCase();
  }
  }



