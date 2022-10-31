import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TrainService } from 'src/app/services/admin/train.service';
import { TicketService } from 'src/app/services/ticket.service';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-dialog-cancel',
  templateUrl: './dialog-cancel.component.html',
  styleUrls: ['./dialog-cancel.component.css']
})
export class DialogCancelComponent implements OnInit {
userId!:any;
ticketInfo!:any;
cellticketId!:any;
  constructor( private ticket: TicketService,private adminTrain: TrainService,private user: UserdataService,private dialogRef: MatDialogRef<DialogCancelComponent>,@Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.getUserData()
    this.cellticketId=this.ticket.getCellTicketId()
  }

  getUserData(){
    this.user.getLoginUserData()
    .subscribe({
      next:(res)=>{
        this.userId=res.user_id
    this.adminTrain.getHistory(this.userId)
    .subscribe(data=>{
      this.ticketInfo=data
    })

      }
    })
  }

  cancelTicket(){
    let data={
      "user_id":this.userId,
      "ticket_id":this.cellticketId
    }
    this.ticket.postCancelTicketData(data).subscribe(data=> this.adminTrain.getHistory(this.userId)
    .subscribe(data=>{
      this.ticketInfo=data
    })
    
)
this.adminTrain.getHistory(this.userId);
this.dialogRef.close('update');
  }

}
