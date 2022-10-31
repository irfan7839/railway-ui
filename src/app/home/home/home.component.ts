import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitters';
import { TraindataService } from 'src/app/services/traindata.service';
import { UserdataService } from 'src/app/services/userdata.service';


@Component({
  selector: 'home-app',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
 
  searchForm !: FormGroup;
  fairForm!: FormGroup;
  testTrainData:any=[]
  userData!:any;
  @Input() cellsData: any;

  coachList = [{value:"All", viewValue:"ALL Classes"},

]

stationList = [{value:"STM", viewValue:"STM---Sitamarhi JN"},
{value:"HYD", viewValue:"HYD---Hyderabad JN"},
{value:"PNB", viewValue:"PNB---Patna JN"},
{value:"HWR", viewValue:"HWR---Howrah JN"}

]

displayedColumns: string[] = ['trainCode','train_name','date','source_time','dest_time', 'third_ac', 'second_ac', 'first_ac', 'sleeper','fair_sleeper','fair_thirdAc', 'fair_secondAc', 'fair_firstAc','source', 'destination'];
searchClick:boolean=false;
  constructor(private router:Router ,private train:TraindataService, private formBuilder:FormBuilder,private datePipe: DatePipe, private userDetails:UserdataService) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      source : ['', Validators.required],
      dest : ['', Validators.required],
      date : ['', Validators.required],
      coaches : [''],
      

    })

    this.fairForm = this.formBuilder.group({
      fair:['', Validators.required]
    })

    this.getLoogedInUserData()
  
  }

  getLoogedInUserData(){
    this.userDetails.getLoginUserData()
    .subscribe({
      next:(res=>{
        
        Emitters.authEmitter.emit(true)
        this.train.setEmitterData(true)
        this.train.setUserData(res)
        this.userData=res
      }),
      error:err=>{
      
        Emitters.authEmitter.emit(false)
        this.train.setEmitterData(false)

      }
    })
  }



  todayDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');



cellData(data: any) {
  this.cellsData = data;
  this.cellsData.fair = this.fairForm.value.fair;
  this.cellsData.sourCode = this.cellsData.source
  this.cellsData.desCode = this.cellsData.dest
  this.train.setCellData(this.cellsData)
  
  }

    getSearchTrain(){
      this.searchForm.value.date=this.datePipe.transform(this.searchForm.value.date, 'YYYY-MM-dd');
      this.train.postSearchTrainData(this.searchForm.value)
      .subscribe({
        next:(res)=>{
          this.testTrainData=res
          for(let i=0; i<this.testTrainData.length; i++) {
            this.testTrainData[i].fair_sleeper = this.testTrainData[i].distance * 0.20
            this.testTrainData[i].fair_thirdAc = this.testTrainData[i].distance * 0.40
            this.testTrainData[i].fair_secondAc = this.testTrainData[i].distance * 0.60
            this.testTrainData[i].fair_firstAc = this.testTrainData[i].distance * 0.90
          }
          this.searchClick=true
          this.train.setHomeTrainSearchData(this.testTrainData)
          this.router.navigate(['/home/train-list'])
        },
        error:err=>{
          console.log(err)
          alert("Error While Searching Train")
        }
      })
     

    }

 
}

