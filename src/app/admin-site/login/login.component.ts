import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TraindataService } from 'src/app/services/traindata.service';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userdata:any;
  loginForm !: FormGroup;
  dataSource!:any;
  errorData!:any;

  constructor(private train:TraindataService,private router: Router,private user:UserdataService, private formBuilder:FormBuilder) { }

 
  ngOnInit(): void {
  
this.getLoogedInUserData()
    this.loginForm = this.formBuilder.group({
      user_id : ['', Validators.required],
      password : ['', Validators.required],
    })



}



loginUser(){
    this.user.postLoginData(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        this.user.getLoginUserData().subscribe({
          next:(res)=>{
            let user = res
            if(user.role=="Admin"){
              this.train.setAdminEmitterData(true)
              this.router.navigate(['/admin-site/dashboard'])
            } else{
              alert("User Not Found")
            }
          }
        })

        
        
      
      },
      error: (err)=>{
        alert(err.error.detail)
      }
    })
  
  }

  getLoogedInUserData(){
    this.user.getLoginUserData()
    .subscribe({
      next:(res=>{
        this.router.navigate(['admin-site/dashboard'])
      }),
      error:err=>{
      
        this.router.navigate(['admin-site/login'])

      }
    })
  }
}
