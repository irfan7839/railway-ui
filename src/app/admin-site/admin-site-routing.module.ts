import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from './admin-auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ScheduleUpdateComponent } from './schedule-update/schedule-update.component';
import { StationUpdateComponent } from './station-update/station-update.component';
import { TrainUpdateComponent } from './train-update/train-update.component';

const routes: Routes = [
  {path:'train-update', component:TrainUpdateComponent},
  {path:'station-update', component:StationUpdateComponent},
  {path:'schedule-update', component:ScheduleUpdateComponent},
  {path:'login', component:LoginComponent},
  {path:'dashboard', component:DashboardComponent},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSiteRoutingModule { }
