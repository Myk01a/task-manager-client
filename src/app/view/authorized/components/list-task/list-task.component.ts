import {Component, OnInit, ViewChild} from '@angular/core';
import {TaskService} from "../../../../services/task.service";
import {Params, Task} from "../../../../model/interfaces";
import {Router} from "@angular/router";
import {TaskEditService} from "../../../../services/task-edit.service";
import {LazyLoadEvent} from "primeng";

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss']
})
export class ListTaskComponent implements OnInit {

  private _selectedTask: Task;
  @ViewChild('dt') table: any;
  private cols: any;
  private contextMenuVisible: boolean;
  private loading: boolean;
  private displayModalEditTask: boolean;
  totalRecords: number;
  datasource: Task[];
  first = 0;
  rows = 10;
  params: Params;

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
    this.params =
      {
        pageNo: 0,
        pageSize: 10,
        sortBy: "id"
      };

    this.taskService.getTask(this.params).subscribe(data => {
      this.datasource = data;
      this.totalRecords = 29;
    });

    this.loading = true;

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
    this.goToUrlTaskWithId('/authorized/edit-task-dialog/', this._selectedTask.id);
    this.displayModalEditTask = true;
    console.log(this._selectedTask);
    this.taskEditService.selectedTask = this._selectedTask;
    console.log(this._selectedTask);
  }

  viewTask() {
    this.goToUrlTaskWithId('/authorized/view-task/', this._selectedTask.id);
  }

  goToUrlTaskWithId(url, id) {
    this.contextMenuVisible = false;
    // this.table.selection = null;
    this.router.navigate([url, id]).then((e) => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }

  newTaskModal() {

  }

  loadTasks(event: LazyLoadEvent) {
    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    this.loading = true;
    this.params.pageNo = Math.round(event.first / this.params.pageSize);
    this.params.pageSize = event.rows;
    if(event.sortField==undefined) {
      this.params.sortBy = 'id'
    }else{
      this.params.sortBy = event.sortField ;
    }
    if(event.sortField=="dateDeadline") {
      this.params.sortBy = "deadline"
    }
    if (event.sortField=="dateCompleted") {
      this.params.sortBy = "completed"
    }
    if (event.sortField=="dateCreation") {
      this.params.sortBy = "creation"
    }
    console.log(this.params)


    this.taskService.getTask(this.params).subscribe(data => {
      this.datasource = data;
    });

    //imitate db connection over a network
    // setTimeout(() => {
    //   if (this.datasource) {
    //     this.tasks = this.datasource.slice(event.first, (event.first + event.rows));
    //     this.loading = false;
    //   }
    // }, 1000);
  }
}
