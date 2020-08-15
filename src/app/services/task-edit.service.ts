import {Injectable} from "@angular/core";
import { Task } from '../model/interfaces';

@Injectable({ providedIn: 'root' })
export class TaskEditService {
  constructor() {
  }
  selectedTask: Task
}
