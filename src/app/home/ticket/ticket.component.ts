import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitters';
import { TrainDetails } from 'src/app/interfaces/trainDetails';
import { TrainService } from 'src/app/services/admin/train.service';
import { PassengerDetailsService } from 'src/app/services/passenger-details.service';
import { SeatChartService } from 'src/app/services/seat-chart.service';
import { TicketService } from 'src/app/services/ticket.service';
import { TraindataService } from 'src/app/services/traindata.service';
import { UserdataService } from 'src/app/services/userdata.service';

export interface PassElement {
  name: string;
  age: number;
  gender: string;
  
}


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})

export class TicketComponent implements OnInit {
  seatInfo!:any;
  ticketInfo!:any;
  totalFair!:any;
  passData:PassElement[]=[];
  userData!:any;
  seatNo!:any;
  tickets:any;
  ticketId!:any;
  constructor(private user:UserdataService ,private passenger: PassengerDetailsService, private train: TraindataService, private seat: SeatChartService ,private ticket: TicketService, private router: Router,private adminTrain:TrainService) { }

  ngOnInit(): void {
    this.getLoogedInUserData()

}

getLoogedInUserData(){
  this.user.getLoginUserData()
  .subscribe({
    next:(res=>{
      

      Emitters.authEmitter.emit(true)
      this.train.setEmitterData(true)
      this.train.setUserData(res)
      this.userData=res
 
      this.getTicketDetails()
    }),
    error:err=>{
      Emitters.authEmitter.emit(false)
    
      this.train.setEmitterData(false)
    this.router.navigate(['/home/'])

    }
  })

}


getTicketById(){
  this.ticket.getTicketByIdData(this.ticketId)
  .subscribe({
    next:(res)=>{
      this.ticketInfo.seats=res.seats.slice(0,res.seats.length-1)
    }
  })
}
  displayedColumns: string[] = [ 'name', 'age', 'gender'];
  dataSource = this.passData;

  backBtn(){
    this.router.navigate(['/home/'])
  }

  getTicketDetails(){
    let pass: any[]=[]
    this.adminTrain.getRecentTicket(this.userData?.user_id)
    .subscribe({
      next:(res)=>{
        this.ticketInfo=res
        this.ticketInfo.totalFair=parseInt(this.ticketInfo.fare)*this.ticketInfo.p_id.length
      }
    })
  }
}
