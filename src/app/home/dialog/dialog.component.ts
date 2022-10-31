import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/interfaces/trainDetails';
import { PassengerDetailsService } from 'src/app/services/passenger-details.service';
import { PaymentService } from 'src/app/services/payment.service';
import { SeatChartService } from 'src/app/services/seat-chart.service';
import { TicketService } from 'src/app/services/ticket.service';
import { TraindataService } from 'src/app/services/traindata.service';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  rzp1!:any;
ticketInfo!:any;
trainInfo!:any;
bookedTicketInfo!:any;
errorData!: any;
userData!:any;
totalFair!:any;
totalFair1!:any;

ticketSeatId!:number;
passId:any[]=[]
  constructor( private passengers:PassengerDetailsService,private payment: PaymentService,private user: UserdataService,private router:Router, private seatChart: SeatChartService,private train:TraindataService,private ticket: TicketService ,@Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>) {
      this.trainInfo= this.train.getCellData()
      this.passId= this.ticket.getPassIdData()

      }

  ngOnInit(): void {
    this.userData=this.train.getUserData()
    this.bookedTicketInfo=this.ticket.getBookedTicketData()
  }

updateTicketData(){
this.dialogRef.close('update');
this.ticketInfo = this.ticket.getBookedTicketData()
this.totalFair1=this.trainInfo.fair*this.trainInfo?.passLength*100
this.updateSeatChart()
this.pay()


}

 updateSeatChart(){
    if(this.trainInfo.fair== this.trainInfo.distance * 0.2){
      this.ticketInfo.sleeper = this.trainInfo.sleeper - this.trainInfo.passId.length
    }
    if(this.trainInfo.fair== this.trainInfo.distance * 0.4){
      this.ticketInfo.third_ac = this.trainInfo.third_ac - this.trainInfo.passId.length
    }
    else if(this.trainInfo.fair== this.trainInfo.distance * 0.6){
      this.ticketInfo.second_ac = this.trainInfo.second_ac - this.trainInfo.passId.length
    }
    else if(this.trainInfo.fair== this.trainInfo.distance * 0.9){
      this.ticketInfo.first_ac = this.trainInfo.first_ac - this.trainInfo.passId.length
    }



    this.seatChart.updateSeatChartData(this.trainInfo.seat_id,this.ticketInfo)
    .subscribe({
      next:(res)=>{
        this.dialogRef.close('update');
      },
      error: ()=>{
        alert("error while updating the record")
      }
    })
   }

     options = {
      "key": "rzp_test_7HdkaZ1xFGPomB", 
      "currency": "INR",
      "name": "Acme Corp",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": "", 
      "handler":(response: { post:any })=>{
        // location.href = 'home/ticket';
        alert("payment Successfull");
        let date = this.ticketInfo.date
      let train=this.trainInfo.train_no
      let passenger=this.trainInfo.passId
      let type=""
      let seat:string[]=[];
      let seatNo:string=""
      if(this.trainInfo.fair==this.trainInfo.distance*0.2){
        type="sl"
        for(let i=0; i<this.trainInfo.passId.length;i++){
          seat.push("S"+((501-this.trainInfo.sleeper)+i)+",")
        }
      }
      else if(this.trainInfo.fair==this.trainInfo.distance*0.4){
        type="3A"
        for(let i=0; i<this.trainInfo.passId.length;i++){
          seat.push("3A"+((301-this.trainInfo.third_ac)+i)+",")
        }
      }
      else if(this.trainInfo.fair==this.trainInfo.distance*0.6){
        type="2A"
        for(let i=0; i<this.trainInfo.passId.length;i++){
          seat.push("2A"+((301-this.trainInfo.second_ac)+i)+",")
        }
      }
      else if(this.trainInfo.fair==this.trainInfo.distance*0.9){
        type="1A"
        for(let i=0; i<this.trainInfo.passId.length;i++){
          seat.push("1A"+((201-this.trainInfo.first_ac)+i)+",")
        }
      }
      let chart = this.trainInfo.seat_id
      let user =this.userData.user_id
      this.totalFair=this.trainInfo.fair*this.trainInfo.passId.length
     for(let i=0;i<seat.length;i++){
      seatNo+=seat[i]
     }
     
      let seats=seatNo
      let data:any ={}
      data.date =date
      data.passenger = passenger
      data.type =type
      data.train=train
      data.chart=chart
      data.user=user
      data.fare=this.totalFair
      data.seats=seats
      this.ticket.postTicketData(data)
      .subscribe({
        next:(res)=>{
          this.ticket.setTicketId(res)
          this.ticketSeatId=res.seats
          this.ticket.setUserTicketSeat(this.ticketSeatId)
          this.dialogRef.close('update');
         location.href = 'home/ticket';


          if(res.status){
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
    

          
          
      },
      "amount":1000,
      redirect: true,
      "prefill": {
          "name": "Md Irfan",
          "email": "irfan@example.com",
          "contact": "9999999999"
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
  };
  
  pay(){
    this.options.amount=this.totalFair1
     this.rzp1 = new this.payment.nativeWindow.Razorpay(this.options);
        this.rzp1.open();
       
  }
     
}
