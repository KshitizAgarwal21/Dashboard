import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthServiceService } from 'src/app/services/auth-service.service';
const jwt = new JwtHelperService();
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private authservice: AuthServiceService) { }

  token: any="";
  usageForm = new FormGroup({

    Day : new FormControl(''),
    Ig: new FormControl(''),
    Yt: new FormControl(''),
    Wa: new FormControl('')
  })
  ngOnInit(): void {
    if(localStorage.getItem('token')==null)
    {
      this.router.navigate(['/login'],{relativeTo:this.route});
    }
  }

  addUsage(){
    this.token = localStorage.getItem('token');
    var reqBody = {
      uid: jwt.decodeToken(this.token).uid,
      day: this.usageForm.value.Day,
      insta: this.usageForm.value.Ig,
      youtube: this.usageForm.value.Yt,
      whatsapp: this.usageForm.value.Wa
    }
    this.authservice.addusage(reqBody).subscribe(res=>{
      alert(res.msg);

    }, err=>{

    });

  }

}
