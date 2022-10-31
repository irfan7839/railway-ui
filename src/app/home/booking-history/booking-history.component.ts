import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { TrainService } from 'src/app/services/admin/train.service';
import { PassengerDetailsService } from 'src/app/services/passenger-details.service';
import { SeatChartService } from 'src/app/services/seat-chart.service';
import { TicketService } from 'src/app/services/ticket.service';
import { TraindataService } from 'src/app/services/traindata.service';
import { UserdataService } from 'src/app/services/userdata.service';
import { DialogCancelComponent } from '../dialog-cancel/dialog-cancel.component';
import { TicketComponent } from '../ticket/ticket.component';


@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {
userId!:any;
@ViewChild(MatPaginator) paginator!: MatPaginator;
upcomingTicketData!:any;
completedTicketData!:any;
ticketInfo!:any;
panelOpenState = false;
ticketId!:any;
todayDate:any=this.datePipe.transform(new Date(), 'yyyy-MM-dd');

displayedColumns: string[] = ['upcomingTicketData'];
  dataSource = this.upcomingTicketData;

  displayedColumns1: string[] = ['completedTicketData'];
  dataSource1 = this.completedTicketData;
  
  constructor(private dialog: MatDialog,private datePipe: DatePipe,private router:Router,private ticket: TicketService, private train: TraindataService, private user: UserdataService, private seatChart: SeatChartService, private passenger: PassengerDetailsService, private adminTrain: TrainService ) { }


  openDialog() {
    this.dialog.open(DialogCancelComponent, {
     width:'36%'
     
    }).afterClosed().subscribe(() =>{
      this.adminTrain.getHistory(this.userId)
      .subscribe(data=>{
        this.ticketInfo=data
        this.upcomingTicketData=data.filter((obj:any) => obj.date >= this.todayDate)
        this.completedTicketData=data.filter((obj:any) => obj.date < this.todayDate)
        this.ticketId=this.ticketInfo.id
      })
    
  });
  }
  ngOnInit(): void {
   
    this.getUserData()
   
  }

  getUserData(){
    this.user.getLoginUserData()
    .subscribe({
      next:(res)=>{
        this.userId=res.user_id

        this.adminTrain.getHistory(this.userId)
        .subscribe(data=>{
          this.ticketInfo=data
          this.upcomingTicketData=data.filter((obj:any) => obj.date >= this.todayDate)
          this.completedTicketData=data.filter((obj:any) => obj.date < this.todayDate)
          this.ticketId=this.ticketInfo.id
          this.dataSource.paginator = this.paginator
        })
      }
    })
  }
 
  backBtn(){
    this.router.navigate(['/home/'])
  }
getCellTicketId(id:any){
  this.openDialog()
  this.ticketId=id
  this.ticket.setCellTicketId(id)
}

}

