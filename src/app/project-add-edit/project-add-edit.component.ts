import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { DialogRef } from '@angular/cdk/dialog';
import { AppComponent } from '../app.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-project-add-edit',
  templateUrl: './project-add-edit.component.html',
  styleUrls: ['./project-add-edit.component.css']
})
export class ProjectAddEditComponent implements OnInit{
    projForm: FormGroup;
    constructor(private _fb: FormBuilder,private _projService:ProjectService,
      private _dialogRef: MatDialogRef<ProjectAddEditComponent>,
      @Inject(MAT_DIALOG_DATA) public data:any
      ){
       this.projForm=this._fb.group({
           projectName: '',
           skills: '',
           roles: '',
           startDate: '',
           endDate: '',
           description: '',
       });
    }
   ngOnInit(): void {
      this.projForm.patchValue(this.data);
      //throw new Error('Method not implemented.');
   }
    onFormSubmit(){
       if(this.projForm.valid){
         if(this.data){
            this._projService.updateProject(this.data.id,this.projForm.value).subscribe({
               next:(val: any) =>{
                 alert('project updated successfully');
                 this._dialogRef.close(true);
                 this._projService.getProjectList();
               },
               error: (err: any)=>{
                  console.error(err);
               }
             
              })
         }else{
            this._projService.addProject(this.projForm.value).subscribe({
            next:(val: any) =>{
               alert('project added successfully');
               this._dialogRef.close(true);
               this._projService.getProjectList();
            },
            error: (err: any)=>{
               console.error(err);
            }
            
            })
         }
       }
    }
}
