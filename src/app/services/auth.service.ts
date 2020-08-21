import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {AuthResponse, UserAuth} from "../model/interfaces";
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('token-exp'))
    if (new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('token')
  }

  login(user: UserAuth): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('username', user.username);
    formData.append('password', user.password);
    return this.http.post(environment.apiUrl+'/user/signin', formData)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  refreshToken(){
     this.http.get<any>(environment.apiUrl+'/user/refresh').subscribe((data)=> {
       this.setToken(data);
     })
  }

  private setToken(response: AuthResponse | null) {
    if (response) {
      console.log(response);
      const expDate = new Date(new Date().getTime() + +3600000)
      localStorage.setItem('token', response.token)
      localStorage.setItem('token-exp', expDate.toString())
      if(response.userId) {
        localStorage.setItem('userId', response.userId)
      }
    } else {
      localStorage.clear()
    }
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error
    console.log(message)
    return throwError(error)
  }
}
