import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AuthServiceService } from 'src/app/services/auth-service.service';
let temp: PeriodicElement[];
@Component({
  selector: 'app-widget-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit {
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  
constructor(private authService: AuthServiceService){}
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
ngOnInit(){
  this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getData(){
if(localStorage.getItem('token')!=null){
    this.authService.getData().subscribe(res=>{

      if(res!=null)
      {
        temp = res.result.usage;
      }
      this.dataSource= new MatTableDataSource<PeriodicElement>(temp);
      this.dataSource.paginator = this.paginator;
    })

  }
  else
  {
    this.dataSource= new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  }
  }
}

export interface PeriodicElement {
  day: string;
  whatsapp: number;
  insta: number;
  youtube: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {day: "Monday", whatsapp: 0, insta: 0, youtube: '0'},
  {day: "Tuesday", whatsapp: 0, insta: 0, youtube: '0'},
  {day: "Wednesday", whatsapp: 0, insta: 0, youtube: '0'},
  {day: "Thursday", whatsapp: 0, insta: 0, youtube: '0'},
  {day: "Friday", whatsapp: 0, insta: 0, youtube: '0'},
  {day: "Saturday", whatsapp: 0, insta: 0, youtube: '0'},
  {day: "Sunday", whatsapp: 0, insta: 0, youtube: '0'},
  
];


