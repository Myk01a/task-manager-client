import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient ) { }

  public createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(environment.apiUrl + "/comment/add", comment)
  }

  public getComment(params): Observable<any> {
    return this.http.get(environment.apiUrl + "/comment/allByParam" ,{params});
  }
}
