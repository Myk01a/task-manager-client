import {Component, OnInit} from '@angular/core';
import {GroupService} from "../../../../services/group.service";
import {Group} from "../../../../model/interfaces";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  private groupForm = new FormGroup({
    name: new FormControl(''),
  });

  private groupEditForm = new FormGroup({
    id:new FormControl(''),
    name: new FormControl(''),
  });

  private groups: Group[];
  private selectedGroup: Group;
  private recivedGroup: Group;
  private name: string;
  private id: number;

  constructor(
    private groupService: GroupService
  ) {
  }

  ngOnInit() {
    this.groupService.getGroup().subscribe(data => {
      this.groups = data;
    });
  }

  onSelect(group: Group): void {
    this.selectedGroup = group;
    this.groupEditForm.controls['id'].setValue(this.selectedGroup.id);
    this.groupEditForm.controls['name'].setValue(this.selectedGroup.name);
    this.name = this.selectedGroup.name;
  }

  addGroup() {
    this.groupService.createGroup(this.groupForm.value).subscribe(data => {
        this.recivedGroup = data;
        this.ngOnInit();
        this.groupForm.reset();
      },
      error => console.log(error));
  }
  deleteGroup(id){
    this.groupService.deleteGroup(id).subscribe((data)=> {
      console.log("group deleted");
      this.unselect();
      this.ngOnInit();
    });
  }

  unselect() {
    this.selectedGroup = null;
  }

  updateGroup() {
    this.groupService.updateGroup(this.groupEditForm.value).subscribe(data => {
        this.recivedGroup = data;
        this.unselect();
        this.ngOnInit();
      },
      error => console.log(error));
  }
}
