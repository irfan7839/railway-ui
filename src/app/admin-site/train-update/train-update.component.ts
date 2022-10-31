import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router, RouterLinkWithHref } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { TrainService } from 'src/app/services/admin/train.service';
import { Emitters } from 'src/app/emitters/emitters';
import { TraindataService } from 'src/app/services/traindata.service';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-train-update',
  templateUrl: './train-update.component.html',
  styleUrls: ['./train-update.component.css']
})
export class TrainUpdateComponent implements OnInit {

rawData!:any;

  displayedColumns: string[] = ['index','train_name', 'train_no', 'source', 'dest', 'duration_h','duration_m', 'distance', 'source_time', 'dest_time','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  authenticated: any;

  constructor(private user: UserdataService,private router: Router,private dialog: MatDialog, private train: TrainService, private trainUser:TraindataService) {
   

    // Assign the data to the data source for the table to render
    
   }

  ngOnInit(): void {
  this.getLoogedInUserData()
    // this.authenticated = this.trainUser.getAdminEmitterData()
    // if(!this.authenticated){
    //   this.router.navigate(['admin-site/login'])
    // }
    Emitters.authEmitter.subscribe({
      next: (auth: boolean) => {
        this.authenticated = auth
      }
    })
    this.getAllTrains()
  }


  openDialog() {
    this.dialog.open(DialogComponent, {
     width:'36%'
    }).afterClosed().subscribe(() =>{
        this.getAllTrains();
      
    });
  }
  getLoogedInUserData(){
    this.user.getLoginUserData()
    .subscribe({
      next:(res=>{
      }),
      error:err=>{
      
        Emitters.authEmitter.emit(false)
        this.router.navigate(['admin-site/login'])

      }
    })
  }
  getAllTrains(){
    this.train.getTrainData()
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



  editTrain(row:any){
    this.dialog.open(DialogComponent,{
      width:'36%',
      data: row
    }).afterClosed().subscribe(() =>{
        this.getAllTrains()
      
    })
  }

  deleteProduct(id:number){
    this.train.deleteTrain(id)
    .subscribe({
      next:(res)=>{
        alert("train details deleted successfully")
        this.getAllTrains()

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
        this.trainUser.setAdminEmitterData(false)
        this.router.navigate(['/'])
      }
    })
  }
}
