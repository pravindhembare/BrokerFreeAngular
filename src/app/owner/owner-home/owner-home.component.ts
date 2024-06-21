import { Component, OnInit } from '@angular/core';
import { Properties } from 'src/app/model/properties';
import { Owner } from 'src/app/model/owner';
import { Tenant } from 'src/app/model/tenant';
import { Report } from 'src/app/model/report';
import { Messages } from 'src/app/model/messages';
import { MessageRequest } from 'src/app/model/message-request';
import { Notifications } from 'src/app/model/notifications';
import { Review } from 'src/app/model/review';
import { Features } from 'src/app/model/features';
import { PropertiesServicesService } from 'src/app/services/properties-services.service';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { OwnerServiceService } from 'src/app/services/owner-service.service';
import { TenantServiceService } from 'src/app/services/tenant-service.service';
import { ReportServiceService } from 'src/app/services/report-service.service';
import { MessagesServiceService } from 'src/app/services/messages-service.service';
import { NotificationServiceService } from 'src/app/services/notification-service.service';
import { ReviewServiceService } from 'src/app/services/review-service.service';
import { FeaturesServiceService } from 'src/app/services/features-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ImageCompressor from 'image-compressor.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-owner-home',
  templateUrl: './owner-home.component.html',
  styleUrls: ['./owner-home.component.css']
})
export class OwnerHomeComponent implements OnInit {
  imageUrl?:string = localStorage.getItem('photo')?.toString();  
  userName?: string = localStorage.getItem('uname')?.toString();  
  contact:string="";
  address:string="";
  id:number=0;

  option: number = 4;
  inneroption:number = 12;
  isScrollable: boolean = true;

  updationForm !: FormGroup;
  passwordChangeForm !: FormGroup;
  owner = new Owner();
  tenant = new Tenant();

  selectedTenant = new Tenant();

  tenantData: Tenant[] = [];
  
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

  propertiesdata: Properties[] = []; // Array to store fetched properties
  propertiesLoaded: boolean = false; // Flag to indicate if properties are loaded

  selectedPropertyData: any;

  currentUser = localStorage.getItem('username')?.toString();
  selectedTenantEmail:string='';

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

    Review = new Review();      
    reviewData: Review[] = [];

    features = new Features();
  featuresData: Features[] = [];

   constructor(private formBuilder: FormBuilder, private _service:PropertiesServicesService,private http: HttpClient,private adminService:AdminServiceService,private Ownerservice:OwnerServiceService,private TenantService:TenantServiceService, private ReportService:ReportServiceService, private MessageService:MessagesServiceService, private NotificationService:NotificationServiceService ,private ReviewService:ReviewServiceService,private featureService:FeaturesServiceService ) { }

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
      this.getPropertiesByOwnerEmail();
    }
    if (option === 6) {
      this.loadMessangers();      
    }  
    if (option === 5) {
      this.getNotificationsOfUser();      
    }        
    if (option === 21) {
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
  selectPropertyType(type: string) {
    this.specification = type;
  }

  selectProperty(property: string) {
    this.type = property;
  }
 
  selectLookingOption(option: string) {
    this.subType = option;
  }

  onContinue1(option: number) {   
    if (this.subType === 'PG' || this.specification !== '' && this.type !== '' && this.subType !== '') {
      if (this.subType === 'PG') {
        this.specification = ''; 
        this.type = '';
        this.option = option;
      } else if(this.specification === 'residential' && (this.type==='Flat/Apartment' || this.type==='Independent House/Villa' || this.type==='1RK Studio Apartment' || this.type==='2RK Studio Apartment' || this.type==='Independent/Builder Floor') ) {
        this.option = option;
      } else if(this.specification === 'commercial' && (this.type==='Office' || this.type==='Retail' || this.type==='Warehouses' || this.type==='Restaurants' || this.type==='Other') ) {
        this.option = option;
      } else {        
        alert("Please Fill Out Basic Details Properly");
    }
   
    } else {        
        alert("Please Fill Out Basic Details Properly");
    }
}

getCurrentLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
              // Get latitude and longitude
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;

              if (latitude == null || latitude == undefined) {
                alert("Please check internet connection and location");
              }

              // Construct Google Maps link with current location
            const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;             
             
              this.location = mapsLink;
          },
          (error) => {
            alert("Please check internet connection and location");            
          }
      );
  } else {
      console.error('Geolocation is not supported by this browser.');
  }
}

  onContinue2(option: number) {    
    if (this.city !== '' && this.locality !== '' && this.apartment !== '') {
      this.option = option;
  } else {        
      alert("Please Fill Out Location Details Properly");
  }
  }

  onContinue3(option: number) {
    if (
        this.bedrooms !== undefined &&
        this.bathrooms !== undefined &&
        this.balconies !== undefined &&
        this.carpetArea !== undefined &&
        this.carpetArea !== null &&
        this.areaType !== '' &&        
        this.furnishing !== ''
    ) {
      this.option=option;              
    }else{
      alert('Please fill in all required fields.');
    }
  }

  initializeFloorOptions() {
    this.floorOptions = [];
    for (let i = 0; i <= this.totalFloors; i++) {
      this.floorOptions.push(i);
    }
  }

  onTotalFloorsChange() {
    this.initializeFloorOptions();
  }

  onContinue4(option: number) {
    if (
        this.totalFloors !== null &&
        this.selectedFloor !== null &&
        this.propertyAge !== '' &&
        this.availableFromDate !== '' &&
        this.willing !== '' &&
        this.parking !== ''
    ) {
        this.option=option;       
    } else { alert('Please fill in all required fields.');}
  }

