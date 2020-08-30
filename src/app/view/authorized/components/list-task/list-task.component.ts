import {Component, OnInit,  ViewChild} from '@angular/core';
import {TaskService} from "../../../../services/task.service";
import {Task} from "../../../../model/interfaces";
import { Router } from "@angular/router";
import {TaskEditService} from "../../../../services/task-edit.service";



@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss']
})
export class ListTaskComponent implements OnInit {
  private tasks: Task[];
  private _selectedTask: Task;
  @ViewChild('dt') table: any;
  private cols: any;
  private contextMenuVisible: boolean;
  private loading: boolean = true;
  private displayModalEditTask: boolean;

  get selectedTask(): Task {
    return this._selectedTask;
  }

  set selectedTask(value: Task) {
    this._selectedTask = value;
  }

  constructor(
    private taskService: TaskService,
    private router: Router,
    private taskEditService: TaskEditService
  ) {
  }

  ngOnInit() {
    this.taskService.getTask().subscribe(data => {
      this.tasks = data;
    });

    this.cols = [
      {width: '5%'},
      {width: '25%'},
      {width: '14%'},
      {width: '14%'},
      {width: '14%'},
      {width: '14%'},
      {width: '14%'}
    ];


  }

  onRowSelect(event) {
    console.log(event.data.description);
    this.contextMenuVisible = true;
  }

  onRowUnselect($event: any) {
    this.contextMenuVisible = false;
  }


  closeTask() {
    console.log(this._selectedTask.title);
    this.contextMenuVisible = false;
    this.table.selection = null;
  }

  editTask() {
    this.goToUrlTaskWithId('/authorized/edit-task-dialog/',this._selectedTask.id);
    this.displayModalEditTask = true;
    console.log(this._selectedTask);
    this.taskEditService.selectedTask = this._selectedTask;
    console.log(this._selectedTask);
  }

  viewTask() {
    this.goToUrlTaskWithId('/authorized/view-task/',this._selectedTask.id);
  }

  goToUrlTaskWithId(url,id) {
    this.contextMenuVisible = false;
    // this.table.selection = null;
    this.router.navigate([url,id]).then( (e) => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }

  newTaskModal() {

  }
}

