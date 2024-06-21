import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OwnerRegister1Component } from './owner/owner-register1/owner-register1.component';
import { MainPageComponent } from './HomePage/main-page/main-page.component';
import { FooterComponent } from './HomePage/footer/footer.component';
import { HeaderComponent } from './HomePage/header/header.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TenantRegisterComponent } from './tenant/tenant-register/tenant-register.component';
import { TenantLoginComponent } from './tenant/tenant-login/tenant-login.component';
import { AddPropertyComponent } from './Property/add-property/add-property.component';
import { ViewPropertyComponent } from './Property/view-property/view-property.component';
import { OwnerPageComponent } from './owner/owner-page/owner-page.component';
import { ViewPropertyTenantComponent } from './tenant/view-property-tenant/view-property-tenant.component';
import { AboutusComponent } from './HomePage/aboutus/aboutus.component';
import { ContactusComponent } from './HomePage/contactus/contactus.component';
import { AdminComponent } from './admin/admin.component';
import { OwnerLogin1Component } from './owner/owner-login1/owner-login1.component';
import { TenantPageComponent } from './tenant/tenant-page/tenant-page.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TenantForgotComponent } from './tenant/tenant-forgot/tenant-forgot.component';
import { OwnerForgotComponent } from './owner/owner-forgot/owner-forgot.component';
import { AdminForgotComponent } from './admin-forgot/admin-forgot.component';
import { AdminServiceService } from './services/admin-service.service';
import { AuthGuard } from './services/auth.guard';
import { AuthInterceptor,} from './services/auth.interceptor';
import { OwnerHomeComponent } from './owner/owner-home/owner-home.component';
import { TenantHomeComponent } from './tenant/tenant-home/tenant-home.component';




@NgModule({
  declarations: [
    AppComponent,    
    MainPageComponent,
    FooterComponent,
    HeaderComponent,    
    TenantRegisterComponent,
    TenantLoginComponent,
    AddPropertyComponent,
    ViewPropertyComponent,
    OwnerPageComponent,
    ViewPropertyTenantComponent,
    AboutusComponent,
    ContactusComponent,
    AdminComponent,
    OwnerLogin1Component,
    OwnerRegister1Component,
    TenantPageComponent,
    AdminLoginComponent,
    TenantForgotComponent,
    OwnerForgotComponent,
    AdminForgotComponent,
    OwnerHomeComponent,
    TenantHomeComponent,  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
   providers:[],
  // providers: [AdminServiceService, AuthGuard ,[{providers:HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true}]],
  bootstrap: [AppComponent]
})
export class AppModule { }
