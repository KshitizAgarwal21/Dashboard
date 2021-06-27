import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateComponent } from './update/update.component';
const jwtHelper = new JwtHelperService();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  durationInSeconds = 5;
  passStyle : any;
  passcheck =1;
  passerror : string="";
  loginForm = new FormGroup({
    Email : new FormControl('', [Validators.required, Validators.email]),
    Password : new FormControl('', Validators.required)
  })

  registrationForm = new FormGroup({

    Name : new FormControl('', Validators.required),
    Email : new FormControl('',[Validators.required, Validators.email]),
    Password : new FormControl('', Validators.required),
    ConfirmPassword : new FormControl('', Validators.required),
    
  });


  constructor(private authService: AuthServiceService, private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')!=null)
    {
      this.router.navigate(['/']);
    }
  }
  
  register(){
    if(this.registrationForm.valid)
    {
      var name = this.registrationForm.value.Name;
      if(this.registrationForm.value.Password!=this.registrationForm.value.ConfirmPassword)
      {
        this.passcheck=0;
        this.passerror = "Passwords don't match";
        this.passStyle = 'color : red; font-size : small'
      }
      else{
        this.passerror = "Passwords match";
        this.passStyle = 'color : green; font-size : small';
        //do the needful here
        
        var requiredForm ={
          Name: this.registrationForm.value.Name,
          Email: this.registrationForm.value.Email,
          Password : this.registrationForm.value.Password,
        };
        this.authService.register(requiredForm).subscribe(res=>{
          console.log(res.msg);
        if(res.msg==="Registration successful")
        {
          this._snackBar.openFromComponent(UpdateComponent, {
            duration: this.durationInSeconds * 1000,
          });
        }
        else if(res.msg === "Already exists")
        {
          alert("User already exists");
        }

        })
        

      }
    }
    
  }
  passMatch(){
    if(this.registrationForm.value.Password!=this.registrationForm.value.ConfirmPassword)
      {
        this.passcheck=0;
        this.passerror = "Passwords don't match";
        this.passStyle = 'color : red; font-size : small'
      }
      else{
        this.passerror = "Passwords match";
        this.passStyle = 'color : green; font-size : small';
      }
  }
  login(){
    
    if(this.loginForm.valid)
    {
    var email=this.loginForm.value.Email;
    var password=this.loginForm.value.Password; 
    this.authService.login({email:email, password: password, phone: 9918}).subscribe(res=>{
      if(res.msg==="Invalid credentials")
      {
        alert("Galat baat");
      }
      else if(res.msg==="Email not found")
      {
        alert("Please register first");
      }
      else{
      console.log(res.token);
      console.log(jwtHelper.decodeToken(res.token).Name);
      localStorage.setItem('token', res.token);
      this.router.navigate(['/'],{relativeTo: this.route});
      }
      
    });
    
  }
  
}

}
