import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduledataService {

  userUrl:string="http://127.0.0.1:8000/schedule/"

  constructor(private http:HttpClient) { }
  postScheduleData(data:any){
    return this.http.post<any>(this.userUrl,data)
  }
  getScheduleData(){
    return this.http.get<any>(this.userUrl)
  }
}
