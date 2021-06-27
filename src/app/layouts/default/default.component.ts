import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
sideBarOpened = true;
  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
  }
  sideBarToggle(){
    this.sideBarOpened=!this.sideBarOpened;
  }
  
}
