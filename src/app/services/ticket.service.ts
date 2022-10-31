import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  ticketsData:any[]=[];
  userTicket!:any;
  passId:any[]=[];
  totalFair:number=0;
  cellTicketId:any;
  trainData!:any;
  ticketId!:any;
  userUrl:string="http://127.0.0.1:8000/ticket/"
  cancelUrl:string="http://127.0.0.1:8000/cancel-ticket/"
  userTicketSeat: any;

  constructor(private http:HttpClient) { }
  postTicketData(data:any){
    return this.http.post<any>(this.userUrl,data)
  }
  postCancelTicketData(data:any){
    return this.http.post<any>(this.cancelUrl,data)
  }
  getTicketData(){
    return this.http.get<any>(this.userUrl)
  }

  getTicketByIdData(id:number){
    return this.http.get<any>(this.userUrl+id+"/")
  }

  setBookedTicketData(data: any) {
    this.ticketsData = data;
    }
  getBookedTicketData(){
    return this. ticketsData
  }

  setPassIdData(data: any) {
    this. passId = data;
    }
  getPassIdData(){
    return this. passId
  }

  setTotalFair(data: any) {
    this.totalFair = data;
    
    }
  getTotalFair(){
    return this.totalFair
  }

  setTicket(data: any) {
    this.trainData = data;
    
    }
  getTicket(){
    return this.trainData
  }

  setUserBookedTicket(data: any) {
    this.userTicket = data;
    
    }
  getUserBookedTicket(){
    return this.userTicket

  }
  setUserTicketSeat(data: any) {
    this.userTicketSeat = data;
    
    }
  getUserTicketSeat(){
    return this.userTicketSeat

  }

  setCellTicketId(data:any){
    this.cellTicketId = data;

  }
  getCellTicketId(){
    return this.cellTicketId
  }

  setTicketId(data:any){
    this.ticketId = data;

  }
  getTicketId(){
    return this.ticketId
  }
}
