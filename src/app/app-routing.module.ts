import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {SigninPageComponent} from "./view/unauthorized/signin-page/signin-page.component";
import {UnauthorizedLayoutComponent} from "./view/unauthorized/unauthorized-layout/unauthorized-layout.component";

const routes: Routes = [
  {
    path: '', component: UnauthorizedLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: SigninPageComponent}
    ]
  },
  {
    path: 'authorized', loadChildren: './view/authorized/authorized-module#AuthorizedModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules

  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
