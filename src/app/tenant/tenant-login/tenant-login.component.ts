import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { Admin } from 'src/app/model/admin';
@Component({
  selector: 'app-tenant-login',
  templateUrl: './tenant-login.component.html',
  styleUrls: ['./tenant-login.component.css']
})
export class TenantLoginComponent implements OnInit {
  loginForm!: FormGroup;
  admin=new Admin();
  constructor(private formBuilder: FormBuilder, private _service: AdminServiceService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      temail: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      tpassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    });
  }
  get f() { return this.loginForm.controls; }

  tenantLogin()
 {
  if (this.loginForm.valid) {
    const email = this.loginForm.get('temail')?.value;
    const password = this.loginForm.get('tpassword')?.value;

    this._service.generateToken(email, password).subscribe(
      (response: any) => {          
        this._service.loginUser(response.jwtToken,response.username,response.usertype,response.uname,response.photo); 
        if (localStorage.getItem('usertype')=="tenant") {
          alert("Tenant Logged In successfully");
          window.location.href="/tenant-home"
        } else if(localStorage.getItem('usertype')=="admin") {
          alert("Please Login using Admin Login Page..");
          this._service.logout();
          location.reload()
          window.location.href="/admin-login"
        }  else if(localStorage.getItem('usertype')=="owner") {
          alert("Please Login using Owner Login Page..");
          this._service.logout();
          location.reload()
          window.location.href="/owner-login1"
        }                           
      },
      error => {
        console.error(error);
        alert("Invalid Credentials");
      }
    );
  }else{this.loginForm.markAllAsTouched();}       
}




  // this._service.tenantLoginfromRemote(this.tenant).subscribe(

  //   response => {
  //     console.log(response);
  //     alert("Tenant Logged In successfully");
  //   },
  //   error => {
  //     console.error(error);
  //     alert("Invalid Crediationals");
  //   }
  //  );
  //  }

 onEmailInput(event: any): void {
  const input = event.target as HTMLInputElement;
  input.value = input.value.toLowerCase();
}
}
