import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectAddEditComponent } from './project-add-edit/project-add-edit.component';
import { ProjectService } from './services/project.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
//import{CoreService } from './core/core.service';
@Component({
  selector: 'shubham',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'createStudent';

  displayedColumns: string[] = ['id','projectName','skills','description','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _projService: ProjectService){}
  ngOnInit(): void {
    this.getProjectList();
  }
    openAddProjForm(){
      const dialogRef=this._dialog.open(ProjectAddEditComponent);
      dialogRef.afterClosed().subscribe({
        next: (val)=>{
          if(val){
            this.getProjectList();
          }
        },
      });
    }
    getProjectList(){
       this._projService.getProjectList().subscribe({
         next: (res) =>{
            this.dataSource= new MatTableDataSource(res);
            this.dataSource.sort=this.sort;
            this.dataSource.paginator=this.paginator;
         },
         error:(err)=>{
          console.log(err);
         }
        });
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    deleteProject(data: any){
      this._projService.deleteProject(data.id).subscribe({
        next: () =>{
            alert("project no "+data.id+" deleted!");
            this.getProjectList();
        },
        error:(err)=>{
          console.log(err);
         }
      })
    }
    openEditProjForm(data:any){
      const dialogRef=this._dialog.open(ProjectAddEditComponent,{
        data,
        
      });
      dialogRef.afterClosed().subscribe({
        next: (val)=>{
          if(val){
            this.getProjectList();
          }
        },
      });
    }
}


