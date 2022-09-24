import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAccount } from '../interfaces/IAccount';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private url = environment.baseUrl
  constructor(private http: HttpClient) { }

  getUserAccounts(id: number): Observable<IAccount[]> {
    return this.http.get<IAccount[]>(`${this.url}get_accounts/${id}`)
  }
}
