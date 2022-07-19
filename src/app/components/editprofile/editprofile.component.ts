import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/core/interfaces/IUser';
import { User } from 'src/app/core/models/userModel';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

  user!: IUser
  userSubscription!: Subscription

  updateForm!: FormGroup

  constructor(

    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getUserDetails()
    const emailPattern = "^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
    this.updateForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      ph_no: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      newPassword: [""],
      confirmPassword: [""]

    })
  }


  checkPassword = () => this.updateForm.value.newPassword === this.updateForm.value.confirmPassword 

  onSubmit() {

    if (this.checkPassword()) {
      
      this.user.password = this.updateForm.value.newPassword
      this.userService.updateUser(this.user).subscribe(data => {
        alert(data)
        this.goToDashboard()
      }, err => {
        alert(err.error)
      })
    } 
    else{
      alert("Passwords don't match")
    }
    
  }

  getUserDetails(){
    this.userSubscription = this.userService.getUser(Number(localStorage.getItem('data'))).subscribe(data => {
      this.user = data;
    })
  }

  goToDashboard() {
    this.route.navigate(['dashboard'])
  }

  ngOnDestroy(): void{
    this.userSubscription.unsubscribe()
  }
}
