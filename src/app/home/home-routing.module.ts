import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PersonalRegisterComponent } from './personal-register/personal-register.component';
import { RegisterComponent } from './register/register.component';
import { TicketComponent } from './ticket/ticket.component';
import { TrainDetailsComponent } from './train-details/train-details.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'train-list', component:TrainDetailsComponent,canActivate:[AuthGuard]},
  {path:'booking', component:BookingDetailsComponent,
    canActivate:[AuthGuard]},
  {path:'ticket', component:TicketComponent
  
  
 },
  {path:'booking-history', component:BookingHistoryComponent,canActivate:[AuthGuard]},
  {path:'', component:HomeComponent},


  {path:'**', component:PageNotFoundComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
