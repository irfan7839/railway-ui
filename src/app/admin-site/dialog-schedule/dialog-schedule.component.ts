import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScheduleService } from 'src/app/services/admin/schedule.service';
import { TrainService } from 'src/app/services/admin/train.service';

@Component({
  selector: 'app-dialog-schedule',
  templateUrl: './dialog-schedule.component.html',
  styleUrls: ['./dialog-schedule.component.css'],
  providers:[DatePipe]
})
export class DialogScheduleComponent implements OnInit {

  todayDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  actionBtn : string = 'Save';
  seatForm !: FormGroup;
  rawData: any;
  rawtrainNo!:any;
  constructor(private train:TrainService, private datePipe: DatePipe,private formBuilder: FormBuilder, 
    private schedule: ScheduleService, 
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogScheduleComponent>) { }

  ngOnInit(): void {
    this.getAllTrains()
    this.seatForm = this.formBuilder.group({
      train : ['', Validators.required],
      first_ac : ['', Validators.required],
      second_ac : ['', Validators.required],
      third_ac : ['', Validators.required],
      sleeper : ['', Validators.required],
      date : ['', Validators.required],



    })

    if(this.editData){
      this.actionBtn = 'Update';
      this.seatForm.controls['train'].setValue(this.editData.train);
      this.seatForm.controls['first_ac'].setValue(this.editData.first_ac);
      this.seatForm.controls['second_ac'].setValue(this.editData.second_ac);
      this.seatForm.controls['third_ac'].setValue(this.editData.third_ac);
      this.seatForm.controls['sleeper'].setValue(this.editData.sleeper);
      this.seatForm.controls['date'].setValue(this.editData.date);
    }
    
  }

  addSchedule(){
    this.seatForm.value.date=this.datePipe.transform(this.seatForm.value.date, 'yyyy-MM-dd')
   if(!this.editData){
    if(this.seatForm.valid){
      this.schedule.postScheduleData(this.seatForm.value)
      .subscribe({
        next:(res)=>{
          alert("schedule details added successfully")
          this.seatForm.reset()
          this.dialogRef.close('save');
        },
        error: ()=>{
          alert("Error while adding the product")
        }
      })
    }
   }
   else{
    this.updateSchedule()
   }
  }

  getAllTrains(){
    this.train.getTrainData()
    .subscribe({
      next:(res)=>{

        this.rawtrainNo=res

        for(let i=0;i<res.length;i++){
          res[i].index=i+1
        }
        


      },
      error: ()=>{
        alert('error while fetching the records')
      }
    })

  }
  updateSchedule(){
    this.schedule.putSchedule(this.seatForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("product updated successfully");
        this.seatForm.reset();
        this.dialogRef.close('update');
      },
      error: ()=>{
        alert("error while updating the record")
      }
    })
  }

}
