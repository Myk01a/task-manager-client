import {Component, Input, OnInit} from '@angular/core';
import {Profile, Task} from "../../../../model/interfaces";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {CommentService} from "../../../../services/comment.service";
import {DatePipe} from "@angular/common";
import {ProfileService} from "../../../../services/profile.service";
import {faEdit, faSmileWink} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  private taskId:string;
  profileCommentator: Profile;
  @Input()
  task: Task;
  @Input()
  defaultAvatar: string;
  faSmile = faSmileWink;
  faUndo = faEdit;
  name = 'Angular';
  message = '';
  showEmojiPicker = false;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ]
  set = 'apple';
  formComment: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private commentService: CommentService
  ){
  }

  ngOnInit(): void {
    this.route.url.subscribe(data => {
      this.taskId = (data[1].path)
    },error =>{}, ()=>{
    });
    this.profileService.getProfile(localStorage.getItem('userId')).subscribe(data =>{
      this.profileCommentator = data;
      console.log(data)
    });

    this.formComment = new FormGroup({
      "message" : new FormControl(''),
      "creationTime": new FormControl(''),
      "commentator" : new FormGroup({
        "id" : new FormControl('')
      }),
      "commentatorProf": new FormGroup({
        "idUserProfile": new FormControl(''),
        "avatar":new FormControl('')
      }),
      "commentTask": new FormGroup({
        "id": new FormControl('')
      })
    });

  }

  toggleEmojiPicker() {
    console.log(this.showEmojiPicker);
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event) {
    console.log(this.message)
    const { message } = this;
    console.log(message);
    console.log(`${event.emoji.native}`)
    const text = `${message}${event.emoji.native}`;

    this.message = text;
    this.showEmojiPicker = false;
  }

  onFocus() {
    console.log('focus');
    // this.showEmojiPicker = false;
  }
  onBlur() {
    console.log('onblur')
  }

  submit() {
    this.formComment.patchValue({commentator:{id:this.profileCommentator.idUserProfile}});
    this.formComment.patchValue({commentatorProf:{idUserProfile:this.profileCommentator.idUserProfile}});
    this.formComment.patchValue({commentTask:{id:this.taskId}});
    this.formComment.patchValue({creationTime: new DatePipe('en-US')
        .transform(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS')});
    console.log(this.formComment.value);
    this.commentService.createComment(this.formComment.value).subscribe(data =>{
      console.log(data)
    });
    this.formComment.patchValue({commentatorProf:{avatar:this.profileCommentator.avatar}});
    this.task.comment.push(this.formComment.value);
    console.log(this.formComment.value);
    this.formComment.reset();
  }
}
