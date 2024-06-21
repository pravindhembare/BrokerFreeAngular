import { Component, OnInit } from '@angular/core';
import { Properties } from 'src/app/model/properties';
import { Owner } from 'src/app/model/owner';
import { Tenant } from 'src/app/model/tenant';
import { Review } from 'src/app/model/review';
import { Report } from 'src/app/model/report';
import { Messages } from 'src/app/model/messages';
import { MessageRequest } from 'src/app/model/message-request';
import { Notifications } from 'src/app/model/notifications';
import { Features } from 'src/app/model/features';
import { PropertiesServicesService } from 'src/app/services/properties-services.service';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { OwnerServiceService } from 'src/app/services/owner-service.service';
import { TenantServiceService } from 'src/app/services/tenant-service.service';
import { ReviewServiceService } from 'src/app/services/review-service.service';
import { ReportServiceService } from 'src/app/services/report-service.service';
import { MessagesServiceService } from 'src/app/services/messages-service.service';
import { NotificationServiceService } from 'src/app/services/notification-service.service';
import { FeaturesServiceService } from 'src/app/services/features-service.service';
import { FormBuilder, FormGroup, Validators,NgForm } from '@angular/forms';
import ImageCompressor from 'image-compressor.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tenant-home',
  templateUrl: './tenant-home.component.html',
  styleUrls: ['./tenant-home.component.css']
})
export class TenantHomeComponent implements OnInit {
  imageUrl?:string = localStorage.getItem('photo')?.toString();  
  userName?: string = localStorage.getItem('uname')?.toString();  
  contact:string="";
  address:string="";
  id:number=0;

  option: number = 4;
  inneroption:number = 12;
  isScrollable: boolean = true;


  tenantObject:any;
  PropertyObject:any;

  backOptionNumber : number = 21;
  secondBackOption : number = 0;

  updationForm !: FormGroup;
  passwordChangeForm !: FormGroup;
  owner=new Owner();
  tenant = new Tenant();
  selectedOwnerEmail:string='';
  SelectedOwner=new Owner();
  SelectedTenant = new Tenant();

  basicDetailsId:number = 0;

  subType: string = '';
  specification: string = '';
  type: string = '';  
  
  location:string='';
  city: string = 'Pune';
  locality: string = '';
  apartment: string = '';
  houseNo: string = '';

  bedrooms:any;
  bathrooms:any;
  balconies:any;
  carpetArea:any;
  areaType:string='sqft';
  otherRooms:string='';
  furnishing:string='';

  totalFloors: any; 
  selectedFloor: string='';
  floorOptions: number[] = [];
  propertyAge:string='';
  availableFromDate: string='';
  willing:string='';
  parking:string='';

  selectedImages: any[] = [];
  imageNumber : number = 0;
  selectedImage1:any;
  selectedImage2: any;
  selectedImage3: any;
  selectedImage4: any;
  selectedImage5: any;

  expectedRent: any;
  expectedDeposit:any;
  electricWaterExcluded: string = 'No';
  priceNegotiable: string = 'No';
  agreementDuration:string='';
  noticeMonths:string=''  ;
  description:string='';

  properties=new Properties();

  propertiesdata: Properties[] = []; 
  propertiesLoaded: boolean = false;

  selectedPropertyData: any;
  
    Review = new Review();
    reviewMsg:string ='';
    selectedPropertyId?:number;
    reviewData: Review[] = [];
    currentUser = localStorage.getItem('username')?.toString();        

    Report = new Report();
    reportMsg:string='';  
    reportData: Report[] = [];

  messages = new Messages();
  messageRequest = new MessageRequest();
  messageMsg:string='';
  msgLastDate:string='';  
  messageData:Messages[]=[];  
  messanger:MessageRequest[]=[];
  messagerEmail:String='';
  messagerName:String='';
  indicator:number=0;

  notifications = new Notifications();
  notificationData:Notifications[]=[];

  features = new Features();
  featuresData: Features[] = [];

