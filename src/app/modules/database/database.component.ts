import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AuthServiceService } from 'src/app/services/auth-service.service';
export interface UserData {
  id: number;
  Name: string;
  Email: string;
  image: string;
}
let temp: UserData[];

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})

export class DatabaseComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private authservice: AuthServiceService) {
    this.dataSource = new MatTableDataSource();
  }
ngOnInit(){
  this.getUserData();
}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUserData(){
    this.authservice.getUsers().subscribe(res=>{
      console.log(res.data);
      temp = res.data;
      for(var i = 0; i < res.data.length; i ++)
      {
        temp[i].id = i+1;
      }
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    })
  }
}

/** Builds and returns a new User. */

