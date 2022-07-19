import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route: Router) { }

  setToken(token: string) {
    localStorage.setItem('token', token)
  }

  getToken():string | null{
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean{
    return this.getToken() === null
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('data')
    this.route.navigate([''])
  }



}