  constructor(private formBuilder: FormBuilder, private _service:PropertiesServicesService,private http: HttpClient,private adminService:AdminServiceService,private Ownerservice:OwnerServiceService,private TenantService:TenantServiceService, private ReviewService:ReviewServiceService, private ReportService:ReportServiceService ,private MessageService:MessagesServiceService, private NotificationService:NotificationServiceService,private featureService:FeaturesServiceService) { }

  ngOnInit(): void {
   this.updationForm = this.formBuilder.group({
     oname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],     
     ocontact: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
     oaddress: ['', Validators.required],
     opassreq: ['', Validators.required],
     opassans: ['', Validators.required],       
   });
   this.passwordChangeForm = this.formBuilder.group({     
     opassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
     ocpassword: ['', Validators.required],      
   });
   this.getAllFeatures();
 }
 get f() { return this.updationForm.controls; }
 get j() { return this.passwordChangeForm.controls; }


 openSection(option: number) {
  if (option === 1) {   
    this.getAccount();
  }
   if (option === 3) {
     this.getPropertiesByTenantEmail();       
   }
   if (option === 6) {
    this.loadMessangers();      
  }  
  if (option === 5) {
    this.getNotificationsOfUser();      
  }     
   if (option === 22) {
    this.getReviewsByPropertyId();            
  }
   if (option === 21 || option ===2) {
    this.basicDetailsId = 0;
    this.subType = '';
    this.specification= '';
    this.type= '';  
    
    this.location='';
    this.city = 'Pune';
    this.locality = '';
    this.apartment = '';
    this.houseNo = '';
  
    this.bedrooms='';
    this.bathrooms='';
    this.balconies='';
    this.carpetArea='';
    this.areaType='sqft';
    this.otherRooms='';
    this.furnishing='';
  
    this.totalFloors=null; 
    this.selectedFloor='';     
    this.propertyAge='';
    this.availableFromDate='';
    this.willing='';
    this.parking='';
            
    this.selectedImage1=null;
    this.selectedImage2=null;
    this.selectedImage3=null;
    this.selectedImage4=null;
    this.selectedImage5=null;
    this.selectedImages =[this.selectedImage1,this.selectedImage2,this.selectedImage3,this.selectedImage4,this.selectedImage5];            
    this.imageNumber = 0;
  
    this.expectedRent= null;
    this.expectedDeposit=null;
    this.electricWaterExcluded = 'No';
    this.priceNegotiable = 'No';
    this.agreementDuration='';
    this.noticeMonths=''  ;
    this.description='';
  }
   
   this.option = option;
 }
 
