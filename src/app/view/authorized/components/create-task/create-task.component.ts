import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../../../services/user.service";
import {GroupService} from "../../../../services/group.service";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {UploadFilesService} from "../../../../services/upload-files.service";
import {DatePipe} from "@angular/common";
import {TaskService} from "../../../../services/task.service";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  form: FormGroup;
  users = [];
  groups = [];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings;
  files: any = [];
  selectedFiles: FileList;
  progressInfos = [];
  message = '';

  // fileInfos: Observable<any>;
  data: any;


  constructor(private formBuilder: FormBuilder,
              private groupService: GroupService,
              private uploadService: UploadFilesService,
              private taskService: TaskService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: new FormControl(''),
      description: new FormControl(''),
      groupp: new FormControl(''),
      comment: [null],
      completed: [null],
      creation: new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),
      deadline: new FormControl(''),
      done: false,
      executor: new FormControl(''),
      observer: new FormControl(''),
      owner: [({id: localStorage.getItem('userId'), username: localStorage.getItem('userName')})],
      price: new FormControl(''),
      attachment: null
    });

    this.groupService.getGroup().subscribe(data => {
      this.groups = data;
    });

    this.userService.getShortUsers().subscribe(data => {
      this.users = data;
      console.log(data);
      this.dropdownList = data;
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'username',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  submit() {
    this.form.patchValue({
      attachment: this.files,
      deadline: new DatePipe('en-US').transform(this.form.value.deadline, 'yyyy-MM-dd')
    })
    console.log('task submitted',this.form.value);
    this.taskService.createTask(this.form.value).subscribe((data) => {
      console.log("task created", data);
    });
    // console.log("new task", this.form.value);
    this.data = this.form.value;
    this.patchValueForm();
  }

  private patchValueForm() {
    this.form.patchValue({
      title: '',
      description: '',
      groupp: '',
      comment: null,
      completed: null,
      creation: new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),
      deadline: '',
      done: false,
      executor: '',
      observer: '',
      owner: ({id: localStorage.getItem('userId'), username: localStorage.getItem('userName')}),
      price: '',
      attachment: null
    });
    this.files = [];
  }

  onItemSelect(item: any) {
    // console.log(item);
  }

  onSelectAll(items: any) {
    // console.log(items);
  }

  uploadFile(event) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }

  deleteAttachment(index) {
    this.files.splice(index, 1)
  }

  upload(idx, file) {
    this.progressInfos[idx] = {value: 0, fileName: file.name};

    this.uploadService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.files.push(event.body[0])
        }
      },
      err => {
        this.progressInfos[idx].value = 0;
        this.message = 'Could not upload the file:' + file.name;
      });
  }

  formatDate(date: Date) {
    return  new DatePipe('en-US').transform(date, 'dd/MM/yyyy');

  }
}
