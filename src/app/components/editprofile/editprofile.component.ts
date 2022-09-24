import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/core/interfaces/IUser';
import { User } from 'src/app/core/models/userModel';
import { UserService } from 'src/app/core/services/user.service';
import { faUserPen, faCheckToSlot, faCancel, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
  isEdit!: boolean
  createIcon = faCirclePlus
  updateIcon = faCheckToSlot
  cancelIcon = faCancel
  editIcon = faUserPen
  user!: IUser
  userSubscription!: Subscription

  updateForm!: FormGroup

  constructor(

    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: Router
  ) { }

  populateField(){
    this.updateForm.patchValue({
      name: this.user?.name,
      email: this.user?.email,
      ph_no: this.user?.ph_no,
      city: this.user?.city,
      state: this.user?.state,
    })

  }

  ngOnInit(): void {
    this.checkEditMode()  
    if (this.isEdit) {
      this.getUserDetails()
    }

      this.updateForm = this.formBuilder.group({
          name: ["", Validators.required],
          email: ["", Validators.required],
          ph_no: ["", Validators.required],
          city: ["", Validators.required],
          state: ["", Validators.required],
          newPassword: ["", this.isEdit ? null : Validators.required ],
          confirmPassword: ["", this.isEdit ? null : Validators.required ]
        }) 
  }

  checkEditMode() {
    if(this.route.url === '/editprofile'){
      this.isEdit = true
    }
    else{
      this.isEdit = false
    }
  }

  checkPassword = (password: string, confirmPassword: string) => password === confirmPassword 

  onSubmit() {
    const password = this.updateForm.value.newPassword
    const confirmPassword = this.updateForm.value.confirmPassword

    if(this.isEdit && this.checkPassword(password, confirmPassword)) {
      this.user.password = this.updateForm.value.newPassword
      this.userService.updateUser(this.user).subscribe(data => {
        alert(data)
        this.goToDashboard()
      }, err => {
        alert(err.error)
      })
    }
    else if(!this.isEdit && this.checkPassword(password, confirmPassword)){
      
      const user = new User()
      user.name = this.updateForm.value.name
      user.email = this.updateForm.value.email
      user.ph_no = this.updateForm.value.ph_no
      user.city = this.updateForm.value.city
      user.state = this.updateForm.value.state
      user.password = this.updateForm.value.newPassword

      this.userService.createUser(user).subscribe(data => {
        alert(data)
        this.route.navigate(['login'])
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
      this.populateField()
    })
  }

  goToDashboard() {
    if(this.isEdit){
      this.route.navigate(['dashboard'])
    }
    else{
      this.route.navigate(['login'])
    }
  }

  ngOnDestroy(): void{
    if(this.isEdit) this.userSubscription.unsubscribe()
  }
}
