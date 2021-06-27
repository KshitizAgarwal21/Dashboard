import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  @Output() toggleSideBar: EventEmitter<any>= new EventEmitter();
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  sideBarToggler(){
    this.toggleSideBar.emit();
    setTimeout(()=>{
      window.dispatchEvent(
        new Event('resize')
      );
    },300)

  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    
  }

}
