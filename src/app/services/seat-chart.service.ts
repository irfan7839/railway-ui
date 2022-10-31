import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeatChartService {

  userUrl:string="http://127.0.0.1:8000/seat-chart/"

  constructor(private http:HttpClient) { }
  postSeatChartData(data:any){
    return this.http.post<any>(this.userUrl,data)
  }
  getSeatChartData(){
    return this.http.get<any>(this.userUrl)
  }
 getSingleSeatChartData(id:number){
  return this.http.get<any>(this.userUrl+id+"/")
 }
  updateSeatChartData( id: number,data: any){
    return this.http.put<any>(this.userUrl + id+"/", data)
  }
}
