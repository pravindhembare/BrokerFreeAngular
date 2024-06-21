import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Tenant } from 'src/app/model/tenant';
import { TenantServiceService } from 'src/app/services/tenant-service.service';

@Component({
  selector: 'app-tenant-register',
  templateUrl: './tenant-register.component.html',
  styleUrls: ['./tenant-register.component.css']
})
export class TenantRegisterComponent implements OnInit {
  registerForm !: FormGroup;
  tenant: Tenant = new Tenant();

  constructor(private formBuilder: FormBuilder, private _service: TenantServiceService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      tname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      temail: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      tcontact: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      taddress: ['', Validators.required],
      tpassreq: ['', Validators.required],
      tpassans: ['', Validators.required],
      tpassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      tcpassword:['',Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  tenantRegister() {

    if (this.registerForm.invalid ) {
      alert("Please fill out the Registration Form correctly");
      return;
    }
  
    // Populate this.tenant with form values
    this.tenant.tname = this.registerForm.value.tname;
    this.tenant.temail = this.registerForm.value.temail;
    this.tenant.tcontact = this.registerForm.value.tcontact;
    this.tenant.taddress = this.registerForm.value.taddress;
    this.tenant.tpassreq = this.registerForm.value.tpassreq;
    this.tenant.tpassans = this.registerForm.value.tpassans;
    this.tenant.tpassword = this.registerForm.value.tpassword;
    this.tenant.tcpassword = this.registerForm.value.tcpassword;    
  
    if (this.tenant.tcpassword != this.tenant.tpassword || !this.tenant.tname || !this.tenant.temail || !this.tenant.tcontact || !this.tenant.taddress || !this.tenant.tpassword || !this.tenant.tcpassword || !this.tenant.tpassreq || !this.tenant.tpassans) {
      alert("Please fill out the Registration Form correctly...");
      return;
    }

    console.log(this.tenant);
  
    this._service.tenantRegisterfromRemote(this.tenant).subscribe(
      response => {
        console.log(response)
        alert("Tenant Registered successfully");
      },
      error => {
        if (error.status === 409) {
          alert("Email is already present");
        } else {
          alert("An error occurred while registering tenant");
        }
      }
    );
  }
  
  onEmailInput(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toLowerCase();
  }
}
