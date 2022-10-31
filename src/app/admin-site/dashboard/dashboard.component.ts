import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitters';
import { UserInterface } from 'src/app/interfaces/models';
import { TrainService } from 'src/app/services/admin/train.service';
import { TraindataService } from 'src/app/services/traindata.service';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
authenticated:boolean=false;
  userData!: UserInterface;
  constructor(private router: Router,private user: UserdataService, private train: TraindataService) { }

  ngOnInit(): void {
    this.getLoogedInUserData()
    Emitters.authEmitter.subscribe({
      next: (auth: boolean) => {
        this.authenticated = auth
      }
    })

  }

  getLoogedInUserData(){
    this.user.getLoginUserData()
    .subscribe({
      next:(res=>{
        
        Emitters.authEmitter.emit(true)
        this.train.setAdminEmitterData(true)
    this.authenticated = this.train.getAdminEmitterData()
        this.train.setUserData(res)
        this.userData=res
        console.log(typeof this.userData)
        console.log(this.userData)

      }),
      error:err=>{
      
        Emitters.authEmitter.emit(false)
        this.router.navigate(['admin-site/login'])

      }
    })
  }
  logout() {
    
    this.user.logoutUser().subscribe({
      next: () =>{ this.authenticated = false
        this.train.setAdminEmitterData(false)
        this.router.navigate(['/'])
      }
    })
  }

}
