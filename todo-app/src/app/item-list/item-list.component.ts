import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Item } from '../model/item';
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, OnChanges {
  @Input() items: Array<Item>;
  incompleteItems: Array<Item>;
  completedItems: Array<Item> = new Array<Item>();
  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(): void {
    this.incompleteItems = this.items || new Array<Item>();
  }

  deleteItem(i: number, type: string): void {
    if (type === 'inc') {
      this.incompleteItems.splice(i, 1);
    } else {
      this.completedItems.splice(i, 1);
    }
  }

  editItem(i: number, type: string): void {
    if (type === 'inc') {
      this.incompleteItems[i].edit = !this.incompleteItems[i].edit;
    } else {
      this.completedItems[i].edit = !this.completedItems[i].edit;
    }
  }

  completeItem(i: number): void {
    const completedItem = this.incompleteItems.splice(i, 1)[0] || null;
    completedItem.completed = true;
    this.completedItems.push(completedItem);
  }

}
