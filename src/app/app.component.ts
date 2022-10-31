import { Component } from '@angular/core';
import { TraindataService } from './services/traindata.service';
import { UserdataService } from './services/userdata.service';
import {UserInterface} from './interfaces/models'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'railway-ui';
  token:string="";
  userData!:UserInterface;
  constructor(private train: TraindataService, private user:UserdataService){

  }
  ngOnInit(): void {
    
  }


  getUserData(){
    this.userData = this.train.getUserData()
  
  }
}
