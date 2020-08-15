import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  imageURL: string;
  profileForm: FormGroup;

  constructor(public fb: FormBuilder) {
    this.imageURL = "/assets/default-user-icon.jpg";
    // Reactive Form
    this.profileForm = this.fb.group({
      avatar: [null],
      name: ['']
    })
  }
  ngOnInit(): void {}

  // Image Preview
  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.profileForm.patchValue({
      avatar: file
    });
    this.profileForm.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  // Submit Form
  submit() {
    console.log(this.profileForm.value)
  }

  files: any = [];

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name)
    }
  }
  deleteAttachment(index) {
    this.files.splice(index, 1)
  }
}
