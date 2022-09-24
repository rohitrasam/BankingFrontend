import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/IUser';

@Injectable()

// @Injectable({
//   providedIn: 'root'
// })
export class UserService {

  constructor(private http: HttpClient) { }

  private url = environment.baseUrl

  userLogin(data: any): Observable<IUser>{

    return this.http.post<IUser>(`${this.url}login/`, data)
  }

  getUser(id: number): Observable<IUser> {

    return this.http.get<IUser>(`${this.url}get_user/${id}/`)
  }

  updateUser(user: IUser): Observable<string>{
    
    return this.http.patch<string>(`${this.url}update_user/${user.id}`, user)
  }

  createUser(user: IUser): Observable<string>{
    return this.http.post<string>(`${this.url}create_user/`, user)
  }
}
