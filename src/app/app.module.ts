import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SigninPageComponent} from './view/unauthorized/signin-page/signin-page.component';
import {UnauthorizedLayoutComponent} from './view/unauthorized/unauthorized-layout/unauthorized-layout.component';
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {CalendarModule, CardModule} from "primeng";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FocusTrapModule} from 'primeng/focustrap';
import {AuthService} from "./services/auth.service";
import {SharedModule} from "./view/unauthorized/shared.module";
import {TokenInterceptor} from "./services/token.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {QuillModule} from "ngx-quill";
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    SigninPageComponent,
    UnauthorizedLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    CardModule,
    CalendarModule,
    FocusTrapModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    PickerModule,
    NgMultiSelectDropDownModule,
    FontAwesomeModule
  ],
  providers: [
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
