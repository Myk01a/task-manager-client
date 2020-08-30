import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../../../services/user.service";
import {GroupService} from "../../../../services/group.service";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {UploadFilesService} from "../../../../services/upload-files.service";

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

  fileInfos: Observable<any>;

  constructor(private formBuilder: FormBuilder,
              private groupService: GroupService,
              private uploadService: UploadFilesService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: new FormControl(''),
      description: new FormControl(''),
      group: new FormControl(''),
      comment: [null],
      completed: [null],
      creation: [new Date().toLocaleDateString()],
      deadline: new FormControl(''),
      done: false,
      executor: new FormControl(''),
      observer: new FormControl(''),
      owner: [localStorage.getItem('userId')],
      price: new FormControl(''),
      taskAttachment: null,
      file:this.formBuilder.array([])
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

    // this.fileInfos = this.uploadService.getFiles();

  }

  submit() {
    console.log("new task", this.form.value);
    this.form.reset();
  }

  onItemSelect(item: any) {
    // console.log(item);
  }

  onSelectAll(items: any) {
    // console.log(items);
  }
  uploadFile(event) {
    let f = event.target.files;
    for (let index = 0; index < f.length; index++) {
      const element = f[index];
      this.files.push(element.name)
    }
    this.selectedFiles = event.target.files;
    this.uploadFiles();
    console.log(this.selectedFiles);
  }

  deleteAttachment(index) {
    this.files.splice(index, 1)

  }

  upload(idx, file) {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    this.uploadService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log(event);
          // this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progressInfos[idx].value = 0;
        this.message = 'Could not upload the file:' + file.name;
      });
  }

  uploadFiles() {
    this.message = '';

    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }



}
