import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/core/interfaces/IUser';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName!: string
  isAccountsActive!: boolean
  isDashboardActive!: boolean

  constructor(
    private userService: UserService, 
    private authService: AuthService,
    private route: Router,
    private activeRoute: ActivatedRoute

    ) { }



  ngOnInit(): void {

    if(this.route.url === '/accounts'){
      this.isDashboardActive = false
      this.isAccountsActive = true
    }
    else if(this.route.url === '/dashboard'){
      this.isDashboardActive = true
      this.isAccountsActive = false
    }
        
    this.userService.get_user(Number(localStorage.getItem('data'))).subscribe(data => {
      this.userName = data['name']

    })

  }

  goToDashboard() {
    this.route.navigate(['dashboard'])
    this.isDashboardActive = true
    this.isAccountsActive = false
  }

  goToAccounts() {
    this.route.navigate(['accounts'])
    this.isDashboardActive = false
    this.isAccountsActive = true
  }

  goToEditProfile(){
    this.route.navigate(['editprofile'])
    this.isDashboardActive = false
    this.isAccountsActive = false
  }

  logout(){
    this.authService.logout()
  }
}
