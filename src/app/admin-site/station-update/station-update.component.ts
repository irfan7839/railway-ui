import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router, RouterLinkWithHref } from '@angular/router';
import { TrainService } from 'src/app/services/admin/train.service';
import { StationService } from 'src/app/services/admin/station.service';
import { DialogStationComponent } from '../dialog-station/dialog-station.component';
import { Emitters } from 'src/app/emitters/emitters';
import { UserdataService } from 'src/app/services/userdata.service';
import { TraindataService } from 'src/app/services/traindata.service';
import { UserInterface } from 'src/app/interfaces/models';

@Component({
  selector: 'app-station-update',
  templateUrl: './station-update.component.html',
  styleUrls: ['./station-update.component.css']
})
export class StationUpdateComponent implements OnInit {

  rawData!:any;

  displayedColumns: string[] = ['index','station_name','stationNo', 'state', 'address', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  authenticated: any;
  userData!: UserInterface;

  constructor(private user: UserdataService,private train:TraindataService,private router: Router, private dialog: MatDialog, private station: StationService) {
   

    // Assign the data to the data source for the table to render
    
   }

  ngOnInit(): void { this.authenticated = this.train.getAdminEmitterData()
    // if(!this.authenticated){
    //   this.router.navigate(['admin-site/login'])
    // }
    this.getLoogedInUserData()
    Emitters.authEmitter.subscribe({
      next: (auth: boolean) => {
        this.authenticated = auth
      }
    })
    this.getAllStations()
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

  openDialog() {
    this.dialog.open(DialogStationComponent, {
     width:'36%'
    }).afterClosed().subscribe(() =>{
        this.getAllStations();
      
    });
  }

  getAllStations(){
    this.station.getStationData()
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



  editStation(row:any){
    this.dialog.open(DialogStationComponent,{
      width:'36%',
      data: row
    }).afterClosed().subscribe(() =>{
        this.getAllStations()
      
    })
  }

  deleteStation(id:number){
    this.station.deleteStation(id)
    .subscribe({
      next:(res)=>{
        alert("product deleted successfully")
        this.getAllStations()

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
