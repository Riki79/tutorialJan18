import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
baseUrl = environment.apiUrl;

constructor(private _http: HttpClient) { }

  getUsers(): Observable<User[]> {
    // tslint:disable-next-line:max-line-length
    // return this._http.get<User[]>(this.baseUrl + 'users', _httpOptions); If sending httpoptions each time use this, otherwise gloabl will handle it
    return this._http.get<User[]>(this.baseUrl + 'users');
  }

  getUser(id: number): Observable<User> {
    return this._http.get<User>(this.baseUrl + 'users/' + id.toString());
  }

}
