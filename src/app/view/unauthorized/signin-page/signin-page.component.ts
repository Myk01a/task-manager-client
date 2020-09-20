import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserAuth} from "../../../model/interfaces";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']

})
export class SigninPageComponent implements OnInit {

  form: FormGroup
  submitted = false

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.auth.logout();
    this.form = new FormGroup({
      username: new FormControl(null, []),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4)
      ])
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    const user: UserAuth = {
      username: this.form.value.username,
      password: this.form.value.password
    }

    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/authorized', 'default'])

      this.submitted = false
    }, error => {
      this.submitted = true;
      this.form.reset();
    })
  }
}

