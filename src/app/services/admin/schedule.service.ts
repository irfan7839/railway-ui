import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  scheduleUrl:string="http://127.0.0.1:8000/seat-chart/"
  constructor(private _http:HttpClient) { }
  postScheduleData(data:any){
    return this._http.post<any>(this.scheduleUrl,data)
  }
  getScheduleData(){
    return this._http.get<any>(this.scheduleUrl)
  }
  putSchedule(data: any, id: number){
    return this._http.put<any>(this.scheduleUrl+id+"/", data)
  }
  
  deleteSchedule(id: number){
    return this._http.delete<any>(this.scheduleUrl+id+"/")
  }
}
