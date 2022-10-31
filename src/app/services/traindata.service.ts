import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TraindataService {
  cellsData:any[]=[];
  userData!:any;
  auth:boolean=false;

  userUrl:string="http://127.0.0.1:8000/train/"
  searchUrl:string="http://127.0.0.1:8000/search-train/"

  adminAuth: boolean=false;
  testTrainData: any;

  constructor(private http:HttpClient) { }
  postTrainData(data:any){
    return this.http.post<any>(this.userUrl,data)
  }
  getTrainData(){
    return this.http.get<any>(this.userUrl)
  }
  getTrainByIdData(id:number){
    return this.http.get<any>(this.userUrl+id+"/")
  }
  setCellData(data: any) {
    this.cellsData = data;

    
    }
  getCellData(){
    return this.cellsData
  }

  setUserData(data: any) {
    this.userData = data;
 
    
    }
  getUserData(){
    return this.userData
  }

  setEmitterData(data:boolean){
this.auth = data
  }
  getEmitterData(){
    return this.auth
  }

  setAdminEmitterData(data:boolean){
    this.adminAuth = data
      }
      getAdminEmitterData(){
        return this.adminAuth
      }
  postSearchTrainData(data:any){
    return this.http.post<any>(this.searchUrl,data)
  }

  setHomeTrainSearchData(data:any){
   this.testTrainData=data
  }

  getHomeTrainSearchData(){
    return this.testTrainData
   }
}
