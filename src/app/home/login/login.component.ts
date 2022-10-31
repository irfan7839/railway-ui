import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private router: Router,private user:UserdataService, private formBuilder:FormBuilder) { }

 
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      user_id : ['', Validators.required],
      password : ['', Validators.required],
    })



}



loginUser(){
    this.user.postLoginData(this.loginForm.value)
    .subscribe({
      next:(res)=>{

        this.router.navigate(['/home/'])
      
      },
      error: (err)=>{
        alert(err.error.detail)
      }
    })
  
  }


}
