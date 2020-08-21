import {Component, OnInit, ViewChildren} from '@angular/core';
import {Profile, User} from "../../../../model/interfaces";
import {UserService} from "../../../../services/user.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AvatarCropperComponent} from "../avatar-cropper/avatar-cropper.component";
import {AvatarCropService} from "../../../../services/avatar-crop.service";
import {ProfileService} from "../../../../services/profile.service";
import {AuthService} from "../../../../services/auth.service";


@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
  checkbox = false;
  users: User[];
  cols: any[];
  private request: User;
  private formNewUser: FormGroup;
  private visible = false;
  private formEditUser: FormGroup;
  private selectedUser: User;
  @ViewChildren(AvatarCropperComponent)
  private avatarComponent: AvatarCropperComponent;
  private profile: Profile;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private profileService: ProfileService,
    private auth: AuthService,
    private avatarCropService: AvatarCropService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      console.log(data);
    });

    this.cols = [
      {field: 'id', header: 'id', style:'width:10%'},
      {field: 'username', header: 'username'},
      {field: 'email', header: 'email'},
      {field: 'roles', header: 'roles', style:'width:20%'}
    ];

    this.formEditUser = this.formBuilder.group({
      idUserProfile: new FormControl(''),
      name: new FormControl(''),
      avatar: new FormControl(''),
      dismissed: new FormControl(''),
      idUser: new FormBuilder().group({
        id: new FormControl(''),
        username: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(5)]),
        roles: new FormArray([new FormControl('')])
      })
    })
  }

  add() {
    this.initNewUserForm();
    this.visible = !this.visible;
  }

  initNewUserForm() {
    this.formNewUser = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      roles: this.formBuilder.array(['ROLE_CLIENT']),
    });
  }

  newUser() {
    console.log(this.formNewUser.value);
    this.userService.createUser(this.formNewUser.value).subscribe(data => {
        this.request = data;
        this.formNewUser.reset();
        console.log(this.request);
        location.reload();
      },
      error => console.log(error));
  }

  onSelectUser(user) {
    this.profileService.getProfile(user.id).subscribe((data)=>{
      this.profile = data;
      console.log("profile", data);
      this.fillFormProfile();
    },error => {
      console.log(error);
      this.avatarCropService.avatarClear();
      this.avatarComponent.last.imageBase64 = null;
      this.formEditUser.reset();
      this.fillFormUser(user);
    },()=>{
       this.fillFormUser(user);
    })
    this.selectedUser = user;
  }

  private fillFormProfile(){
    this.formEditUser.controls['name'].patchValue(this.profile.name);
    this.avatarComponent.last.imageBase64 = this.profile.avatar;
    this.formEditUser.get('dismissed').patchValue(this.profile.dismissed.toString());
    console.log(this.formEditUser.get('dismissed'));
  }

  private fillFormUser(user: User) {
    this.formEditUser.controls['idUserProfile'].patchValue(user.id);
    this.formEditUser.get('idUser').get('id').patchValue(user.id);
    this.formEditUser.get('idUser').get('username').patchValue(user.username);
    this.formEditUser.get('idUser').get('email').patchValue(user.email);
    this.formEditUser.get('idUser').get('roles').patchValue(user.roles);
  }

  submit() {
    this.formEditUser.controls['avatar'].patchValue(this.avatarComponent.last.imageBase64);
    console.log(this.formEditUser.value);
    this.profileService.createProfile(this.formEditUser.value).subscribe((data) => {
      console.log("profile updated", data);
    });
    this.avatarCropService.avatarClear();
    this.avatarComponent.last.imageBase64 = null;
    this.formEditUser.reset();
  }

  deleteUser() {
    this.userService.deleteUser(this.selectedUser.username).subscribe((data) => {
      console.log("user deleted", data);
    });
    this.formEditUser.reset();
    this.ngOnInit();
  }

  test(){

  }
}
