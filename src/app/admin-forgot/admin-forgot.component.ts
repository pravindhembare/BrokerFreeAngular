import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { Admin } from 'src/app/model/admin';

@Component({
  selector: 'app-admin-forgot',
  templateUrl: './admin-forgot.component.html',
  styleUrls: ['./admin-forgot.component.css']
})
export class AdminForgotComponent implements OnInit {
  aforgotForm !: FormGroup;
  admin: Admin = new Admin();

  constructor(private formBuilder: FormBuilder, private _service : AdminServiceService) { }

  ngOnInit(): void {
    this.aforgotForm = this.formBuilder.group({            
      aemail: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],            
      akey: ['', Validators.required],
      apassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      acpassword:['',Validators.required]
    });
  }
  get f() { return this.aforgotForm.controls; }

  adminforgot(){

    if (this.aforgotForm.invalid ) {
      alert("Please fill out the Form correctly");
      return;
    }
  
    // Populate this.tenant with form values    
    this.admin.email = this.aforgotForm.value.aemail;    
    this.admin.password = this.aforgotForm.value.apassword;
    this.admin.akey = this.aforgotForm.value.akey;    
    this.admin.tcpassword = this.aforgotForm.value.acpassword;    
  
    if (this.admin.tcpassword != this.admin.password ||  !this.admin.email || !this.admin.akey || !this.admin.tcpassword  || !this.admin.password) {
      alert("Please fill out the Form correctly...");
      return;
    }

    console.log(this.admin);
  
    this._service.adminForgotPassword(this.admin).subscribe(
      response => {
        console.log(response)
        alert("Admin Password Reset successfully");
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
