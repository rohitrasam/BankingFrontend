import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/core/interfaces/IUser';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { faBank, faMoneyBillTransfer, faGauge, faReceipt, faArrowRightFromBracket, faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userIcon = faUser
  userId = Number(localStorage.getItem('data'))
  logoutIcon = faArrowRightFromBracket
  dashboardIcon = faGauge
  accountsIcon= faReceipt
  transferIcon = faMoneyBillTransfer
  bankIcon = faBank;
  userName!: string
  isAccountsActive!: boolean
  isDashboardActive!: boolean
  userSubscription!: Subscription


  constructor(
    private userService: UserService, 
    private authService: AuthService,
    private route: Router,
    private activeRoute: ActivatedRoute

    ) { }


  ngOnInit(): void {

    if(this.route.url.includes('/accounts')){
      this.isDashboardActive = false
      this.isAccountsActive = true
    }
    else if(this.route.url.includes('/dashboard')){
      this.isDashboardActive = true
      this.isAccountsActive = false
    }
        
    this.userSubscription = this.userService.getUser(this.userId).subscribe(data => {
      this.userName = data['name']

    })

  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
      
  }

  goToDashboard() {
    this.route.navigate(['dashboard'])
    this.isDashboardActive = true
    this.isAccountsActive = false
  }

  goToAccounts() {
    this.route.navigate(['accounts'], {queryParams : {id : this.userId}})
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
