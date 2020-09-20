import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Profile} from "../model/interfaces";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  public getAllProfiles(): Observable<any> {
    return this.http.get(environment.apiUrl + "/profile/all");
  }

  public getProfile(id): Observable<any> {
    return this.http.get(environment.apiUrl + "/profile/id/" + id);
  }

  public createProfile(profile): Observable<Profile> {
    return this.http.post<Profile>(environment.apiUrl + "/profile/add", profile)
  }

  public deleteProfile(id): Observable<any> {
    return this.http.delete(environment.apiUrl + "/profile/id/" + id);
  }

  public updateProfile(profile): Observable<Profile> {
    return this.http.put<Profile>(environment.apiUrl + "/user/update", profile)
  }
}
