import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StationService {

stationUrl:string="http://127.0.0.1:8000/station/"
constructor(private _http:HttpClient) { }
postStationData(data:any){
  return this._http.post<any>(this.stationUrl,data)
}
getStationData(){
  return this._http.get<any>(this.stationUrl)
}
putStation(data: any, id: number){
  return this._http.put<any>(this.stationUrl+id+"/", data)
}

deleteStation(id: number){
  return this._http.delete<any>(this.stationUrl+id+"/")
}
}
