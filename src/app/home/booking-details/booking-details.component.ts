import { Component, OnInit,Input } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import { SeatChart, SeatDetails } from 'src/app/interfaces/trainDetails';
import {TraindataService} from '../../services/traindata.service'
import { passenger } from 'src/app/interfaces/models';
import { PassengerDetailsService } from 'src/app/services/passenger-details.service';
import { SeatChartService } from 'src/app/services/seat-chart.service';
import { TicketService } from 'src/app/services/ticket.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
  passenger = new passenger()
  trainInfo!:any;
  passId:string[]=[];
  no_of_pass!:any;
  passArray:any[]=[];
  errorData!: any;
  @Input() seatInfo!:any;
  userData!:any;
  ticketData!:any;


  coachList = [
  {value:"Sleeper", viewValue:"Sleeper"},
  {value:"1A", viewValue:"AC First Class(1A)"},
  {value:"2A", viewValue:"AC SECOND Class(2A)"},
  {value:"3A", viewValue:"AC THIRD Class(3A)"},

]
  genderList = [{value:"M", viewValue:"Male"},
  {value:"F", viewValue:"Female"},
  {value:"T", viewValue:"Transgender"}
]

  constructor(private router: Router,private dialog: MatDialog,private formBuilder: FormBuilder, private train: TraindataService, private passengers: PassengerDetailsService, private seatChart: SeatChartService, private ticket: TicketService, private user:UserdataService) {
    this.trainInfo= this.train.getCellData()
  }

  ngOnInit(): void {
    this.userData=this.user.getUserData()
    if(this.trainInfo.length == 0){
      this.router.navigate(['/home/'])
  }
  this.passenger = new passenger()
  this.passArray.push(this.passenger)
}


openDialog() {
  this.dialog.open(DialogComponent, {
   width:'36%'
   
  }).afterClosed().subscribe(() =>{
 
  
});
}
 
onSubmit(){
  this.openDialog()
  this.getSingleSeatChart()
  this.addPassenger()
  this.ticket.setTicket(this.trainInfo)

}

addForm(){
  this.passenger = new passenger()
  this.passArray.push(this.passenger)
}

removeForm(index:any){
  this.passArray.splice(index)
}

addPassenger(){

this.passArray.forEach(element =>{ 

  this.passengers.postPassengerData(element)
  .subscribe({
    next:(res)=>{
        this.passId.push(res.passenger_id)
        this.trainInfo.passLength=this.passId.length
        this.passengers.setTotalPassenger(this.passId.length)
      if(res.status){
              element.reset()
              this.errorData = []
            }
            else{
              this.errorData = res.data;
            
            }
         
          },
          error: ()=>{
            alert("Error while adding the passenger")
          }
          
    })
});
this.trainInfo.passId=this.passId
this.trainInfo.no_of_tickets=this.passId.length
this.no_of_pass = this.passId.length

this.ticket.setPassIdData(this.passId)
this.getSingleSeatChart()

 }
getSingleSeatChart(){
  this.seatChart.getSingleSeatChartData(this.trainInfo.seat_id)
  .subscribe({
    next:(res)=>{

      this.seatInfo=res

      this.ticket.setBookedTicketData(this.seatInfo)

   
    },
    error: ()=>{
      alert("error while updating the record")
    }
  })
 
  
}
 updateSeatChart(){



  if(this.trainInfo.fair== this.trainInfo.distance * 0.2){
    this.seatInfo.sleeper = this.trainInfo.sleeper - this.passId.length
  }
  if(this.trainInfo.fair== this.trainInfo.distance * 0.4){
    this.seatInfo.third_ac = this.trainInfo.third_ac - this.passId.length
  }
  else if(this.trainInfo.fair== this.trainInfo.distance * 0.6){
    this.seatInfo.second_ac = this.trainInfo.second_ac - this.passId.length
  }
  else if(this.trainInfo.fair== this.trainInfo.distance * 0.9){
    this.seatInfo.first_ac = this.trainInfo.first_ac - this.passId.length
  }
  this.seatChart.updateSeatChartData(this.seatInfo,this.trainInfo.url)
  .subscribe({
    next:(res)=>{
      alert("seat-chart updated successfully");
    },
    error: ()=>{
      alert("error while updating the record")
    }
  })
 }

 ticketPostData(){
  
  this.ticketData.date = this.trainInfo.date
  this.ticketData.train=this.trainInfo.train
  this.ticketData.passId=this.trainInfo.passId
  let seat:string[]=[];
  let seatNo:string=""
  if(this.trainInfo.fair==this.trainInfo.distance*0.2){
    this.ticketData.type="sleeper"
    for(let i=0; i<this.trainInfo.passId.length;i++){
      seat.push("S"+(501-this.trainInfo.sleeper)+i)
    }
  }
  else if(this.trainInfo.fair==this.trainInfo.distance*0.4){
    this.ticketData.type="3rd_ac"
    for(let i=0; i<this.trainInfo.passId.length;i++){
      seat.push("3A"+(301-this.trainInfo.third_ac)+i)
    }
  }
  else if(this.trainInfo.fair==this.trainInfo.distance*0.6){
    this.ticketData.type="2nd_ac"
    for(let i=0; i<this.trainInfo.passId.length;i++){
      seat.push("2A"+(301-this.trainInfo.second_ac)+i)
    }
  }
  else if(this.trainInfo.fair==this.trainInfo.distance*0.9){
    this.ticketData.type="1st_ac"
    for(let i=0; i<this.trainInfo.passId.length;i++){
      seat.push("1A"+(201-this.trainInfo.first_ac)+i)
    }
  }
  this.ticketData.chart = this.trainInfo.url
  this.ticketData.user = "http://127.0.0.1:8000/login-user/"+this.userData.user_id+"/"
  this.ticketData.fair=this.trainInfo.fair*this.passId.length
 for(let i=0;i<seat.length;i++){
  seatNo+=seat[i]
 }
 
 this.ticketData.seat=seatNo

  
 }

 backBtn(){
  this.router.navigate(['/home/'])
}
 
}
