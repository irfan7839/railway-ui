import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TraindataService } from '../services/traindata.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private train: TraindataService, private _router:Router){}
  canActivate(){
    //logic
    if(this.train.getEmitterData()==false){
      this._router.navigate(['/home/'])
      return false
    }
    return true;
  }
  
}
