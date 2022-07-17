import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/core/interfaces/IUser';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user!: IUser

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {

  }

}