openInnerSection(option: number) {  
    this.inneroption=option;
  }

 deleteProperty(property: any, option: number): void {
   const basicDetailsId = property.basicDetailsId;
   
   // Ask for confirmation before deleting
   const confirmDelete = confirm("Are you sure you want to delete this property?");
   if (!confirmDelete) {
     return; // User cancelled the deletion
   }
 
   this._service.deletePropertiesByPropertyId(basicDetailsId).subscribe(
     () => {
       // Property deleted successfully        
       alert("Property Deleted Successfully");
       this.openSection(option);
     },
     (error) => {
       console.error("Error deleting property:", error);
       // Optionally provide feedback to the user about the error
       alert("Error deleting property. Please try again later.");
     }
   );
 }

 getPropertiesByTenantEmail() {
   const username = localStorage.getItem('username');
   if (username) {
     this._service.getPropertiesByTenantEmail(username).subscribe(
       (data) => {
         this.propertiesdata = data;                 
         this.propertiesLoaded = true;
       },
       (error) => {
         console.error("Error fetching properties:", error);
       }
     );
   } else {
     console.error("Username not found in localStorage");
   }
 }

 selectPropertyId(property: any, option: number,backOption ?: any) {
   const basicDetailsId = property.basicDetailsId;
   this.selectedPropertyId = basicDetailsId;    
   this._service.getPropertiesByPropertyId(basicDetailsId).subscribe(
     (data) => {

       this.basicDetailsId = data.basicDetailsId;

       this.subType = data.subType;  //*
       this.specification = data.specification;  //*
       this.type = data.type;  //*

       this.location = data.locality; //*
       this.city = data.city;        //*
       this.locality = data.subLocality;  //*
       this.apartment = data.propertyName; //*
       this.houseNo = data.propertyNo; //*

       this.bedrooms = data.bedrooms.toString();  //*
       this.bathrooms = data.bathrooms.toString();  //*
       this.balconies = data.balconies.toString();  //*
       this.carpetArea = data.carpetArea;   //*
       this.areaType = data.areaType;     //*
       this.otherRooms = data.otherRooms;  
       this.furnishing = data.furnishing;  //*
     
       this.totalFloors = data.totalFloors;  //*
       this.selectedFloor = data.propertyFloor;  //*
       this.propertyAge = data.propertyAge;  //*
       this.availableFromDate = data.availabilityDate;  //*
       this.willing = data.willingType;  //*
       this.parking = data.parking;  //*
             
       this.selectedImages= [data.photo1,data.photo2,data.photo3,data.photo4,data.photo5];
       this.selectedImage1 = data.photo1; //*
       this.selectedImage2 = data.photo2;
       this.selectedImage3 = data.photo3;
       this.selectedImage4 = data.photo4;
       this.selectedImage5 = data.photo5;
     
       this.expectedRent = data.expectedRent; //*
       this.expectedDeposit = data.expecteddeposit;  //*
       this.electricWaterExcluded = data.extraCharge;  //*
       this.priceNegotiable = data.priceNegotiable;  //*
       this.agreementDuration = data.agreementDuration;  //*
       this.noticeMonths = data.noticeTime;         //*
       this.description = data.additionalDetails; //*

     },
     (error) => {
       console.error("Error fetching property by ID:", error);
     }
   );
  //  this.backOptionNumber = backOption;
   this.secondBackOption = backOption;
   this.openSection(option)  
 }

 setDefaultImage(event: any) {
   event.target.src = 'https://i.pinimg.com/474x/60/e9/52/60e952045a6d81004c8d32db0b625be6.jpg';
}

async handleProfileImage(event: any) {
  const files: FileList = event.target.files;
  if (files && files.length > 0) {
    const file: File = files[0]; 
    try {
      const imageCompressor = new ImageCompressor();
      const compressedFile = await imageCompressor.compress(file, {
        quality: 0.8, 
        maxWidth: 250,
        maxHeight: 175, 
        mimeType: 'image/jpeg',
      });

      const formData = new FormData();
      formData.append('image', compressedFile);     
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        console.log(base64Image); 
        this.imageUrl = base64Image; 
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error('Image compression error:', error);
    }
  }
}

 updateTenantProfile(){
   if (this.updationForm.invalid ) {
     alert("Please fill out the Updation Form correctly");
     return;
   }
   this.tenant.tname = this.updationForm.value.oname;
   this.tenant.temail = localStorage.getItem('username')?.toString();
   this.tenant.tcontact = this.updationForm.value.ocontact;
   this.tenant.taddress = this.updationForm.value.oaddress;
   this.tenant.tpassreq = this.updationForm.value.opassreq;
   this.tenant.tpassans = this.updationForm.value.opassans; 
   this.tenant.photo = this.imageUrl;         
   if (!this.tenant.tname || !this.tenant.temail || !this.tenant.tcontact || !this.tenant.taddress || !this.tenant.tpassreq || !this.tenant.tpassans) {
     alert("Please fill out the Updation Form correctly...");
     return;
   }
  this.TenantService.tenantUpdateProfile(this.tenant).subscribe(
   response=>
   {
     console.log(response)
     alert("Tenant Update Profile successfully");
     this.getAccount();
   },
   error => {      
       alert("An error occurred while Updating tenant Profile");
     }    
   );
 }

 changeTenantPassword() {
   if (this.passwordChangeForm.invalid) {
     alert("Please fill out the Password Changing Form correctly");
     return;
   }  
 
   const username = localStorage.getItem('username');
   if (!username) {
     alert("Username not found in localStorage");
     return;
   }
 
   const opassword = this.passwordChangeForm.value.opassword;
   const ocpassword = this.passwordChangeForm.value.ocpassword;  
 
   if (ocpassword !== opassword || !opassword || !ocpassword) {
     alert("Please fill out the Password Changing Form correctly...");
     return;
   }
 
   this.TenantService.tenantChangePassword(username, ocpassword).subscribe(
     response => {
       console.log(response);
       if (response && typeof response === 'string' && response.includes('Password updated successfully')) {
         alert("Tenant Password Change successfully");
       } else {
         alert("An error occurred while Password Changing");
       }
     },
     error => {        
       alert("Owner Password Change successfully");
     }
   );
 }
 
 submitForm(form: NgForm) {
  if (form.valid) {   
    
    this.properties.subType=this.subType;
    this.properties.specification=this.specification;
    this.properties.type=this.type;

    this.properties.city=this.city;      
          
    this.properties.bedrooms=this.bedrooms;
    this.properties.bathrooms=this.bathrooms;    
    this.properties.balconies=this.balconies;   

    this.properties.furnishing=this.furnishing;  
    this.properties.propertyAge=this.propertyAge;
    this.properties.availabilityDate=this.availableFromDate;

    this.properties.willingType=this.willing;
    this.properties.parking=this.parking;
       
    this.properties.expectedRent=this.expectedRent;
    this.properties.expecteddeposit=this.expectedDeposit;

    if (this.electricWaterExcluded == "Yes") {
      this.properties.extraCharge=this.electricWaterExcluded;  
    }
    
    if (this.priceNegotiable == "Yes") {
      this.properties.priceNegotiable=this.priceNegotiable;   
    }
                     
    this._service.searchProperties(this.properties).subscribe(
      (data) => {          
          if (data && data.length > 0) {             
              this.propertiesdata = data; // Assign fetched properties to the array
              this.propertiesLoaded = true; // Set flag to indicate properties are loaded
              alert("Properties according to your requirement are searched.");
              this.option = 21;
          } else {
              alert("No relative properties found.");
          }
      },
      (error) => {
          console.error("Error fetching properties:", error);
      }
  );
  
        
  } else {
    alert("Please fill out the form correctly.");
  }
}