async handleImageUpload(event: any) {
  const files: FileList = event.target.files;
  if (files) {
      for (let i = 0; i < files.length; i++) {
          const file: File = files[i];
          if (this.selectedImages.length < 5) {
              await this.compressAndUploadImage(file);
          } else {
              alert('You can only upload up to 5 images.');
              break;
          }
      }
  }
}

async compressAndUploadImage(file: File) {
  try {
      const imageCompressor = new ImageCompressor();
      const compressedFile = await imageCompressor.compress(file, {
          quality: 0.8, // Adjust quality as needed
          maxWidth: 250, // Adjust maximum width as needed
          maxHeight: 175, // Adjust maximum height as needed
          mimeType: 'image/jpeg', // Specify output format
      });
      
      const formData = new FormData();
      formData.append('image', compressedFile); // Append compressed file to FormData
      
      // Convert the blob URL to base64-encoded data URL
      const reader = new FileReader();
      reader.onload = () => {
          const base64Image = reader.result as string;
          console.log(base64Image); // Log base64 encoded image data
          this.selectedImages.push(base64Image); // Display image in frontend
      };
      reader.readAsDataURL(compressedFile);
      
      // Uncomment the following lines if you want to upload the images to the backend
      // this.http.post('http://your-backend-url/uploadImage', formData).subscribe(response => {
      //     console.log(response);                
      // });
  } catch (error) {
      console.error('Image compression error:', error);
  }
}

removeImage(index: number) {
    this.selectedImages.splice(index, 1);
}

displaySelectedImages() {
    const selectedImagesDiv = document.getElementById('selectedImages');
    if (selectedImagesDiv) {
        selectedImagesDiv.innerHTML = '';
        this.selectedImages.forEach((imageUrl, index) => {
            const imageElement = document.createElement('div');
            imageElement.innerHTML = `
                <img src="${imageUrl}" alt="Selected Image" style="width: 100px; height: 100px;">
                <button class="btn btn-danger btn-sm" onclick="removeImage(${index})">Remove</button>
            `;
            selectedImagesDiv.appendChild(imageElement);
        });
    } else {
        console.error("Element with id 'selectedImages' not found.");
    }
}

onContinue5(option: number) { 

  if (this.selectedImages.length >= 5) {
      this.selectedImage1 = this.selectedImages[0];
      this.selectedImage2 = this.selectedImages[1]; 
      this.selectedImage3 = this.selectedImages[2]; 
      this.selectedImage4 = this.selectedImages[3];
      this.selectedImage5 = this.selectedImages[4];        
} 
else if (this.selectedImages.length = 4) {
  this.selectedImage1 = this.selectedImages[0];
  this.selectedImage2 = this.selectedImages[1]; 
  this.selectedImage3 = this.selectedImages[2]; 
  this.selectedImage4 = this.selectedImages[3];
  this.selectedImage5 = null;       
}  
else  if (this.selectedImages.length = 3) {
  this.selectedImage1 = this.selectedImages[0];
  this.selectedImage2 = this.selectedImages[1]; 
  this.selectedImage3 = this.selectedImages[2]; 
  this.selectedImage4 = null;
  this.selectedImage5 = null;        
} 
else if (this.selectedImages.length = 2) {
  this.selectedImage1 = this.selectedImages[0];
  this.selectedImage2 = this.selectedImages[1]; 
  this.selectedImage3 = null;
  this.selectedImage4 = null;
  this.selectedImage5 = null;              
} 
else if (this.selectedImages.length <= 1) {
  this.selectedImage1 = this.selectedImages[0];
  this.selectedImage2 = null;
  this.selectedImage3 = null;
  this.selectedImage4 = null;
  this.selectedImage5 = null;                       
}
else{
  alert("Something went wrong in selectedImage Array");
}
    this.option = option;
}

