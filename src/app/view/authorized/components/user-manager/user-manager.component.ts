import {Component, OnInit} from '@angular/core';
import {Roles, User} from "../../../../model/interfaces";
import {UserService} from "../../../../services/user.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";


@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
   users: User[];
   cols: any[];
  private request: User;
  private formNewUser: FormGroup;
  private visible = false;
  private formEditUser: FormGroup;
  private selectedUser: User;
  mySubscription: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    // private messageService: MessageService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      console.log(data);
    });

    this.cols = [
      {field: 'id', header: 'id'},
      {field: 'username', header: 'username'},
      {field: 'email', header: 'email'},
      {field: 'roles', header: 'roles'}
    ];

    this.formEditUser = new FormGroup({
      id: new FormControl({value: '', disabled: false}),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      roles: new FormArray([new FormControl('')])
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
    this.fillEditForm(user);
    this.selectedUser = user;
  }

  private fillEditForm(user: User) {
    this.formEditUser.controls['id'].patchValue(user.id);
    this.formEditUser.controls['username'].patchValue(user.username);
    this.formEditUser.controls['email'].patchValue(user.email);
  }

  submit() {
    console.log(this.formEditUser.value);
    this.userService.updateUser(this.formEditUser.value).subscribe((data) => {
      console.log("user updated", data);
    });
    this.formEditUser.reset();
  }

  deleteUser() {
    this.userService.deleteUser(this.selectedUser.username).subscribe((data) => {
      console.log("user deleted", data);
    });
    this.formEditUser.reset();
    this.ngOnInit();
  }

}