clearForm() {
  // Reset form values
  this.city = 'Pune';
  this.locality = '';
  this.subType = '';
  this.specification = '';
  this.type = '';
  this.bedrooms = '';
  this.bathrooms = '';
  this.balconies = '';
  this.furnishing = '';
  this.propertyAge = '';
  this.availableFromDate = '';
  this.willing = '';
  this.parking = '';
  this.expectedRent = null;
  this.expectedDeposit = null;
  this.electricWaterExcluded = 'No';
  this.priceNegotiable = 'No'; 
  this.imageNumber = 0;
}

 logout() {
   this.adminService.logout();
   location.reload()
   window.location.href="/"
 }

//  additional
selectLookingOption(option: string) {
  this.subType = option;
}

selectPropertyType(type: string) {
  this.specification = type;
}

selectProperty(property: string) {
  this.type = property;
}

updateElectricWaterExcluded(event: Event) {
  const target = event.target as HTMLInputElement;
  this.electricWaterExcluded = target.checked ? 'Yes' : 'No';
}

updatePriceNegotiable(event: Event) {
  const target = event.target as HTMLInputElement;
  this.priceNegotiable = target.checked ? 'Yes' : 'No';
}

updateImageCount(action:String){

  if (action == "next") {
    if (this.imageNumber == 4) {
      this.imageNumber = 0;
    } else {
    this.imageNumber += 1; }
  }

  if (action == "previous") {
    if (this.imageNumber == 0) {
      this.imageNumber = 4;
    } else {
    this.imageNumber -= 1;}
  }

}

changeOptionNumber(){

}

selectOwnerByPropertyId( option: number, backOption: number,property ?: any) {
  let basicDetailsId: number;

  if (property) {
    basicDetailsId = property.basicDetailsId;
  } else {
    basicDetailsId = this.basicDetailsId;
  }
    
  
  this._service.getOwnerByPropertyId(basicDetailsId).subscribe(
    (data) => { 
      this.SelectedTenant = {tid:0};
      this.SelectedOwner=data;   
      if (this.SelectedOwner.oemail !== undefined) {
        this.loadOwner(this.SelectedOwner.oemail); 
         
      } else {
        alert("owner email is undefined");
        this.reportData = [];
        this.messageData =[];
      }
          
    },
    (error) => {
      console.error("Error fetching owner by property ID:", error);
    }
  );
  
  this.backOptionNumber = backOption;
  this.option = option;
}

