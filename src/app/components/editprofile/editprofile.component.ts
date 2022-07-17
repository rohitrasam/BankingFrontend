import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/core/interfaces/IUser';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

  user!: IUser
  userSubscription!: Subscription

  constructor(
    private userService: UserService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getUserDetails()
  }

  getUserDetails(){
    this.userSubscription = this.userService.get_user(Number(localStorage.getItem('data'))).subscribe(data => {
      this.user = data
      console.log(this.user, 'line 26');
    })
  }

  ngOnDestroy(): void{
    this.userSubscription.unsubscribe()
  }
}
