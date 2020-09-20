import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {CreateTaskComponent} from "./components/create-task/create-task.component";
import {ViewTaskComponent} from "./components/view-task/view-task.component";
import {GroupComponent} from "./components/group/group.component";
import {AuthorizedLayoutComponent} from "./authorized-layout/authorized-layout.component";
import {
  ButtonModule,
  CalendarModule,
  DialogModule,
  DropdownModule,
  EditorModule,
  InputTextModule,
  ListboxModule,
  MenubarModule,
  MenuModule,
  MultiSelectModule,
  TableModule
} from "primeng";
import {ListTaskComponent} from "./components/list-task/list-task.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthGuard} from "../../services/auth-guard.service";
import {TokenInterceptor} from "../../services/token.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {EditTaskDialogComponent} from "./components/edit-task-dialog/edit-task-dialog.component";
import {DefaultComponent} from "./components/default/default.component";
import {UserManagerComponent} from "./components/user-manager/user-manager.component";
import {AvatarComponent} from "./components/avatar/avatar.component";
import {DragDropDirective} from "../../services/drag-drop.directive";
import {ImageCropperModule} from "ngx-image-cropper";
import {AvatarCropperComponent} from "./components/avatar-cropper/avatar-cropper.component";
import {QuillModule} from "ngx-quill";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {UserObserversComponent} from "./components/user-observers/user-observers.component";
import {CommentsComponent} from "./components/comments/comments.component";
import {PickerModule} from "@ctrl/ngx-emoji-mart";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    AuthorizedLayoutComponent,
    CreateTaskComponent,
    ViewTaskComponent,
    ListTaskComponent,
    GroupComponent,
    DefaultComponent,
    UserManagerComponent,
    EditTaskDialogComponent,
    AvatarComponent,
    DragDropDirective,
    UserObserversComponent,
    AvatarCropperComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AuthorizedLayoutComponent, canActivate: [AuthGuard], children: [
          {path: 'create-task', component: CreateTaskComponent, canActivate: [AuthGuard]},
          {path: 'default', component: DefaultComponent, canActivate: [AuthGuard]},
          {path: 'view-task/:id', component: ViewTaskComponent, canActivate: [AuthGuard]},
          {path: 'edit-task-dialog/:id', component: EditTaskDialogComponent, canActivate: [AuthGuard]},
          {path: 'user-manager', component: UserManagerComponent, canActivate: [AuthGuard]},
        ]
      }
    ]),
    MenubarModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    MultiSelectModule,
    CalendarModule,
    DropdownModule,
    ListboxModule,
    FormsModule,
    DialogModule,
    MenuModule,
    EditorModule,
    ImageCropperModule,
    ReactiveFormsModule,
    QuillModule,
    FontAwesomeModule,
    NgMultiSelectDropDownModule.forRoot(),
    PickerModule
  ],
  exports: [
    RouterModule,
    GroupComponent
  ],
  entryComponents: [
    EditTaskDialogComponent
  ],
  providers: [AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ]
})

export class AuthorizedModule {
}
