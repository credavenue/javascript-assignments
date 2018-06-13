import { Component, OnInit } from '@angular/core';
import {Item} from '../item';
import {ITEMS} from '../mock-items';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  title = 'Simple TODO app';
  newItem: string;
  items = ITEMS;
  constructor() { }
  ngOnInit() {
  }
  toDoItems(){
    return this.items.filter((item) => item.done === false);
  }
  doneItems(){
    return this.items.filter((item) => item.done === true);
  }
  selectionChange(item:Item): void{
    if(item.done==true){
      item.done=false;
    } if(item.done==false){
      item.done=true;
    }
  }
  onEdit(item : Item): void {
    item.edit = true;
  }
  onSave(item : Item): void {
    item.edit = false;
  }
  onRemove(item : Item): void {
    for(let j=0;j<this.items.length;j++){
      if(this.items[j]==item){
        this.items.splice(j,1);
      }
    }
  }

  addItem(itemname: string): void{
    this.items.push({name:itemname,done:false,edit:false});
    this.newItem = "";
  }

}


