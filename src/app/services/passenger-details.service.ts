import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassengerDetailsService {

  userUrl:string="http://127.0.0.1:8000/passenger/"
  totalPass: any;

  constructor(private http:HttpClient) { }
  postPassengerData(data:any){
    return this.http.post<any>(this.userUrl,data)
  }
  getPassengerData(){
    return this.http.get<any>(this.userUrl)
  }

  getPassengerByIdData(id:number){
    return this.http.get<any>(this.userUrl + id+ "/")
  }

  getTotalPassenger(){
    return this.totalPass
  }
  setTotalPassenger(data:any){
    this.totalPass=data
  }
}
