import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { Admin } from 'src/app/model/admin';
declare var $: any; // Declare $ to use jQuery

@Component({  
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  username: string | null = null;
  usertype: string | null = null;

  public loggedIn = false;

  constructor(private adminService:AdminServiceService) { }

  ngOnInit(): void {
      this.loggedIn=this.adminService.isLoggedIn();
      this.username = localStorage.getItem('username');
      this.usertype = localStorage.getItem('usertype');
    $(document).ready(() => {
      $('.navbar-toggler').on('click', () => {
        this.toggleNavbar();
      });
    });
  }
  
  logoutUser(){
    this.adminService.logout();
    location.reload()
    window.location.href="/"
  }

  toggleNavbar(): void {
    const navbar = document.getElementById('navbarSupportedContent');
    if (navbar !== null) {
      if (navbar.classList.contains('show')) {
        navbar.classList.remove('show');
      } else {
        navbar.classList.add('show');
      }
    }
  }

}