updateElectricWaterExcluded(event: Event) {
  const target = event.target as HTMLInputElement;
  this.electricWaterExcluded = target.checked ? 'Yes' : 'No';
}

updatePriceNegotiable(event: Event) {
  const target = event.target as HTMLInputElement;
  this.priceNegotiable = target.checked ? 'Yes' : 'No';
}

  Submit() {      
    if (
      this.expectedRent !== undefined &&
      this.expectedDeposit !== undefined &&
      this.expectedRent !== null &&
      this.expectedDeposit !== null) {

    this.properties.oemail = localStorage.getItem('username')?.toString();

    this.properties.subType=this.subType;
    this.properties.specification=this.specification;
    this.properties.type=this.type;
       
    this.properties.locality=this.location;
    this.properties.city=this.city;    
    this.properties.subLocality=this.locality;
    this.properties.propertyName=this.apartment;
    this.properties.propertyNo=this.houseNo;
          
    this.properties.bedrooms=this.bedrooms;
    this.properties.bathrooms=this.bathrooms;    
    this.properties.balconies=this.balconies;
    this.properties.carpetArea=this.carpetArea
    this.properties.areaType=this.areaType;
    this.properties.otherRooms=this.otherRooms;
    this.properties.furnishing=this.furnishing;
    this.properties.totalFloors=this.totalFloors;
    this.properties.propertyFloor=this.selectedFloor;
    this.properties.propertyAge=this.propertyAge;
    this.properties.availabilityDate=this.availableFromDate;
    this.properties.willingType=this.willing;
    this.properties.parking=this.parking;
       
    this.properties.expectedRent=this.expectedRent;
    this.properties.expecteddeposit=this.expectedDeposit;
    this.properties.extraCharge=this.electricWaterExcluded;
    this.properties.priceNegotiable=this.priceNegotiable;
    this.properties.agreementDuration=this.agreementDuration;
    this.properties.noticeTime=this.noticeMonths;
    this.properties.additionalDetails=this.description;
            
    this.properties.photo1=this.selectedImage1;
    this.properties.photo2=this.selectedImage2;
    this.properties.photo3=this.selectedImage3;
    this.properties.photo4=this.selectedImage4;
    this.properties.photo5=this.selectedImage5;   
        
        this._service.propertyPost(this.properties).subscribe(
          response=>
          {
            console.log(response)
            alert("Property Save successfully");  
            this.openSection(3);
          },
          error => {            
              alert("An error occurred while saving Property");           
          }
          );

    } else { alert('Please fill in all required fields.');}
  }
 
  updateProperty(){
    this.properties.oemail = localStorage.getItem('username')?.toString();

    this.properties.subType=this.subType;
    this.properties.specification=this.specification;
    this.properties.type=this.type;

    this.properties.locality=this.location;
    this.properties.city=this.city;    
    this.properties.subLocality=this.locality;
    this.properties.propertyName=this.apartment;
    this.properties.propertyNo=this.houseNo;
          
    this.properties.bedrooms=this.bedrooms;
    this.properties.bathrooms=this.bathrooms;    
    this.properties.balconies=this.balconies;
    this.properties.carpetArea=this.carpetArea
    this.properties.areaType=this.areaType;
    this.properties.otherRooms=this.otherRooms;
    this.properties.furnishing=this.furnishing;
    this.properties.totalFloors=this.totalFloors;
    this.properties.propertyFloor=this.selectedFloor;
    this.properties.propertyAge=this.propertyAge;
    this.properties.availabilityDate=this.availableFromDate;
    this.properties.willingType=this.willing;
    this.properties.parking=this.parking;
       
    this.properties.expectedRent=this.expectedRent;
    this.properties.expecteddeposit=this.expectedDeposit;
    this.properties.extraCharge=this.electricWaterExcluded;
    this.properties.priceNegotiable=this.priceNegotiable;
    this.properties.agreementDuration=this.agreementDuration;
    this.properties.noticeTime=this.noticeMonths;
    this.properties.additionalDetails=this.description;
            
    this.properties.photo1=this.selectedImage1;
    this.properties.photo2=this.selectedImage2;
    this.properties.photo3=this.selectedImage3;
    this.properties.photo4=this.selectedImage4;
    this.properties.photo5=this.selectedImage5;

    this._service.propertyUpdate(this.basicDetailsId,this.properties).subscribe(
      response=>
      {
        console.log(response)
        alert("Property Update successfully");  
        this.openSection(3);
      },
      error => {            
          alert("An error occurred while saving Property");           
      }
      );    
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

  getPropertiesByOwnerEmail() {
    const username = localStorage.getItem('username');
    if (username) {
      this._service.getPropertiesByOwnerEmail(username).subscribe(
        (data) => {
          this.propertiesdata = data; // Assign fetched properties to the array
          this.propertiesLoaded = true; // Set flag to indicate properties are loaded       
        },
        (error) => {
          console.error("Error fetching properties:", error);
        }
      );
    } else {
      console.error("Username not found in localStorage");
    }
  }

  selectPropertyId(property: any, option: number) {
    const basicDetailsId = property.basicDetailsId;
    console.log(basicDetailsId);
    this._service.getPropertiesByPropertyId(basicDetailsId).subscribe(
      (data) => {

        this.basicDetailsId = data.basicDetailsId;

        this.subType = data.subType;
        this.specification = data.specification;
        this.type = data.type;

        this.location = data.locality;
        this.city = data.city;        
        this.locality = data.subLocality;
        this.apartment = data.propertyName;
        this.houseNo = data.propertyNo;

        this.bedrooms = data.bedrooms.toString();
        this.bathrooms = data.bathrooms.toString();
        this.balconies = data.balconies.toString();
        this.carpetArea = data.carpetArea;
        this.areaType = data.areaType;
        this.otherRooms = data.otherRooms;
        this.furnishing = data.furnishing;
      
        this.totalFloors = data.totalFloors;
        this.selectedFloor = data.propertyFloor;
        this.propertyAge = data.propertyAge;
        this.availableFromDate = data.availabilityDate;
        this.willing = data.willingType;
        this.parking = data.parking;
              
        this.selectedImages= [data.photo1,data.photo2,data.photo3,data.photo4,data.photo5];
        this.selectedImage1 = data.photo1;
        this.selectedImage2 = data.photo2;
        this.selectedImage3 = data.photo3;
        this.selectedImage4 = data.photo4;
        this.selectedImage5 = data.photo5;
      
        this.expectedRent = data.expectedRent;
        this.expectedDeposit = data.expecteddeposit;
        this.electricWaterExcluded = data.extraCharge;
        this.priceNegotiable = data.priceNegotiable;
        this.agreementDuration = data.agreementDuration;
        this.noticeMonths = data.noticeTime;         
        this.description = data.additionalDetails;

      },
      (error) => {
        console.error("Error fetching property by ID:", error);
      }
    );
    this.option = option;
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

  updateOwnerProfile(){
    if (this.updationForm.invalid ) {
      alert("Please fill out the Updation Form correctly");
      return;
    }
    this.owner.oname = this.updationForm.value.oname;
    this.owner.oemail = localStorage.getItem('username')?.toString();
    this.owner.ocontact = this.updationForm.value.ocontact;
    this.owner.oaddress = this.updationForm.value.oaddress;
    this.owner.opassreq = this.updationForm.value.opassreq;
    this.owner.opassans = this.updationForm.value.opassans;     
    this.owner.photo = this.imageUrl;        
    if (!this.owner.oname || !this.owner.oemail || !this.owner.ocontact || !this.owner.oaddress || !this.owner.opassreq || !this.owner.opassans) {
      alert("Please fill out the Updation Form correctly...");
      return;
    }
   this.Ownerservice.ownerUpdateProfile(this.owner).subscribe(
    response=>
    {
      console.log(response)
      alert("Owner Update Profile successfully");
      this.getAccount();
    },
    error => {    
        alert("An error occurred while Updating owner Profile");         
       
      }    
    );
  }

  changeOwnerPassword() {
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
  
    this.Ownerservice.ownerChangePassword(username, ocpassword).subscribe(
      response => {
        console.log(response);
        if (response && typeof response === 'string' && response.includes('Password updated successfully')) {
          alert("Owner Password Change successfully");
        } else {
          alert("An error occurred while Password Changing");
        }
      },
      error => {        
        alert("Owner Password Change successfully");
      }
    );
  }
  
  
  logout() {
    this.adminService.logout();
    location.reload()
    window.location.href="/"
  }

  getIntrestedTenant(option:number,tenantId:any,property: any){

    const basicDetailsId = property.basicDetailsId;   
    this.getReviewsByPropertyId(basicDetailsId);
    this._service.getPropertiesByPropertyId(basicDetailsId).subscribe(
      (data) => {

        this.basicDetailsId = data.basicDetailsId;

        this.subType = data.subType;
        this.specification = data.specification;
        this.type = data.type;

        this.location = data.locality;
        this.city = data.city;        
        this.locality = data.subLocality;
        this.apartment = data.propertyName;
        this.houseNo = data.propertyNo;

        this.bedrooms = data.bedrooms.toString();
        this.bathrooms = data.bathrooms.toString();
        this.balconies = data.balconies.toString();
        this.carpetArea = data.carpetArea;
        this.areaType = data.areaType;
        this.otherRooms = data.otherRooms;
        this.furnishing = data.furnishing;
      
        this.totalFloors = data.totalFloors;
        this.selectedFloor = data.propertyFloor;
        this.propertyAge = data.propertyAge;
        this.availableFromDate = data.availabilityDate;
        this.willing = data.willingType;
        this.parking = data.parking;
              
        this.selectedImages= [data.photo1,data.photo2,data.photo3,data.photo4,data.photo5];
        this.selectedImage1 = data.photo1;
        this.selectedImage2 = data.photo2;
        this.selectedImage3 = data.photo3;
        this.selectedImage4 = data.photo4;
        this.selectedImage5 = data.photo5;
      
        this.expectedRent = data.expectedRent;
        this.expectedDeposit = data.expecteddeposit;
        this.electricWaterExcluded = data.extraCharge;
        this.priceNegotiable = data.priceNegotiable;
        this.agreementDuration = data.agreementDuration;
        this.noticeMonths = data.noticeTime;         
        this.description = data.additionalDetails;

      },
      (error) => {
        console.error("Error fetching property by ID:", error);
      }
    );

        this._service.getTenantByPropertyId(tenantId).subscribe(
          (data) => {      
            this.tenantData  = data;
            this.openSection(option);
          },
          (error) => {
            alert("Error fetching tenant details");                
          }
        );  
               
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

  getReviewsByPropertyId(id:any){   
    const Propertyid = id;
    if (Propertyid != null) {    
      this.ReviewService.getReviewsByPropertyId(Propertyid).subscribe(
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
              alert("ReviewAdded Successfully"); 
              this.reportMsg =''; 
              this.selectIntrestedTenant(32,againstEmail);         
          },
          (error) => {
            console.log(error);
            
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
            this.selectIntrestedTenant(32,temail);
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
              this.selectIntrestedTenant(32,RecieverEmail);       
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
            this.selectIntrestedTenant(32,temail);
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

  selectIntrestedTenant(option:number,temail:any){

    this.selectedTenantEmail=temail;
    this.TenantService.getTenantProfile(temail).subscribe(
      (data) => {       
        this.selectedTenant = data;
      },
      (error) => {
        alert("Error fetching tenant details");                
      }
    ); 
    
    this.ReportService.getReportsByAgainstEmail(temail).subscribe(
      (data) => {          
        this.reportData = data;
      },
      (error) => {
        alert("Error fetching report details");                
      }
    ); 

    this.MessageService.getAllMessageBySenderAndRecieverEmail(this.currentUser,temail).subscribe(
      (data) => {            
        this.messageData = data;
      },
      (error) => {
        alert("Error fetching message details");                
      }
    ); 

    this.option=option;

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

  getAccount(){    
    const user = localStorage.getItem('username');
    if (user!=null) {
      this.Ownerservice.GetOwnerProfile(user).subscribe(
        response=>
        {
          this.id=response.oid;
          this.contact=response.ocontact;
          this.address=response.oaddress;
          this.userName=response.oname;
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
        this.Ownerservice.deleteOwnerByEmail(user).subscribe(
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

