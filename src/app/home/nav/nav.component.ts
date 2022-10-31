import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';
import { PassengerDetailsService } from 'src/app/services/passenger-details.service';
import { SeatChartService } from 'src/app/services/seat-chart.service';
import { TicketService } from 'src/app/services/ticket.service';
import { TraindataService } from 'src/app/services/traindata.service';
import { UserdataService } from 'src/app/services/userdata.service';


interface TicketInterface {
  trainNo: any 
  trainName: any 
  source: any  
  dest: any  
  source_time: any 
  dest_time: any 
}

interface TicketInterfaces extends Array<TicketInterface>{
  source: any;
  dest: any;
  trainName: any;
  source_time: any;
  dest_time: any;
  trainNo: any;
}
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})


export class NavComponent implements OnInit {
  authenticated = false
  ticketDetails: any[]=[];
  trainDetails!: TicketInterfaces;

  userId!:any;
  constructor(private ticket: TicketService, private train: TraindataService, private user: UserdataService, private seatChart: SeatChartService, private passenger: PassengerDetailsService ) { }

  ngOnInit(): void {
    this.authenticated = this.train.getEmitterData()
    Emitters.authEmitter.subscribe({
      next: (auth: boolean) => {
        this.authenticated = auth
      }
    })
    
    this.getUserData()
  }

  logout() {
    
    this.user.logoutUser().subscribe({
      next: () => {
        this.authenticated = false
        alert('Logout Succesfully')
      }
    })
  }

  getUserData(){
    this.user.getLoginUserData()
    .subscribe({
      next:(res)=>{
        this.userId=res.user_id
        this.ticket.getTicketData()
        .subscribe({
          next:(res)=>{
            this.ticketDetails = res
            let filter = this.userId;
            this.ticketDetails = this.ticketDetails.filter((obj:any) => obj.user == filter )  
           
           } 
    })
      }
    })
  }
 

}
