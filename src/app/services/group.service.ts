import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from '../../environments/environment';
import {Group} from "../model/interfaces";

@Injectable({
  providedIn: 'root'
})

export class GroupService {

  constructor(private http: HttpClient) {
  }

  public getGroup(): Observable<any> {
    return this.http.get(environment.apiUrl + "/group/all");
    // return this.http.get("../assets/groups.json");
  }

  public createGroup(group): Observable<Group> {
    return this.http.post<Group>(environment.apiUrl + "/group/add", group)
  }

  public deleteGroup(id): Observable<any> {
    return this.http.delete(environment.apiUrl + "/group/id/" + id);
  }

  public updateGroup(group): Observable<Group> {
    return this.http.put<Group>(environment.apiUrl + "/group/update", group)
  }
}
