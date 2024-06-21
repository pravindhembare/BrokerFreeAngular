import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { Admin } from 'src/app/model/admin';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginForm!: FormGroup;
  admin=new Admin();  
  constructor(private formBuilder: FormBuilder, private _service: AdminServiceService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/), this.emailLowerCaseValidator]],
      password: ['', [Validators.required, this.passwordValidator]]
    });
  }

  onEmailInput(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toLowerCase();
  }

  emailLowerCaseValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const email = control.value;
    if (email !== email.toLowerCase()) {
      return { 'invalidEmailCase': true };
    }
    return null;
  }

  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.value;
    const upperCaseCharacters = /[A-Z]/g;
    const lowerCaseCharacters = /[a-z]/g;
    const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/g;
    const numbers = /[0-9]/g;

    if (!lowerCaseCharacters.test(password) ||
        !upperCaseCharacters.test(password)  ||
        !specialCharacters.test(password) ||
        !numbers.test(password) || password.length < 8) {
      return { 'invalidPassword': true };
    }

    return null;
  }

  submitForm() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
  
      this._service.generateToken(email, password).subscribe(
        (response: any) => {          
          this._service.loginUser(response.jwtToken,response.username,response.usertype,response.uname,response.photo); 
          if (localStorage.getItem('usertype')=="admin") {
            alert("Admin Logged In successfully");
            window.location.href="/admin"
          } else if(localStorage.getItem('usertype')=="tenant") {
            alert("Please Login using Tenant Login Page..");
            this._service.logout();
            location.reload()
            window.location.href="/tenant-login"
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
}
