import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path:'home',loadChildren:()=>
import('./home/home.module').then(m=>m.HomeModule) 
},
{path:'admin-site',loadChildren:()=>
import('./admin-site/admin-site.module').then(m=>m.AdminSiteModule) 
},
{path:'',component:MainComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
