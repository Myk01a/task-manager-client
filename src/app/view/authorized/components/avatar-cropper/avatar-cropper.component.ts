import { Component, OnInit } from '@angular/core';
import {ImageCroppedEvent} from "ngx-image-cropper";

@Component({
  selector: 'app-avatar-cropper',
  templateUrl: './avatar-cropper.component.html',
  styleUrls: ['./avatar-cropper.component.scss']
})
export class AvatarCropperComponent {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageBase64: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    /* show cropper */
  }
  cropperReady() {
    /* cropper ready */
    this.imageBase64 = this.croppedImage;
  }
  loadImageFailed() {
    /* show message */
  }

  clear() {
    this.imageChangedEvent= null;
  }
}
