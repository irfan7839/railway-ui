import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { StationService } from 'src/app/services/admin/station.service';

@Component({
  selector: 'app-dialog-station',
  templateUrl: './dialog-station.component.html',
  styleUrls: ['./dialog-station.component.css']
})
export class DialogStationComponent implements OnInit {

  actionBtn : string = 'Save';
  stationForm !: FormGroup;
  constructor( private formBuilder: FormBuilder, 
    private station: StationService, 
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogStationComponent>) { }

  ngOnInit(): void {
    this.stationForm = this.formBuilder.group({
      station_name : ['', Validators.required],
      station_no : ['', Validators.required],
      state : ['', Validators.required],
      address : ['', Validators.required],

    })

    if(this.editData){
      this.actionBtn = 'Update';
      this.stationForm.controls['station_name'].setValue(this.editData.station_name);
      this.stationForm.controls['station_no'].setValue(this.editData.station_no);
      this.stationForm.controls['state'].setValue(this.editData.state);
      this.stationForm.controls['address'].setValue(this.editData.address);


    }
  }

  addStation(){
   if(!this.editData){
    if(this.stationForm.valid){
      this.station.postStationData(this.stationForm.value)
      .subscribe({
        next:(res)=>{
          alert("Station details added successfully")
          this.stationForm.reset()
          this.dialogRef.close('save');
        },
        error: ()=>{
          alert("Error while adding the product")
        }
      })
    }
   }
   else{
    this.updateStation()
   }
  }
  updateStation(){
    this.station.putStation(this.stationForm.value,this.editData.station_no)
    .subscribe({
      next:(res)=>{
        alert("station details updated successfully");
        this.stationForm.reset();
        this.dialogRef.close('update');
      },
      error: ()=>{
        alert("error while updating the record")
      }
    })
  }
 
}
