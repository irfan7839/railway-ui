import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AdminSiteRoutingModule } from './admin-site-routing.module';
import { TrainUpdateComponent } from './train-update/train-update.component';
import { DialogComponent } from './dialog/dialog.component';
import { BotDetectCaptchaModule } from 'angular-captcha';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StationUpdateComponent } from './station-update/station-update.component';
import { DialogStationComponent } from './dialog-station/dialog-station.component';
import { DialogScheduleComponent } from './dialog-schedule/dialog-schedule.component';
import { ScheduleUpdateComponent } from './schedule-update/schedule-update.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    TrainUpdateComponent,
    DialogComponent,
    StationUpdateComponent,
    DialogStationComponent,
    DialogScheduleComponent,
    ScheduleUpdateComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdminSiteRoutingModule,
    BotDetectCaptchaModule,
    MatButtonModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    AgGridModule,
    MatStepperModule,
    FormsModule,  
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class AdminSiteModule { }
