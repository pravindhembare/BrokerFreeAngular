import { Component, OnInit } from '@angular/core';
import { Properties } from 'src/app/model/properties';
import { Owner } from 'src/app/model/owner';
import { Tenant } from 'src/app/model/tenant';
import { Review } from 'src/app/model/review';
import { Report } from 'src/app/model/report';
import { NewReport } from 'src/app/model/new-report';
import { Messages } from 'src/app/model/messages';
import { MessageRequest } from 'src/app/model/message-request';
import { Notifications } from 'src/app/model/notifications';
import { Features } from 'src/app/model/features';
import { Contact } from 'src/app/model/contact';
import { PropertiesServicesService } from 'src/app/services/properties-services.service';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { OwnerServiceService } from 'src/app/services/owner-service.service';
import { TenantServiceService } from 'src/app/services/tenant-service.service';
import { ReviewServiceService } from 'src/app/services/review-service.service';
import { ReportServiceService } from 'src/app/services/report-service.service';
import { MessagesServiceService } from 'src/app/services/messages-service.service';
import { NotificationServiceService } from 'src/app/services/notification-service.service';
import { FeaturesServiceService } from 'src/app/services/features-service.service';
import { ContactServiceService } from 'src/app/services/contact-service.service';
import { FormBuilder, FormGroup, Validators,NgForm } from '@angular/forms';
import ImageCompressor from 'image-compressor.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  imageUrl?:string = localStorage.getItem('photo')?.toString();  
  userName?: string = localStorage.getItem('uname')?.toString();    
  isScrollable: boolean = true;

  option: number = 1;
  backOption:number =0;
  innerOption:number = 0;
  innerInnerOption:number =0;

  SelectedPropertyId:number=0;
  SelectedTenantId:number=0;
  SelectedOwnerId:number=0;
  SelectedReportId:number=0;
  SelectedNotificationId:number=0;
  SelectedMessageId:number=0;

  SelectedTenantEmail:string='';
  SelectedOwnerEmail:string='';

  tenant = new Tenant(); 
  tenantData: Tenant[] = []; 

  owner=new Owner();  
  ownerData:Owner[]=[];
  SelectedOwner=new Owner();
  SelectedTenant = new Tenant();


  OneOf:number=1;
  OneOfTwoOf:number=1;
  OneOneOf:number=1;
  TwoOf:number=1;
  ThreeOf:number=1;  
  FourOf:number=1;
  FiveOf:number=1;
  FiveOfFiveOf:number=0;
  SixOf:number=1;
  SixOfSixOF:number=0;

  subType: string = '';
  specification: string = '';
  type: string = '';  
  city: string = 'Pune';
  locality: string = '';
  bedrooms:any;
  bathrooms:any;
  balconies:any;
  furnishing:string='';
  propertyAge:string='';
  availableFromDate: string='';
  willing:string='';
  parking:string='';
  expectedRent: any; 
  expectedDeposit:any;
  electricWaterExcluded: string = 'No';
  priceNegotiable: string = 'No';
  properties=new Properties();

  tid:number=0;
  tname:string='';
  temail:string='';   
  tcontact:string='';
  taddress:string='';
  searchTenant = new Tenant(); 

  oid:number=0;
  oname:string='';
  oemail:string='';   
  ocontact:string='';
  oaddress:string='';
  searchOwner = new Owner(); 

  rid:number=0;
  rdate?:Date;
  reporter:string='';
  against:string='';
  report = new NewReport();

  nid:number=1;
  from:string='';
  to:string='';
  notifications = new Notifications();
  notificationData:Notifications[]=[];
  semail:string='';
  
  property=new Properties();  
  propertiesdata: Properties[] = [];
  selectedImages: any[] = [];
  imageNumber : number = 0;

  Review = new Review();
  reviewData: Review[] = [];

  Report = new Report();
  reportMsg:string='';  
  reportData: Report[] = [];

  messages = new Messages();
  messageRequest = new MessageRequest();  
  messangerRequest:MessageRequest[]=[];
  messageMsg:string='';
  msgLastDate:string='';  
  messageData:Messages[]=[];  
  messanger = [];
  messagerEmail:string='';
  toMessagerEmail:string='';
  memail:string='';
  messagerName:String='';
  indicator:number=0;

  fcity:string='';
  features = new Features();
  featuresData: Features[] = [];
  contact = new Contact();
  contactData : Contact[] = [];
  

  constructor(private formBuilder: FormBuilder, private _service:PropertiesServicesService,private http: HttpClient,private adminService:AdminServiceService,private Ownerservice:OwnerServiceService,private TenantService:TenantServiceService, private ReviewService:ReviewServiceService, private ReportService:ReportServiceService ,private MessageService:MessagesServiceService, private NotificationService:NotificationServiceService, private featureService:FeaturesServiceService, private contactService:ContactServiceService) { }


  ngOnInit(): void {  
    this.getAllProperties();
    this.getAllTenants();
    this.getAllOwners();
    this.getAllReports();
    this.getAllNotifications();
    this.loadMessangers();
    this.getAllContacts();
    this.getAllFeatures();
  }

  openSection(option: number){    
    if (option==11) {
      this.getReviewsByPropertyId();
    }         
  this.option=option;
  }

  openOneOfSubSection(option:number){
    this.OneOf=option;
    if (option==1) {
      this.getAllProperties();

    } else if(option==2) {
       this.OneOfTwoOf=1;
    }
    this.openSection(1);
  }

  openOneOneOfSubSection(option:number,propertyId:any){
    this.OneOneOf=option;
    if (option==2) {
      this.OneOneOf=2;
      this.getIntrestedTenant(propertyId);          
      this.openSection(11);
    }
    else{
      this.OneOneOf=1;
      this.openSection(11);
    }
  }

  openTwoOfSubSection(option:number){
    this.OneOf=option;
    if (option==1) {
      this.getAllTenants();
      this.TwoOf=1;
    } else if(option==2) {
       this.TwoOf=2;
    }
    this.openSection(2);
  }

  openThreeOfSubSection(option:number){
    // this.OneOf=option;
    if (option==1) {
      this.getAllOwners();
      this.ThreeOf=1;
    } else if(option==2) {
       this.ThreeOf=2;
    }
    this.openSection(3);
  }

  openFourOfSubSection(option:number){
    // this.OneOf=option;
    if (option==1) {
      this.getAllReports();
      this.FourOf=1;
    } else if(option==2) {
       this.FourOf=2;
    }
    this.openSection(4);
  }

  openFiveOfSubSection(option:number){
    if (option==1) {
      this.getAllNotifications();
      this.FiveOf=1;
      this.FiveOfFiveOf=0;
    } else if(option==2) {
       this.FiveOf=2;
       this.FiveOfFiveOf=0;
    }else if(option=3){
      this.FiveOf=3;
    }

    this.openSection(5);
  }

  openSixOfSubSection(option:number){
    if (option==1) {
      this.loadMessangers();
      this.SixOf=1;
      this.SixOfSixOF=0;
    } else if(option==2) {
       this.SixOf=2;
       this.SixOfSixOF=0;
    } 
    this.openSection(6);
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
                this.propertiesdata = data;                
                alert("Properties according to your requirement are searched.");
                this.OneOfTwoOf=2;
                this.option = 1;
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

  getAllProperties(){
    this._service.getAllProperties().subscribe(
      (data) => {
        this.propertiesdata=data
      },
      (error) => {
       
        alert("Error fetching to gell all properties.");
      }
    );
  }

  selectPropertyById(event: MouseEvent,propertyId:any,option:number,backOption:number) {
    const target = event.target as HTMLElement;
    if (target.tagName === 'TD') {
      this.SelectedPropertyId=propertyId;
      this._service.getPropertiesByPropertyId(propertyId).subscribe(
        (data) => {       
          this.property=data;
          this.selectedImages=[data.photo1,data.photo2,data.photo3,data.photo4,data.photo5];           
          this.backOption=backOption;
          this.openSection(option)
        },
        (error) => {
          alert("Error fetching tenant details");                
        }
      ); 
    }
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

setDefaultImage(event: any) {
  event.target.src = 'https://i.pinimg.com/474x/60/e9/52/60e952045a6d81004c8d32db0b625be6.jpg';
}

getIntrestedTenant(propertyId:any){
  this._service.getTenantByPropertyId(propertyId).subscribe(
    (data) => {      
      this.tenantData  = data;     
    },
    (error) => {
      alert("Error fetching tenant details");                
    }
  );  
}

RemovecartyTemail(tenantEmail:any){
  this._service.removeFromCart(tenantEmail,this.SelectedPropertyId).subscribe(
    (data) => {                
        alert("Cart Details Removed Successfully"); 
        this.getIntrestedTenant(this.SelectedPropertyId);                                  
        this.openSection(11);
    },
    (error) => {
      console.log(error);      
      alert("Error adding cart details");                
    }
  );   
}

getReviewsByPropertyId(){   
  if (this.SelectedPropertyId != null) {    
    this.ReviewService.getReviewsByPropertyId(this.SelectedPropertyId).subscribe(
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
          this.openSection(11);           
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

deleteReviewsByPropertyid(id:any){
  if (id != null) {    
    this.ReviewService.deleteReviewsByPropertyid(id).subscribe(
      (data) => {        
          alert("Your Reviews Deleted Successfully."); 
          this.openSection(11);           
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
     
    this.innerOption = backOption;
    this.option = option;
  }
  else{
    alert("This is your review ")
  }
  
}
 
  deletePropertyById(propertyId:any){
    this._service.deletePropertiesByPropertyId(propertyId).subscribe(
      (data) => {
        alert("Id: "+propertyId+" this property deleted.");
        this.openOneOfSubSection(1);
      },
      (error) => {
       
        alert("Error fetching to delete property.");
      }
    );
  }

  selectOwnerByPropertyId( option: number, backOption: number,property ?: any) {
    let basicDetailsId: number;

    if (property) {
      basicDetailsId = property.basicDetailsId;
    } else {
      basicDetailsId = this.SelectedPropertyId;
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
    
    this.innerOption = backOption;
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
  
  }

  deleteAllReport(againstEmail:any){
    
      try {        
        this.ReportService.deleteAllReport(againstEmail).subscribe(
          (data) => {          
              alert("All Report Deleted Successfully");               
              if (this.SelectedOwner.oid != 0) {                            
                this.loadOwner(againstEmail);
              } else if (this.SelectedTenant.tid != 0) {  
                this.selectReviewerTenant(againstEmail,12,this.innerOption)                            
              } else {
                alert("please refesh this page manually")
              }       
          },
          (error) => {
            console.log(error);
            
            alert("Error deleting report details");                
          }
        );       
        
      } catch (error) {
        console.log("Something went wrong for adding report");
        
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
              this.selectReviewerTenant(temail,12,this.innerOption);
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

  getAllTenants(){
    this.TenantService.getTenants().subscribe(
      (data) => {      
        this.tenantData  = data;     
      },
      (error) => {
        alert("Error fetching tenant details");                
      }
    ); 
  }

  deleteTenantByTemail(email:any){
    this.TenantService.deleteTenantByEmail(email).subscribe(
      (data) => {      
        alert("Selected Tenant Deleted Successfully.")   
        this.openSection(2);
      },
      (error) => {
        alert("Error fetching tenant details");                
      }
    ); 
  }

  submitTenantForm(){  
    if (this.tid!=0) {
      this.searchTenant.tid=this.tid;
    }
    if (this.tname!='' && this.tname!= null) {
      this.searchTenant.tname=this.tname;
    }
    if (this.temail!='' && this.temail != null) {
      this.searchTenant.temail=this.temail;
    }
    if (this.tcontact!='' && this.tcontact != null) {    
      this.searchTenant.tcontact=this.tcontact;
    }
    if(this.taddress!='' && this.taddress!= null){
      this.searchTenant.taddress=this.taddress;  
    }

    this.TenantService.searchTenants(this.searchTenant).subscribe(
      (data) => {                      
        this.tenantData  = data; 
        this.searchTenant = new Tenant(); 
        this.openSection(2);   
       
      },
      (error) => {
        alert("Error fetching tenant details");                
      }
    ); 
    
  }


  getCartDetailsByTemail(email:any){
    this._service.getPropertiesByTenantEmail(email).subscribe(
      (data) => {
        this.propertiesdata = data;  
        this.backOption=2;
        this.SelectedTenantEmail=email;
        this.openSection(21);
      },
      (error) => {
        console.error("Error fetching properties:", error);
      }
    );
  }

  removeFromCart(id:any){
    this._service.removeFromCart(this.SelectedTenantEmail,id).subscribe(
      (data) => {                
          alert("Cart Property Removed Successfully");  
            this.getCartDetailsByTemail(this.SelectedTenantEmail)                                                          
      },
      (error) => {
        console.log(error);      
        alert("Error adding cart details");                
      }
    );   
  }

  getAllOwners(){
    this.Ownerservice.getOwners().subscribe(
      (data) => {      
        this.ownerData  = data;     
      },
      (error) => {
        alert("Error fetching Owner details");                
      }
    ); 
  }

  selectOwnerByOwnerEmail( option: number, backOption: number,email ?: any) {
              
    this.Ownerservice.GetOwnerProfile(email).subscribe(
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
        console.error("Error fetching owner by owner email:", error);
      }
    );
    
    this.innerOption = backOption;
    this.option = option;
  }

  deleteOwnerByTemail(email:any){
    this.Ownerservice.deleteOwnerByEmail(email).subscribe(
      (data) => {      
        alert("Selected Owner Deleted Successfully.")   
        this.openSection(3);
      },
      (error) => {
        alert("Error fetching Owner details");                
      }
    ); 
  }

  getAddedPropertyByOemail(email:any){
    this._service.getPropertiesByOwnerEmail(email).subscribe(
      (data) => {
        this.propertiesdata = data;  
        this.backOption=3;
        this.SelectedOwnerEmail=email;
        this.openSection(31);
      },
      (error) => {
        console.error("Error fetching properties:", error);
      }
    );
  }

  submitOwnerForm(){  
    if (this.oid!=0) {
      this.searchOwner.oid=this.oid;
    }
    if (this.oname!='' && this.oname!= null) {
      this.searchOwner.oname=this.oname;
    }
    if (this.oemail!='' && this.oemail != null) {
      this.searchOwner.oemail=this.oemail;
    }
    if (this.ocontact!='' && this.ocontact != null) {    
      this.searchOwner.ocontact=this.ocontact;
    }
    if(this.oaddress!='' && this.oaddress!= null){
      this.searchOwner.oaddress=this.oaddress;  
    }

    this.Ownerservice.searchOwners(this.searchOwner).subscribe(
      (data) => {     
        console.log(data);
                         
        this.ownerData  = data;       
        this.searchOwner = new Owner(); 
        this.openSection(3);   
       
      },
      (error) => {
        alert("Error fetching owners details");                
      }
    ); 
    
  }

  getAllReports(){
    this.ReportService.getAllReports().subscribe(
      (data) => {
        this.reportData = data;         
      },
      (error) => {
        console.error("Error fetching properties:", error);
      }
    );
  }

  deleteReportById(reportid:any){
  this.ReportService.deleteReportById(reportid).subscribe(
    (data) => {        
        alert("Your report Deleted Successfully."); 
        this.getAllReports();
        this.openSection(4);
    },
    (error) => {
      console.log(error);        
      alert("Something went wrong with report deleting.");
    }
  );
}

getTenantOrOwnerByEmail(email:any){
  this.ReportService.checkUserByEmail(email).subscribe(
    (data) => {
      const userType = data.body;
      if (userType === 'Tenant') {   
        this.selectReviewerTenant(email,12,4);        
      } else if (userType === 'Owner') {        
         this.selectOwnerByOwnerEmail( 12,4,email);                 
      } else {        
        console.log('Unknown user type');
      }
    },
    (error) => {
      console.error("Error fetching properties:", error);
    }
  );
}

submitReportForm(){
  if (this.rid!=0) {
    this.report.reportid=this.rid;
  }
  if (this.rdate!=undefined && this.rdate!= null) {
    var currentDate = new Date(this.rdate);
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    var formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
    this.report.date = formattedDate;      
  }
  if (this.reporter!='' && this.reporter != null) {
    this.report.repoeter=this.reporter;
  }
  if (this.against!='' && this.against != null) {    
    this.report.against=this.against;
  }

  this.ReportService.searchReports(this.report).subscribe(
    (data) => {                       
      this.reportData  = data;       
      this.report = new Report(); 
      this.openSection(4);        
    },
    (error) => {
      alert("Error fetching Report details");                
    }
  ); 
}

getAllNotifications(){
  this.NotificationService.getAllNotifications().subscribe(
    (data) => {
      this.notificationData = data;         
    },
    (error) => {
      console.error("Error fetching Notifications:", error);
    }
  );
}

deleteNotificationById(id:any){
  this.NotificationService.deleteNotificationById(id).subscribe(
    (data) => {        
        alert("Your Notification Deleted Successfully.");        
        this.openSection(5);
        if (this.FiveOfFiveOf=3) {
          this.getUserNotifications();
        }
    },
    (error) => {
      console.log(error);        
      alert("Something went wrong with report deleting.");
    }
  );
}

getUserByEmail(email:any){
  this.ReportService.checkUserByEmail(email).subscribe(
    (data) => {
      const userType = data.body;
      if (userType === 'Tenant') {   
        this.selectReviewerTenant(email,12,5);        
      } else if (userType === 'Owner') {        
         this.selectOwnerByOwnerEmail( 12,5,email);                 
      } else {        
        console.log('Unknown user type');
      }
    },
    (error) => {
      console.error("Error fetching properties:", error);
    }
  );
}

submitNotificationForm(){
  if (this.nid!=0) {
    this.notifications.ntfid=this.nid;
  } 
  if (this.from!='' && this.from != null) {
    this.notifications.fromemail=this.from;
  }
  if (this.to!='' && this.to != null) {    
    this.notifications.toemail=this.to;
  }

  this.NotificationService.searchNotifications(this.notifications).subscribe(
    (data) => {                       
      this.notificationData  = data;       
      this.notifications = new Notifications(); 
      this.openSection(5);        
    },
    (error) => {
      alert("Error fetching Notification details");                
    }
  ); 
}

  loadMessangers(){
    this.messagerEmail='';   
    try {     
      
      this.MessageService.getAllMessangers().subscribe(
        (data) => {    
          console.log(data);
                                   
            this.messanger=data;                  
        },
        (error) => {
          console.log(error);          
          alert("Something went wrong");                
        }
      );       
      
    } catch (error) {
      console.log("Something went wrong from messangers side");
      
    }
  }

  openChatting(fromeEmail:any,email:any,name?:any){
    this.messagerEmail=fromeEmail;  
    this.toMessagerEmail=email;      
    this.MessageService.getAllMessageBySenderAndRecieverEmail(fromeEmail,email).subscribe(
      (data) => {            
        this.messageData = data;  
        this.SixOfSixOF=1;         
      },
      (error) => {
        alert("Error fetching message details");        
      }
    ); 
   
  }
 
  submitMessangerForm(){    
    const user= this.memail;       
      if(user != null || user != undefined){              
      this.MessageService.getEmailsBySenderOrReceiver(user).subscribe(
        (data) => {                             
            this.messangerRequest=data;                  
        },
        (error) => {
          console.log(error);          
          alert("Something went wrong");                
        }
      );    
    }else{
      alert("Problem fetching to current user")
      }
    
  }
  
  submitUserForm(){
    const user= this.memail;       
      if(user != null || user != undefined){              
      this.MessageService.getAllEmails().subscribe(
        (data) => {                             
            this.messangerRequest=data;                  
        },
        (error) => {
          console.log(error);          
          alert("Something went wrong");                
        }
      );    
    }else{
      alert("Problem fetching to current user")
      }            
  }

  getUserNotifications(){
    this.notifications.toemail=this.semail;             
      this.NotificationService.searchNotifications(this.notifications).subscribe(
        (data) => {                       
          this.notificationData  = data;       
          this.notifications = new Notifications();  
          this.FiveOfFiveOf=1;             
        },
        (error) => {
          alert("Error fetching Notification details");                
        }
      ); 
  }

  addNotificationByAdmin(messagecontent:string,RecieverEmail:any){
    if(messagecontent !='' || null && RecieverEmail != null || RecieverEmail != undefined){
      try {
        this.notifications.fromemail=localStorage.getItem('username')?.toString();
        this.notifications.toemail=RecieverEmail;
              var currentDate = new Date();
              var year = currentDate.getFullYear();
              var month = currentDate.getMonth() + 1;
              var day = currentDate.getDate();
              var formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
        this.notifications.date = formattedDate; 
        this.notifications.message=messagecontent;
  
        this.NotificationService.addNotifications(this.notifications).subscribe(
          (data) => {                       
            this.notificationData  = data;   
            alert("Notification Send Successfully.")    ;
            this.notifications = new Notifications(); 
            this.getUserNotifications();                  
          },
          (error) => {
            console.log(error);
            
            alert("Error to adding Notification details");                
          }
        );    
        
      } catch (error) {
        console.log("Something went wrong for adding notification");
        
      }
    }
    else{
      alert("Please provide message content or select reciever email correctly.");
    }
  }

  getUserforMessages(email:any){
    this.ReportService.checkUserByEmail(email).subscribe(
      (data) => {
        const userType = data.body;
        if (userType === 'Tenant') {   
          this.selectReviewerTenant(email,12,6);        
        } else if (userType === 'Owner') {        
           this.selectOwnerByOwnerEmail( 12,6,email);                 
        } else {        
          console.log('Unknown user type');
        }
      },
      (error) => {
        console.error("Error fetching properties:", error);
      }
    );
  }

  getAllContacts(){
    this.contactService.getAllContacts().subscribe(
      (data) => {
        this.contactData = data;         
      },
      (error) => {
        console.error("Error fetching Contact:", error);
      }
    );
  }

  deleteContactById(id:any){
    this.contactService.deleteContactById(id).subscribe(
      (data) => {        
          alert("This Record Deleted Successfully.");   
          this.getAllContacts();      
          this.openSection(7);                           
      },
      (error) => {
        console.log(error);        
        alert("Something went wrong with record deleting.");
      }
    );
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

  submitFeaturerForm(){
    if(this.fcity != null || this.fcity != undefined){
      this.features.city=this.fcity;              
      this.featureService.addFeatures(this.features).subscribe(
        (data) => {    
          alert("City Added Successfully.")                         
            this.features=new Features();  
            this.getAllFeatures();
            this.openSection(1);
        },
        (error) => {
          console.log(error);          
          alert("Something went wrong");                
        }
      );    
    }else{
      alert("Problem fetching to adding city")
      }
  }

  deleteFeatureById(id:any){
    this.featureService.deleteFeatureByID(id).subscribe(
      (data) => {        
          alert("This City Deleted Successfully.");   
          this.getAllFeatures();      
          this.openSection(1);                           
      },
      (error) => {
        console.log(error);        
        alert("Something went wrong with city deleting.");
      }
    );
  }

  logout() {
    this.adminService.logout();
    location.reload()
    window.location.href="/"
  }
}
