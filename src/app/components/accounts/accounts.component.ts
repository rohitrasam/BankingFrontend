import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { IAccount } from 'src/app/core/interfaces/IAccount';
import { AccountsService } from 'src/app/core/services/accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  error!: string
  ruppee = faIndianRupeeSign
  showBalance = false
  accounts!: IAccount[]
  userId!: number
  constructor(
    private activeRoute: ActivatedRoute, 
    private accountService: AccountsService,
    private route: Router) { }


  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.userId = params['id']
     })
    this.getAccounts()
  }

  getAccounts(){
    this.accountService.getUserAccounts(this.userId).subscribe(data => {
      this.accounts = data
    }, err => {
      this.error = err.error
    })
  }
}
