import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  url = environment.baseUrl

  user_login(data: any): Observable<IUser>{

    return this.http.post<IUser>(`${this.url}login/`, data)
  }

  get_user(id: number): Observable<IUser> {

    return this.http.get<IUser>(`${this.url}get_user/${id}/`)
  }
}
