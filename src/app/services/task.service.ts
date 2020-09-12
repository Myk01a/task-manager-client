import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Page, SearchParam, Task} from "../model/interfaces";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  // public getTask(params): Observable<any> {
  //   return this.http.get(environment.apiUrl + "/task/all", {params});
  //   // return this.http.get("../assets/tasks.json");
  // }

  public getTaskById(id): Observable<any> {
    return this.http.get(environment.apiUrl + "/task/id/" + id);
  }

  public createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(environment.apiUrl + "/task/add", task)
  }

  public searchTask(searchParam: SearchParam): Observable<Page> {
    return this.http.post<Page>(environment.apiUrl + "/task/search", searchParam)
  }

}