loadOwner(email:string){  
  this.ReportService.getReportsByAgainstEmail(email).subscribe(
    (data) => {          
      this.reportData = data;      
    },
    (error) => {
      alert("Error fetching report details");  
      console.log(error);
                    
    }
  ); 

  this.MessageService.getAllMessageBySenderAndRecieverEmail(this.currentUser,email).subscribe(
    (data) => {            
      this.messageData = data;
    },
    (error) => {
      alert("Error fetching message details"); 
      console.log(error);
                     
    }
  ); 

}

addToCart(propertyBasicDetails: any): void {
  const tenantEmail = localStorage.getItem('username');
  const basicDetailsId = propertyBasicDetails.basicDetailsId;   
            this._service.addToCart(tenantEmail,basicDetailsId).subscribe(
              (data) => {
                if (data == null) {
                  alert("Cart Details Already Added ");
                } else {
                  alert("Cart Details Added Successfully"); 
                }                
              },
              (error) => {
                alert("Error adding cart details");                
              }
            );          
}

RemoveFromCart(propertyBasicDetails: any): void {
  const tenantEmail = localStorage.getItem('username');
  const basicDetailsId = propertyBasicDetails.basicDetailsId;   
            this._service.removeFromCart(tenantEmail,basicDetailsId).subscribe(
              (data) => {                
                  alert("Cart Details Removed Successfully");    
                  this.option=3;                        
              },
              (error) => {
                console.log(error);
                
                alert("Error adding cart details");                
              }
            );          
}

addReview(review:String){
    try {
      this.Review.email=localStorage.getItem('username')?.toString();
      this.Review.id=this.basicDetailsId;
            var currentDate = new Date();
            var year = currentDate.getFullYear();
            var month = currentDate.getMonth() + 1;
            var day = currentDate.getDate();
            var formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
      this.Review.date = formattedDate;        
      this.Review.review=review;

      this.ReviewService.addReview(this.Review).subscribe(
        (data) => {          
            alert("ReviewAdded Successfully"); 
            this.reviewMsg ='';
            this.openSection(22);

        },
        (error) => {
          alert("Error adding review details");                
        }
      );       
      
    } catch (error) {
      console.log("Something went wrong for adding review");
      
    }
}

getReviewsByPropertyId(){   
   if (this.selectedPropertyId != null) {    
     this.ReviewService.getReviewsByPropertyId(this.selectedPropertyId).subscribe(
       (data) => {
         this.reviewData = data;           
       },
       (error) => {
         console.error("Error fetching review:", error);
       }
     );
   } else {
     console.error("property Id not found");
   }
}

deleteReview(rid:any){
  if (rid != null) {    
    this.ReviewService.deleteReviewById(rid).subscribe(
      (data) => {        
          alert("Your Review Deleted Successfully.");  
          this.openSection(22);
      },
      (error) => {
        console.log(error);        
        alert("Something went wrong with review deleting.");
      }
    );
  } else {
    console.error("Review Id not found");
  }
}

selectReviewerTenant(email:any,option: number, backOption: number){
  if(email != localStorage.getItem('username')){

    
    this.TenantService.getTenantProfile(email).subscribe(
      (data) => {       
        this.SelectedOwner={oid:0};
        this.SelectedTenant = data;
      },
      (error) => {
        alert("Error fetching tenant details");                
      }
    ); 
    
    this.ReportService.getReportsByAgainstEmail(email).subscribe(
      (data) => {          
        this.reportData = data;
      },
      (error) => {
        alert("Error fetching report details");                
      }
    ); 

    this.MessageService.getAllMessageBySenderAndRecieverEmail(this.currentUser,email).subscribe(
      (data) => {            
        this.messageData = data;
      },
      (error) => {
        alert("Error fetching message details");                
      }
    ); 

    this.backOptionNumber = backOption;
    this.option = option;
  }
  else{
    alert("This is your review ")
  }
  
}

