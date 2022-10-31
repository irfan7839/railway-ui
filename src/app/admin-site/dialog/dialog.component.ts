
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { StationService } from 'src/app/services/admin/station.service';
import { TrainService } from 'src/app/services/admin/train.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  stationUrl:string="http://127.0.0.1:8000/station/";
  trainUrl:string="http://127.0.0.1:8000/train/";
  
  actionBtn : string = 'Save';
  rawStationData!:any;
  trainForm !: FormGroup;
  trainUpdateForm!:any;
  rowData!:any;
  constructor( private formBuilder: FormBuilder, 
    private train: TrainService, 
    private station:StationService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.getAllStations()
    this.trainForm = this.formBuilder.group({
      train_name : ['', Validators.required],
      train_no : ['', Validators.required],
      source : ['', Validators.required],
      dest : ['', Validators.required],
      duration_h : ['', Validators.required],
      duration_m : ['', Validators.required],
      distance : ['', Validators.required],
      source_time : ['', Validators.required],
      dest_time : ['', Validators.required],

    })

    if(this.editData){
      this.actionBtn = 'Update';
      this.trainForm.controls['train_name'].setValue(this.editData.train_name);
      this.trainForm.controls['train_no'].setValue(this.editData.url);
      this.trainForm.controls['source'].setValue(this.editData.source);
      this.trainForm.controls['dest'].setValue(this.editData.dest);
      this.trainForm.controls['duration_h'].setValue(this.editData.durationHour);
      this.trainForm.controls['duration_m'].setValue(this.editData.durationMin);
      this.trainForm.controls['distance'].setValue(this.editData.distance);
      this.trainForm.controls['source_time'].setValue(this.editData.sourceTime);
      this.trainForm.controls['dest_time'].setValue(this.editData.destTime);


    }

    
  }

  addTrain(){
   if(!this.editData){
 
    if(this.trainForm.valid){
      this.train.postTrainData(this.trainForm.value)
      .subscribe({
        next:(res)=>{
          alert("Train added successfully")
          this.trainForm.reset()
          this.dialogRef.close('save');
        },
        error: ()=>{
          alert("Error while adding the train")
        }
      })
    }
   }
   else{
    this.updateTrain()
   }
  }
  updateTrain(){
    this.train.putTrain(this.trainForm.value,this.editData.train_no)
    .subscribe({
      next:(res)=>{
        alert("train updated successfully");
        this.trainForm.reset();
        this.dialogRef.close('update');
      },
      error: ()=>{
        alert("error while updating the record")
      }
    })
  }
  getAllStations(){
    this.station.getStationData()
    .subscribe({
      next:(res)=>{
        this.rawStationData=res
      },
      error: ()=>{
        alert('error while fetching the records')
      }
    })

  }
}

