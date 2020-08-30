import {Component, Input, OnInit} from '@angular/core';
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-observers',
  templateUrl: './user-observers.component.html',
  styleUrls: ['./user-observers.component.scss']
})
export class UserObserversComponent implements OnInit {
@Input() form: FormGroup;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings;
  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
