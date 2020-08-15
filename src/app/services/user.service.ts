import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../model/interfaces";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<any> {
    return this.http.get(environment.apiUrl+"/user/all");
  }
  public getUser(id): Observable<any> {
    return this.http.get(environment.apiUrl+"/user/id/"+id);
  }
  public getMe(): Observable<any> {
    return this.http.get(environment.apiUrl+"/user/me");
  }
  public createUser(user): Observable<User>{
    return this.http.post<User>(environment.apiUrl+"/user/signup", user)
  }
  public deleteUser(username): Observable<any> {
    return this.http.delete(environment.apiUrl+"/user/"+username);
  }
  public updateUser(user): Observable<User>{
    console.log(user);
    return this.http.put<User>(environment.apiUrl+"/user/update", user)
  }



}
