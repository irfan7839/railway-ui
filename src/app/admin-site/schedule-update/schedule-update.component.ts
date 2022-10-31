import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterConfigOptions } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitters';
import { UserInterface } from 'src/app/interfaces/models';
import { ScheduleService } from 'src/app/services/admin/schedule.service';
import { TraindataService } from 'src/app/services/traindata.service';
import { UserdataService } from 'src/app/services/userdata.service';
import { DialogScheduleComponent } from '../dialog-schedule/dialog-schedule.component';

@Component({
  selector: 'app-schedule-update',
  templateUrl: './schedule-update.component.html',
  styleUrls: ['./schedule-update.component.css']
})
export class ScheduleUpdateComponent implements OnInit {

 
  rawData!:any;
  

  displayedColumns: string[] = ['index','train','first_ac', 'second_ac', 'third_ac','sleeper','date', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  authenticated: any;
  userData!: UserInterface;

  constructor(private user:UserdataService,private train: TraindataService,private router: Router,private dialog: MatDialog, private schedule: ScheduleService) {
   

    // Assign the data to the data source for the table to render
    
   }

  ngOnInit(): void {
    this.getLoogedInUserData()
  
    // if(!this.authenticated){
    //   this.router.navigate(['admin-site/login'])
    // }
    Emitters.authEmitter.subscribe({
      next: (auth: boolean) => {
        this.authenticated = auth
      }
    })
    this.getAllSchedule()
  }


  openDialog() {
    this.dialog.open(DialogScheduleComponent, {
     width:'36%'
    }).afterClosed().subscribe(() =>{
        this.getAllSchedule();
      
    });
  }

  getAllSchedule(){
    this.schedule.getScheduleData()
    .subscribe({
      next:(res)=>{
        this.rawData=res
        for(let i=0;i<res.length;i++){
          res[i].index=i+1
          

        }
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort

      },
      error: ()=>{
        alert('error while fetching the records')
      }
    })

  }

  getLoogedInUserData(){
    this.user.getLoginUserData()
    .subscribe({
      next:(res=>{
        
        Emitters.authEmitter.emit(true)
        this.train.setAdminEmitterData(true)
      this.authenticated = this.train.getAdminEmitterData()
        this.train.setUserData(res)
        this.userData=res
      }),
      error:err=>{
      
        Emitters.authEmitter.emit(false)
        this.router.navigate(['admin-site/login'])

      }
    })
  }


  editSchedule(row:any){
    this.dialog.open(DialogScheduleComponent,{
      width:'36%',
      data: row
    }).afterClosed().subscribe(() =>{
        this.getAllSchedule()
      
    })
   
  }

  deleteSchedule(id:number){
    this.schedule.deleteSchedule(id)
    .subscribe({
      next:(res)=>{
        alert("schedule details deleted successfully")
        this.getAllSchedule()

      },
      error:()=>{
        alert("error while deleting the record")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  backBtn(){
    this.router.navigate(['/admin-site/dashboard'])
  }
  logout() {
    
    this.user.logoutUser().subscribe({
      next: () =>{ this.authenticated = false
        this.train.setAdminEmitterData(false)
        this.router.navigate(['/'])
      }
    })
  }
}
