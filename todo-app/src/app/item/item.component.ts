import { Component, OnInit } from '@angular/core';
import { Item } from '../model/item';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  item: Item = new Item();
  items: Array<Item> = new Array<Item>();
  constructor() { }

  ngOnInit() {
  }

  addItem(): void {
    const item = Object.assign(new Item(), this.item);
    this.items.push(item);
    this.item.name = '';
  }

}
