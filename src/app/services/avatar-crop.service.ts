import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvatarCropService {

  private _trigger = new Subject<void>();
  get trigger$() {
    return this._trigger.asObservable();
  }
  public avatarClear() {
    this._trigger.next();
  }

  constructor() { }

}
