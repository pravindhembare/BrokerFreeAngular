import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TenantServiceService } from 'src/app/services/tenant-service.service';
import { Tenant } from 'src/app/model/tenant';
@Component({
  selector: 'app-tenant-forgot',
  templateUrl: './tenant-forgot.component.html',
  styleUrls: ['./tenant-forgot.component.css']
})
export class TenantForgotComponent implements OnInit {
  tforgotForm !: FormGroup;
  tenant: Tenant = new Tenant();
  constructor(private formBuilder: FormBuilder, private _service: TenantServiceService) { }

  ngOnInit(): void {
    this.tforgotForm = this.formBuilder.group({            
      temail: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],      
      tpassreq: ['', Validators.required],
      tpassans: ['', Validators.required],
      tpassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      tcpassword:['',Validators.required]
    });
  }

  get f() { return this.tforgotForm.controls; }

  tenantforgot() {

    if (this.tforgotForm.invalid ) {
      alert("Please fill out the Form correctly");
      return;
    }
  
    // Populate this.tenant with form values    
    this.tenant.temail = this.tforgotForm.value.temail;    
    this.tenant.tpassreq = this.tforgotForm.value.tpassreq;
    this.tenant.tpassans = this.tforgotForm.value.tpassans;
    this.tenant.tpassword = this.tforgotForm.value.tpassword;
    this.tenant.tcpassword = this.tforgotForm.value.tcpassword;    
  
    if (this.tenant.tcpassword != this.tenant.tpassword ||  !this.tenant.temail || !this.tenant.tpassword || !this.tenant.tcpassword || !this.tenant.tpassreq || !this.tenant.tpassans) {
      alert("Please fill out the Form correctly...");
      return;
    }

    console.log(this.tenant);
  
    this._service.tenantForgotPassword(this.tenant).subscribe(
      response => {
        console.log(response)
        alert("Tenant Password Reset successfully");
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


