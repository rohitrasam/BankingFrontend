import { Component, OnInit } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BankingFrontend';
  login!: boolean
  register!: boolean
  constructor(public router: Router) {}


  pathCheck(){
    
    if (this.router.url == '/' || this.router.url == '/login' || this.router.url == '/register'){
      return false;
    } 
    return true
  }

}
