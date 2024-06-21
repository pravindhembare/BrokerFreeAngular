import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { Admin } from 'src/app/model/admin';

@Component({
  selector: 'app-owner-login1',
  templateUrl: './owner-login1.component.html',
  styleUrls: ['./owner-login1.component.css']
})
export class OwnerLogin1Component implements OnInit {
  loginForm!: FormGroup; // Add ! to explicitly tell TypeScript that loginForm will be initialized later
  admin = new Admin();

  constructor(private formBuilder: FormBuilder, private _service: AdminServiceService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      oemail: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      opassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    });
  }

  get f() { return this.loginForm.controls; }

  ownerLogin() {

    if (this.loginForm.valid) {
      const email = this.loginForm.get('oemail')?.value;
      const password = this.loginForm.get('opassword')?.value;
  
      this._service.generateToken(email, password).subscribe(
        (response: any) => {          
          this._service.loginUser(response.jwtToken,response.username,response.usertype,response.uname,response.photo); 
          if (localStorage.getItem('usertype')=="owner") {
            alert("Owner Logged In successfully");
            window.location.href="/owner-home"
          } else if(localStorage.getItem('usertype')=="admin") {
            alert("Please Login using Admin Login Page..");
            this._service.logout();
            location.reload()
            window.location.href="/admin-login"
          }  else if(localStorage.getItem('usertype')=="tenant") {
            alert("Please Login using Tenant Login Page..");
            this._service.logout();
            location.reload()
            window.location.href="/tenant-login"
          }                           
        },
        error => {
          console.error(error);
          alert("Invalid Credentials");
        }
      );
    }else{this.loginForm.markAllAsTouched();}   


    // if (this.loginForm.invalid) {
    //   return;
    // }
  
    // // Update this.Owner with form values
    // this.Owner['oemail'] = this.f['oemail'].value;
    // this.Owner['opassword'] = this.f['opassword'].value;
  
    // // Call the service method with form values
    // this._service.ownerLoginfromRemote(this.Owner).subscribe(
    //   response => {
    //     console.log(response);
    //     alert("Owner Logged In successfully");
    //   },
    //   error => {
    //     console.error(error);
    //     alert("Invalid Crediationals");
    //   }
    // );
  }
  
  onEmailInput(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toLowerCase();
  }
  
}
