import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from './auth/route.guard';
import { AccountsComponent } from './components/accounts/accounts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [RouteGuard]
  },
  {
    path: 'accounts',
    component: AccountsComponent,
    canActivate: [RouteGuard]
  },
  {
    path: 'editprofile',
    component: EditprofileComponent,
    canActivate: [RouteGuard]
  },
  {
    path: 'register',
    component: EditprofileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
