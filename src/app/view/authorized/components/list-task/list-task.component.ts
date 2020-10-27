import {Component, OnInit, ViewChild} from '@angular/core';
import {TaskService} from "../../../../services/task.service";
import {SearchParam, Task} from "../../../../model/interfaces";
import {Router} from "@angular/router";
import {TaskEditService} from "../../../../services/task-edit.service";
import {LazyLoadEvent} from "primeng";
import {SortByGroupService} from "../../../../services/sort-by-group.service";

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
  private searchParams: SearchParam;
  private totalRecords: number;
  datasource: Task[];
  first = 0;
  rows = 10;
  taskIsClosed = "active task";

  constructor(
    private taskService: TaskService,
    private router: Router,
    private taskEditService: TaskEditService,
    private sortByGroupService: SortByGroupService
  ) {
  }

  get selectedTask(): Task {
    return this._selectedTask;
  }

  set selectedTask(value: Task) {
    this._selectedTask = value;
  }

  ngOnInit() {
    this.searchParams = {
      title: "",
      description: "",
      ownerId: null,
      grouppId: null,
      done: false,
      pageNumber: 0,
      pageSize: 10,
      sortColumn: "id",
      sortDirection: "asc"
    };
    this.sortByGroupService.events$.forEach(event => {
      this.searchParams.grouppId = event;
      console.log(event);
      this.loadTask();
    });
    this.loadTask();

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

  private loadTask() {
    this.taskService.searchTask(this.searchParams).subscribe(data => {
      this.datasource = data.content;
      this.totalRecords = data.totalElements;
    });
  }

  onRowSelect(event) {
    console.log(event.data.description);
    this.contextMenuVisible = true;
  }

  onRowUnselect($event: any) {
    this.contextMenuVisible = false;
  }

  closeTask() {
    this.selectedTask.done = true;
    this.selectedTask.completed = new Date();
    console.log(this.selectedTask);
    this.taskService.updateTask(this.selectedTask).subscribe(result => console.log(result));
    this.contextMenuVisible = false;
    this.table.selection = null;
  }

  taskReOpen() {
    this.selectedTask.done = false;
    this.selectedTask.completed = null;
    this.taskService.updateTask(this.selectedTask).subscribe(result => console.log(result));
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

  onFiltered(event: LazyLoadEvent) {
    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    this.loading = true;
    this.searchParams.pageNumber = Math.round(event.first / this.searchParams.pageSize);
    this.searchParams.pageSize = event.rows;
    if (event.sortField == undefined) {
      this.searchParams.sortColumn = 'id'
    } else {
      this.searchParams.sortColumn = event.sortField;
    }
    if (event.sortField == "dateDeadline") {
      this.searchParams.sortColumn = "deadline"
    }
    if (event.sortField == "dateCompleted") {
      this.searchParams.sortColumn = "completed"
    }
    if (event.sortField == "dateCreation") {
      this.searchParams.sortColumn = "creation"
    }
    // if(event.sortField && this.searchParams.sortDirection=="asc"){
    //   this.searchParams.sortDirection = "desc";
    // }else if(event.sortField && this.searchParams.sortDirection=="desc"){
    //   this.searchParams.sortDirection = "asc";
    // }
    // this.searchParams.grouppId = this.selectGroupId;
    // console.log(this.searchParams)

    this.loadTask();
  }

  changeList($event: MouseEvent, param: string) {
    this.taskIsClosed = param;
    if (param == 'all task') {
      this.searchParams.done = null;
    }
    if (param == 'active task') {
      this.searchParams.done = false;
    }
    if (param == 'closed task') {
      this.searchParams.done = true;
    }
    this.loadTask();
  }
}
