import {Component, OnInit} from '@angular/core';
import {ImageCroppedEvent} from "ngx-image-cropper";
import {AvatarCropService} from "../../../../services/avatar-crop.service";

@Component({
  selector: 'app-avatar-cropper',
  templateUrl: './avatar-cropper.component.html',
  styleUrls: ['./avatar-cropper.component.scss']
})
export class AvatarCropperComponent implements OnInit{
    [x: string]: any;

  private imageChangedEvent: any = '';
  private croppedImage: any = '';
  private imageBase64: any = '';

constructor( private avatarCropService: AvatarCropService) {
}

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

  avatarClear(){
    this.imageChangedEvent= null;
  }

  ngOnInit(): void {
    this.avatarCropService.trigger$.subscribe(() => this.avatarClear());
  }
}
