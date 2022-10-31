import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  userRegisterUrl:string="http://127.0.0.1:8000/register/"
  userLoginUrl:string="http://127.0.0.1:8000/login/"
  userUrl:string="http://127.0.0.1:8000/login-user/"
  logoutUrl:string="http://127.0.0.1:8000/logout/";
  token:string="";
  user!:any;

  constructor(private http:HttpClient) { }
  postUserData(data:any){
    return this.http.post<any>(this.userRegisterUrl,data)
  }
  getUserData(){
    return this.http.get<any>(this.userRegisterUrl)
  }
  getUserByIdData(id:string){
    return this.http.get<any>(this.userUrl + id)
  }
  postLoginData(data:any){
    return this.http.post<any>(this.userLoginUrl,data,
    { observe:'response',withCredentials: true }
      )
    // .shareReplay();
  }

  getLoginUserData(){
    return this.http.get<any>("http://127.0.0.1:8000/login-user/",{withCredentials: true })
  }


  logoutUser(){
    return this.http.post<any>(this.logoutUrl,"",{ withCredentials: true })
  }


  setUserIdData(data: any) {
    this.user = data;
    
    }
  getUserIdData(){
    return this.user
  }


}