addReport(report:String,againstEmail:any){
  if(report !='' || null && againstEmail != null || againstEmail != undefined){
    try {
      this.Report.reporter=localStorage.getItem('username')?.toString();
      this.Report.against=againstEmail;
            var currentDate = new Date();
            var year = currentDate.getFullYear();
            var month = currentDate.getMonth() + 1;
            var day = currentDate.getDate();
            var formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
      this.Report.date = formattedDate;        
      this.Report.rptmessage=report;

      this.ReportService.addReport(this.Report).subscribe(
        (data) => {          
            alert("Report Added Successfully"); 
            this.reportMsg ='';  
            if (this.SelectedOwner.oid != 0) {                            
              this.loadOwner(againstEmail);
            } else if (this.SelectedTenant.tid != 0) {
              console.log("reached tenant");
              this.selectReviewerTenant(againstEmail,23,this.backOptionNumber)
            } else {
              alert("please refesh this page manually")
            }       
        },
        (error) => {
          alert("Error adding report details");                
        }
      );       
      
    } catch (error) {
      console.log("Something went wrong for adding report");
      
    }
  }
  else{
    alert("Please provide report msg or select against email correctly.");
  }
}

deleteReport(reportid:any,temail:any){
  if (reportid != null) {    
    this.ReportService.deleteReportById(reportid).subscribe(
      (data) => {        
          alert("Your report Deleted Successfully."); 
          if (this.SelectedOwner.oid != 0) {
            this.loadOwner(temail);
          } else if (this.SelectedTenant.tid != 0) {
            this.selectReviewerTenant(temail,23,this.backOptionNumber)
          } else {
            alert("please refesh this page manually")
          }            
      },
      (error) => {
        console.log(error);        
        alert("Something went wrong with report deleting.");
      }
    );

    

  } else {
    console.error("report Id not found");
  }
}

addMessage(messagecontent:String,RecieverEmail:any){
  if(messagecontent !='' || null && RecieverEmail != null || RecieverEmail != undefined){
    try {
      this.messages.sender=localStorage.getItem('username')?.toString();
      this.messages.reciever=RecieverEmail;
            var currentDate = new Date();
            var year = currentDate.getFullYear();
            var month = currentDate.getMonth() + 1;
            var day = currentDate.getDate();
            var formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
      this.messages.date = formattedDate; 
      this.messages.time = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      this.messages.message=messagecontent;

      this.MessageService.addMessage(this.messages).subscribe(
        (data) => {          
            alert("Message send Successfully"); 
            this.messageMsg =''; 
            if (this.SelectedOwner.oid != 0) {
              this.loadOwner(RecieverEmail);
            } else if (this.SelectedTenant.tid != 0) {
              this.selectReviewerTenant(RecieverEmail,23,this.backOptionNumber)
            } else {
              alert("please refesh this page manually")
            }                    
        },
        (error) => {
          alert("Error to sending message");                
        }
      );       
      
    } catch (error) {
      console.log("Something went wrong for sending message");
      
    }
  }
  else{
    alert("Please provide message content or select reciever email correctly.");
  }
}

deleteMessage(messageid:any,temail:any){
  if (messageid != null) {    
    this.MessageService.deleteMessageById(messageid).subscribe(
      (data) => {        
          alert("Your message Deleted Successfully."); 
          if (this.SelectedOwner.oid != 0) {
            this.loadOwner(temail);
          } else if (this.SelectedTenant.tid != 0) {
            this.selectReviewerTenant(temail,23,this.backOptionNumber)
          } else {
            alert("please refesh this page manually")
          }           
      },
      (error) => {
        console.log(error);        
        alert("Something went wrong with message deleting.");
      }
    );      

  } else {
    console.error("message Id not found");
  }
}

getAccount(){    
  const user = localStorage.getItem('username');
  if (user!=null) {
    this.TenantService.getTenantProfile(user).subscribe(
      response=>
      {
        this.id=response.tid;
        this.contact=response.tcontact;
        this.address=response.taddress;
        this.userName=response.tname;
        this.imageUrl=response.photo;
      },
      error => {    
          alert("An error to fetching owner Profile");         
         
        }    
      );
  }    
}

