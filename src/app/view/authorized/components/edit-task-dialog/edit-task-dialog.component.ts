import {Component, OnInit} from '@angular/core';
import {TaskEditService} from "../../../../services/task-edit.service";
import {NgForm} from "@angular/forms";
import {TaskService} from "../../../../services/task.service";
import {Task} from "../../../../model/interfaces";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss']
})
export class EditTaskDialogComponent implements OnInit {
  description: string;
  private task: Task;

  constructor(
    private taskService: TaskService,
    private taskEditService: TaskEditService) { }

  ngOnInit() {
    // this.taskService.getTaskById(1).subscribe(data => {
    //   this.task = data;
    //   console.log(data);
    // });
  }


  onSubmit(f: NgForm) {
    console.log(f.value);
  }
}
