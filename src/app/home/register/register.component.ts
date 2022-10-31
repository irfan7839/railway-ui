import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserdataService } from 'src/app/services/userdata.service';



interface Language {
  value: string;
  viewValue: string;
}

interface Question {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public userdata:any;
  userForm !: FormGroup;
  languages: Language[] = [
    {value: 'english', viewValue: 'English'},
    {value: 'hindi', viewValue: 'Hindi'}
  ];
  genderList = [{value:"M", viewValue:"Male"},
  {value:"F", viewValue:"Female"},
  {value:"T", viewValue:"Transgender"}
]

  questions: Question[] = [
    {value: 'What is your pet name?', viewValue: 'What is your pet name?'},
    {value: 'What is the name of your first school?', viewValue: 'What is the name of your first school?'},
    {value: 'Who is your Childhood hero?', viewValue: 'Who is your Childhood hero?'},
    {value: 'What is your favourite past-time?', viewValue: 'What is your favourite past-time?"'},
    {value: 'What is your all time favourite sports team?', viewValue: 'What is your all time favourite sports team?'},
    {value: 'What is your fathers middle name?', viewValue: 'What is your fathers middle name?'},
    {value: 'Where did you first meet your spouse?', viewValue: 'Where did you first meet your spouse?'},

  ];

  country_list: String[]= ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
  dialogRef: any;
  dataSource!:any;
  errorData!:any;
  constructor(private router: Router , private user:UserdataService, private formBuilder:FormBuilder) { 
    // this.user.postUserData(this.productForm.value)
    // .subscribe({
    //   next:(res)=>{
    //     alert("Product added successfully")
    //     this.productForm.reset()
    //     this.dialogRef.close('save');
    //   },
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      user_id : ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(15)]],
      password : ['', [Validators.required, Validators.minLength(6),Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(15)]],
      security_ques : ['', Validators.required],
      security_ans : ['', Validators.required],
      first_name : ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(15)]],
      last_name : ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(15)]],
      age : ['', Validators.required],
      gender : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      mobile_no : ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
      city : ['', Validators.required],
      state : ['', Validators.required],
      pincode : ['', [Validators.required,Validators.minLength(6),Validators.maxLength(6),Validators.pattern('^[0-9]+$')]],
      adhar_no: ['', [Validators.required,Validators.minLength(16),Validators.maxLength(16),Validators.pattern('^[0-9]+$')]]

    })

  }
get user_id(){
  return this.userForm.get('user_id')
}
get password(){
  return this.userForm.get('password')
}
get first_name(){
  return this.userForm.get('first_name')
}
get last_name(){
  return this.userForm.get('last_name')
}
get email(){
  return this.userForm.get('email')
}
get mobile_no(){
  return this.userForm.get('mobile_no')
}
get pincode(){
  return this.userForm.get('pincode')
}
get adhar_no(){
  return this.userForm.get('adhar_no')
}
  addUser(){
      this.user.postUserData(this.userForm.value)
      .subscribe({
        next:(res)=>{

          if(res.status){
            alert("User registered successfully")
            this.userForm.reset()
            this.errorData = []
            this.router.navigate(['/home/login'])
          }
          else{
            this.errorData = res.data;
            alert(res.message)

          }
       
        },
        error: ()=>{
          alert("Error while adding the product")
        }
      })
    // }
   }
 
   getAllUsers(){
    this.user.getUserData()
    .subscribe({
      next:(res)=>{
        this.dataSource = res.data
      },
      error: ()=>{
        alert('error while fetching the records')
      }
    })

  }



}