deleteAccount(){
  const user = localStorage.getItem('username');
  const result = window.confirm('Are you sure you want to delete your Account?');
  if (result) { 
    if (user!=null) {
      this.TenantService.deleteTenantByEmail(user).subscribe(
        response=>
        {
          console.log(response);
          
          alert("Your Account Deleted Successfully")
          this.logout();
        },
        error => {   
          console.log(error);
           
            alert("An error to fetching owner Profile");         
           
          }    
        );
    }    
  }    
  } 

  loadMessangers(){
    this.messagerEmail='';
    const user= localStorage.getItem('username')?.toString();
    try {
      if(user != null || user != undefined){
      
      this.MessageService.getEmailsBySenderOrReceiver(user).subscribe(
        (data) => {                             
            this.messanger=data;                  
        },
        (error) => {
          console.log(error);          
          alert("Something went wrong");                
        }
      );    
    }else{
      alert("Problem fetching to current user")
    }

      
    } catch (error) {
      console.log("Something went wrong from messangers side");
      
    }
  }

  loadAllMessangers(){
    this.messagerEmail='';
    const user= localStorage.getItem('username')?.toString();
    try {
      if(user != null || user != undefined){
      
      this.MessageService.getAllEmails().subscribe(
        (data) => { 
          this.messanger=[];
          for (let index = 0; index < data.length; index++) {
            if (data[index].email != user) {
              this.messanger.push(data[index]);     
            }            
          }                                                  
        },
        (error) => {
          console.log(error);          
          alert("Something went wrong");                
        }
      );    
    }else{
      alert("Problem fetching to current user")
    }

      
    } catch (error) {
      console.log("Something went wrong from messangers side");
      
    }
  }

  selectAction(indicator:number){
    this.indicator=indicator;
    if (this.indicator==0) {
      this.loadMessangers();
    } else {
      this.loadAllMessangers();
    }
  }

  openChatting(email:any,name:any){
    this.messagerEmail=email;
    this.messagerName=name;
    this.MessageService.getAllMessageBySenderAndRecieverEmail(this.currentUser,email).subscribe(
      (data) => {            
        this.messageData = data;           
      },
      (error) => {
        alert("Error fetching message details");        
      }
    ); 
   
  }

  addMessageFromMessanger(messagecontent:String,RecieverEmail:any){
    if(messagecontent !='' || null && RecieverEmail != null || RecieverEmail != undefined){
      try {
        this.messages.sender=localStorage.getItem('username')?.toString();
        this.messages.reciever=RecieverEmail;
              var currentDate = new Date();
              var year = currentDate.getFullYear();
              var month = currentDate.getMonth() + 1;
              var day = currentDate.getDate();
              var formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
        this.messages.date = formattedDate; 
        this.messages.time = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        this.messages.message=messagecontent;
  
        this.MessageService.addMessage(this.messages).subscribe(
          (data) => {          
              alert("Message send Successfully"); 
              this.messageMsg =''; 
              this.openChatting(this.messagerEmail,this.messagerName);            
              
          },
          (error) => {
            alert("Error to sending message");                
          }
        );       
        
      } catch (error) {
        console.log("Something went wrong for sending message");
        
      }
    }
    else{
      alert("Please provide message content or select reciever email correctly.");
    }
  }

  getNotificationsOfUser(){
    try {
      const user =localStorage.getItem('username')?.toString();  
      if (user != undefined) {
        this.NotificationService.getNotificationByToEmail(user).subscribe(
          (data) => {                                        
              this.notificationData=data;
          },
          (error) => {
            alert("Error to get Notifications");                
          }
        );       
      } 
      } catch (error) {
        console.log("Something went wrong for fetching Notifications");
        
      }
       
      
  }

  getAllFeatures(){
    this.featureService.getAllFeatures().subscribe(
      (data) => {
        this.featuresData = data;         
      },
      (error) => {
        console.error("Error fetching Features:", error);
      }
    );
  }
}
