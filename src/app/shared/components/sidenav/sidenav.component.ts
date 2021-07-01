import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
const jwtHelper = new JwtHelperService();
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  authCheck=0;
  authToken: any;
  userName: any;
  userEmail: any;
  userDP: any;
  constructor(private dialog: MatDialog, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')==null)
    {
      this.authCheck=0;
      this.userDP = "https://www.gstatic.com/images/branding/product/2x/avatar_square_blue_120dp.png";
    }
    else{
      this.authCheck=1;
      this.authToken = localStorage.getItem('token');
      this.userName = jwtHelper.decodeToken(this.authToken).Name;
      this.userEmail = jwtHelper.decodeToken(this.authToken).Email;
      this.userDP = jwtHelper.decodeToken(this.authToken).Image;
    }
  }

  openDialog(){
    this.router.navigate(['/changepic'],{relativeTo: this.route});
  }
}
