import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TraindataService } from '../services/traindata.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private train: TraindataService, private _router:Router){}
  canActivate(){
    //logic
    if(this.train.getAdminEmitterData()==false){
      this._router.navigate(['/admin-site/dashboard'])
      return false
    }
    return true;
  }
  
}
