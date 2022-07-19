import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/interfaces/IUser';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm!: FormGroup
  id!: Number

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: Router,
    private loginService: UserService
    ) { }

  ngOnInit(): void {
    this.initialzeLogin()
    
  }

  initialzeLogin() {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required]
      }
    )
  }


  goToRegister(){
    this.route.navigate(['register'])
  }

  onSubmit(){
    let email = this.loginForm.value.email
    let password = this.loginForm.value.password
    this.loginService.userLogin({'email': email, 'password': password}).subscribe(data => {      
      localStorage.setItem('data', String(data.id))
      this.authService.setToken(""+Math.random() * 1000 + 987987)
      this.route.navigate(['dashboard'])
    }, err => {
        alert(err.error)
    })
  }

}



