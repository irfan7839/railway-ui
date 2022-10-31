import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
rowData!:any;
trainUrl:string="http://127.0.0.1:8000/train/"
  constructor(private _http:HttpClient) { }
  postTrainData(data:any){
    return this._http.post<any>(this.trainUrl,data)
  }
  getTrainData(){
    return this._http.get<any>(this.trainUrl)
  }
  putTrain(data: any, id: number){
    return this._http.put<any>(this.trainUrl+id+"/", data)
  }

  deleteTrain(id: number){
    return this._http.delete<any>(this.trainUrl+id+"/")
  }
  getHistory(name:string){
    return this._http.get<any>("http://127.0.0.1:8000/tickets/"+name)
  }
  getRecentTicket(name:string){
    return this._http.get<any>("http://127.0.0.1:8000/recent-tickets/"+name)
  }
}
