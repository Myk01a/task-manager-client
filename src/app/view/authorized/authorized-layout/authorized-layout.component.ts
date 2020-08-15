import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";




@Component({
  selector: 'app-authorized-layout',
  templateUrl: './authorized-layout.component.html',
  styleUrls: ['./authorized-layout.component.scss']
})
export class AuthorizedLayoutComponent implements OnInit {
  constructor(
    private router: Router,
    public auth: AuthService
  ) {
  }

  ngOnInit() {
  }
  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
