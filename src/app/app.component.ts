import { Component } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  simple = "Hello"
  title = 'BankingFrontend';

  constructor(public router: Router) {}
  

}
