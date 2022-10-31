import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { LoginComponent } from './login/login.component';
import { BotDetectCaptchaModule } from 'angular-captcha';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatButtonModule} from '@angular/material/button';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatIconModule} from '@angular/material/icon';
import { PersonalRegisterComponent } from './personal-register/personal-register.component'; 
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatNativeDateModule} from'@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonToggleModule} from '@angular/material/button-toggle'; 
import { ReactiveFormsModule } from '@angular/forms';
import { TrainDetailsComponent } from './train-details/train-details.component';
import {MatTableModule} from '@angular/material/table'; 
import { AgGridModule } from 'ag-grid-angular';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import {MatStepperModule} from '@angular/material/stepper';
import { PaymentSectionComponent } from './payment-section/payment-section.component';
import {MatDialogModule} from '@angular/material/dialog';
import { TicketComponent } from './ticket/ticket.component';
import { DialogComponent } from './dialog/dialog.component';
import { NavComponent } from './nav/nav.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { DialogCancelComponent } from './dialog-cancel/dialog-cancel.component'; 
import { HomeComponent } from './home/home.component';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
// import { HomeComponent } from './home/home.component'; 
import {MatPaginatorModule} from '@angular/material/paginator'; 
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    PersonalRegisterComponent,
    TrainDetailsComponent,
    BookingDetailsComponent,
    PaymentSectionComponent,
    TicketComponent,
    DialogComponent,
    NavComponent,
    BookingHistoryComponent,
    DialogCancelComponent,
    HomeComponent
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    BotDetectCaptchaModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatTableModule,
    AgGridModule,
    MatStepperModule,
    FormsModule,
    MatDialogModule,
    MatExpansionModule,
    MatToolbarModule,
    MatPaginatorModule

    
  ],
  providers: [
    DatePipe,
  ],
})
export class HomeModule { }
